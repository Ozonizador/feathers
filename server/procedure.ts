import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { supabaseAdmin } from "../lib/supabaseAdminClient";
import { Advertisements, ADVERTISEMENT_TABLE_NAME } from "../models/advertisement";
import { Profile, PROFILE_TABLE_NAME } from "../models/profile";
import { publicProcedure } from "./trpc";

export const authorizedProcedure = publicProcedure.input(z.object({ userId: z.string() })).use(async (opts) => {
  debugger;
  const { ctx } = opts;
  const { userId } = ctx;

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

    const { data, error } = await supabaseAdmin
      .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
      .select("id")
      .match({ hostId: userId, id: advertisementId });

    if (error || !data)
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "",
      });

    return opts.next();
  });
