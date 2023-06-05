import { TRPCError } from "@trpc/server";
import { z } from "zod";
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
