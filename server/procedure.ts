import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { supabaseAdmin } from "../lib/supabaseAdminClient";
import { Advertisements, ADVERTISEMENT_TABLE_NAME } from "../models/advertisement";
import { publicProcedure } from "./trpc";

export const authorizedProcedure = publicProcedure.input(z.object({ userId: z.string() })).use((opts) => {
  if (opts.input.userId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Not logged in",
    });
  }

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
