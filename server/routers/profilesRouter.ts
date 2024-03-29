import { ZodString, z } from "zod";
import { authorizedProcedure, superAdminProcedure } from "../procedure";
import { router } from "../trpc";
import { PROFILE_COLUMNS, PROFILE_TABLE_NAME, Profile, ProfilesResponse, UserTypes } from "../../models/profile";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { TRPCError } from "@trpc/server";
import { supabase } from "../../lib/supabaseClient";

const ProfileConfigSchema: z.ZodType<
  Pick<Profile, "accepts_notification_email" | "accepts_notification_message" | "prefered_unidesk_state">
> = z.object({
  accepts_notification_email: z.boolean(),
  accepts_notification_message: z.boolean(),
  prefered_unidesk_state: z.enum(["LANDLORD", "TENANT"]),
});

const user_id: z.ZodString = z.string();

export const profilesRouter = router({
  updateProfileConfigurations: authorizedProcedure.input(ProfileConfigSchema).mutation(async ({ input, ctx }) => {
    const { accepts_notification_email, accepts_notification_message, prefered_unidesk_state } = input;
    const { userId } = ctx;

    const { error } = await supabaseAdmin
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .update({ accepts_notification_email, accepts_notification_message, prefered_unidesk_state })
      .eq(PROFILE_COLUMNS.ID, userId);

    if (!error) return { message: "OK" };

    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "An unexpected error occurred, please try again later.",
    });
  }),
  getAllProfiles: superAdminProcedure.query(async () => {
    const {data, error} = await supabaseAdmin
    .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
    .select("*, payment_methods:payment_methods!left(*)");

    return {data, error};
  }),
  getProfileConfigurations: authorizedProcedure.query(async ({ input, ctx }) => {
    const {userId} = ctx;

    const { data, error } = await supabaseAdmin
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .select("accepts_notification_email, accepts_notification_message, prefered_unidesk_state")
      .eq(PROFILE_COLUMNS.ID, userId)
      .single();

    if (error || !data)
      return {
        accepts_notification_email: false,
        accepts_notification_message: false,
        prefered_unidesk_state: "TENANT" as UserTypes,
      };

    return data;
  }),
  deleteProfile:  superAdminProcedure.input(user_id).mutation(async ({ input, ctx}) => {
    const user_id = parseInt(input);
    const {data, error} = await supabaseAdmin.rpc('delete_test3', {user_id});

    return {data, error};
  }),
  deleteProfilebyId: superAdminProcedure.input(user_id).query(async ({input,ctx}) => {
    const userId = input;

    const {data, error} = await supabaseAdmin.from("profiles").delete().eq("id", userId)
    const {data: authData, error: authError} = await supabaseAdmin.auth.admin.deleteUser(userId)

    return {data, error, authData, authError};
  })
});

// export type definition of API
export type ProfilesRouter = typeof profilesRouter;
