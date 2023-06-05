import { z } from "zod";
import { supabase } from "../../lib/supabaseClient";
import {
  HostRentPreferencesTable,
  HOST_RENT_PREFERENCES_TABLE_COLUMNS,
  HOST_RENT_PREFERENCES_TABLE_NAME,
} from "../../models/hostPreferences";
import { authorizedProcedure } from "../procedure";
import { router } from "../trpc";

export const hostPreferencesRouter = router({
  // Adicionar os procedure de authenticated
  updateAdvertisementMinimumStayAndTimeInAdvance: authorizedProcedure
    .input(z.object({ minimum: z.number(), timeInAdvance: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { minimum, timeInAdvance } = input;
      const { userId } = ctx;

      const { data, error } = await supabase
        .from<"host_rent_preferences", HostRentPreferencesTable>(HOST_RENT_PREFERENCES_TABLE_NAME)
        .update({ minimum_stay: minimum, time_in_advance: timeInAdvance })
        .eq(HOST_RENT_PREFERENCES_TABLE_COLUMNS.HOST_ID, userId);

      return { data, error };
    }),

  updateAdvertisementDiscounts: authorizedProcedure
    .input(z.object({ semesterDiscount: z.number(), trimesterDiscount: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { trimesterDiscount, semesterDiscount } = input;
      const { userId } = ctx;

      const { data, error } = await supabase
        .from<"host_rent_preferences", HostRentPreferencesTable>(HOST_RENT_PREFERENCES_TABLE_NAME)
        .update({ semester_discount: semesterDiscount, trimester_discount: trimesterDiscount })
        .eq(HOST_RENT_PREFERENCES_TABLE_COLUMNS.HOST_ID, userId);

      return { data, error };
    }),
});

// export type definition of API
export type HostPreferencesRouter = typeof hostPreferencesRouter;
