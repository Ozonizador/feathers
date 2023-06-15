import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { Reservation, Reservations, RESERVATION_TABLE_NAME } from "../../models/reservation";
import { authorizedProcedure } from "../procedure";
import { router } from "../trpc";

const AddReservationSchema: z.ZodType<
  Pick<Reservation, "advertisement_id" | "end_date" | "number_guests" | "start_date">
> = z.object({ advertisement_id: z.string(), end_date: z.string(), start_date: z.string(), number_guests: z.number() });

export const reservationsRouter = router({
  addReservation: authorizedProcedure.input(AddReservationSchema).mutation(async ({ input, ctx }) => {
    const { userId } = ctx;

    if (!userId)
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Missing userId",
      });

    const { data, error } = await supabaseAdmin
      .from<"reservations", Reservations>(RESERVATION_TABLE_NAME)
      .insert({ ...input, status: "REQUESTED", payment_status: "NOT_GENERATED", tenant_id: userId })
      .select()
      .single();

    return { data, error };
  }),
});

// export type definition of API
export type ReservationsRouter = typeof reservationsRouter;
