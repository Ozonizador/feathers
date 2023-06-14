import { TRPCError } from "@trpc/server";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { ProfilesResponse, PROFILE_TABLE_NAME, PROFILE_COLUMNS } from "../../models/profile";
import { Reservations, RESERVATION_TABLE, RESERVATION_TABLE_NAME } from "../../models/reservation";
import {
  PaymentStatus,
  PaymentType,
  ReservationPayments,
  RESERVATION_PAYMENTS_TABLE_NAME,
} from "../../models/reservation_payment";

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

type AddReservationPaymentProps = {
  reference: string;
  metadata: string;
  valor: number;
  payment_type: PaymentType;
  entidade?: string;
};

export const addReservationPayment = async (reservationId: string, paymentInfo: AddReservationPaymentProps) => {
  const { reference, metadata, valor, payment_type, entidade } = paymentInfo;

  const { error } = await supabaseAdmin
    .from<"reservation_payments", ReservationPayments>(RESERVATION_PAYMENTS_TABLE_NAME)
    .insert({
      reservation_id: reservationId,
      referencia: reference,
      metadata,
      estado: "GENERATED",
      valor,
      payment_type,
      entidade: entidade || null,
    });

  if (error)
    throw new TRPCError({ message: "Error adding the payment information of the reservation", code: "BAD_REQUEST" });

  return { success: true };
};

export const updateReservationPayment = async (reservationId: string, payment_status: PaymentStatus) => {
  const { error } = await supabaseAdmin
    .from<"reservation_payments", ReservationPayments>(RESERVATION_PAYMENTS_TABLE_NAME)
    .update({ estado: payment_status })
    .eq("id", reservationId);

  if (error)
    throw new TRPCError({ message: "Error adding the payment information of the reservation", code: "BAD_REQUEST" });

  return { success: true };
};
