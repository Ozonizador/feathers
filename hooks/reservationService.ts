import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  MODIFY_RESERVATION_FUNCTION,
  Reservations,
  ReservationStatus,
} from "../models/reservation";

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
  
  return { acceptReservation };
};

export default useReservationService;
