import { TRPCError } from "@trpc/server";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { ProfilesResponse, PROFILE_TABLE_NAME, PROFILE_COLUMNS } from "../../models/profile";
import { Reservations, RESERVATION_TABLE, RESERVATION_TABLE_NAME } from "../../models/reservation";

export const getUserPhone = async (userId?: string) => {
  if (!userId) throw new TRPCError({ message: "User identifier missing", code: "BAD_REQUEST" });
  const { data: userData, error: userError } = await supabaseAdmin
    .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
    .select("phone")
    .eq(PROFILE_COLUMNS.ID, userId)
    .single();

  if (userError || !userData) throw new TRPCError({ message: "User not found", code: "BAD_REQUEST" });

  return { phone: userData.phone };
};

export const updateAdvertisementPayment = async (reservationId?: string) => {
  if (!reservationId) throw new TRPCError({ message: "Reservation not found", code: "BAD_REQUEST" });

  const { data, error } = await supabaseAdmin
    .from<"reservations", Reservations>(RESERVATION_TABLE_NAME)
    .update({ payment_status: "PENDING" })
    .eq(RESERVATION_TABLE.ID, reservationId);

  if (error || !data) throw new TRPCError({ message: "Error updating the reservation", code: "BAD_REQUEST" });

  return { success: true };
};
