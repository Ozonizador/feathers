import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { supabaseAdmin } from "../lib/supabaseAdminClient";
import { Advertisements, ADVERTISEMENT_TABLE_NAME } from "../models/advertisement";
import { Profile, PROFILE_TABLE_NAME } from "../models/profile";
import { publicProcedure } from "./trpc";

export const authorizedProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;
  const { userId } = ctx;

  if (!userId)
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Missing userId",
    });

  const { data, error } = await supabaseAdmin
    .from<"profiles", Profile>(PROFILE_TABLE_NAME)
    .select("id")
    .match({ id: userId });

  if (error || !data)
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You need to login.",
    });

  return opts.next();
});

export const isHostProcedure = authorizedProcedure
  .input(z.object({ advertisementId: z.string() }))
  .use(async (opts) => {
    const { input, ctx } = opts;
    const { userId } = ctx;
    const { advertisementId } = input;

    if (!advertisementId) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Mising advertisement identifier" });
    }

    const { data, error } = await supabaseAdmin
      .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
      .select("id")
      .match({ host_id: userId, id: advertisementId });

    if (error || !data)
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "",
      });

    return opts.next();
  });

// using publicProcedure just to not do double query on supabase - authorizedProcedure is calling already supabase
export const superAdminProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;
  const { userId } = ctx;

  if (!userId)
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Missing userId",
    });

  const { data, error } = await supabaseAdmin
    .from<"profiles", Profile>(PROFILE_TABLE_NAME)
    .select("id, user_type")
    .match({ id: userId })
    .single();

  if (error || !data)
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You need to login.",
    });

  if (!data.user_type || data.user_type !== "ADMIN")
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "",
    });

  return opts.next();
});
