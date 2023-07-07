import { z } from "zod";
import { authorizedProcedure } from "../procedure";
import { router } from "../trpc";
import { PROFILE_COLUMNS, PROFILE_TABLE_NAME, Profile, ProfilesResponse, UserTypes } from "../../models/profile";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { TRPCError } from "@trpc/server";

const ProfileConfigSchema: z.ZodType<
  Pick<Profile, "accepts_notification_email" | "accepts_notification_message" | "prefered_unidesk_state">
> = z.object({
  accepts_notification_email: z.boolean(),
  accepts_notification_message: z.boolean(),
  prefered_unidesk_state: z.enum(["LANDLORD", "TENANT"]),
});

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
  getProfileConfigurations: authorizedProcedure.query(async ({ input, ctx }) => {
    const { userId } = ctx;

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
});

// export type definition of API
export type ProfilesRouter = typeof profilesRouter;
