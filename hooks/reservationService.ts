import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  MODIFY_RESERVATION_FUNCTION,
  Reservation,
  RESERVATION_TABLE_NAME,
  Reservations,
  ReservationStatus,
} from "../models/reservation";
import { supabaseAdmin } from "../lib/supabaseAdminClient";

const useReservationService = () => {
  const supabaseClient = useSupabaseClient();

  const acceptReservation = async (reservation_id: string, status: ReservationStatus, stay_id?: string) => {
    const { data, error } = await supabaseClient
      .rpc<"modify_reservation", Reservations>(MODIFY_RESERVATION_FUNCTION, {
        reservation_id,
        reservation_status: status,
        stay_id,
      })
      .select()
      .single();

    return { data, error };
  };

  const requestChangeReservation = async (reservation_id: string, reservation: Partial<Reservation>) => {
    const { data, error } = await supabaseAdmin
      .from<"reservations", Reservations>(RESERVATION_TABLE_NAME)
      .update(reservation)
      .eq("id", reservation_id);

    return { data, error };
  };

  return { acceptReservation, requestChangeReservation };
};

export default useReservationService;
