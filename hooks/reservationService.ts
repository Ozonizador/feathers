import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  MODIFY_RESERVATION_FUNCTION,
  Reservation,
  Reservations,
  ReservationStatus,
  RESERVATION_TABLE_NAME,
} from "../models/reservation";

const useReservationService = () => {
  const supabaseClient = useSupabaseClient();

  const addReservation = async (
    reservation: Omit<Reservation, "id" | "created_at" | "updated_at">,
    tenant_id: string
  ) => {
    const { error } = await supabaseClient
      .from<"reservations", Reservations>(RESERVATION_TABLE_NAME)
      .insert({ ...reservation, tenant_id });
    return { error };
  };

  const acceptReservation = async (reservation_id: string, status: ReservationStatus, stay_id?: string) => {
    const { data, error } = await supabaseClient
      .rpc<"modify_reservation", Reservations>(MODIFY_RESERVATION_FUNCTION, {
        reservation_id,
        reservation_status: status,
        stay_id,
      })
      .single();

    return { data, error };
  };

  return { addReservation, acceptReservation };
};

export default useReservationService;
