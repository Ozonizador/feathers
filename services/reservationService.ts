import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";
import {
  Reservation,
  ReservationsResponse,
  ReservationStatus,
  RESERVATION_TABLE,
  RESERVATION_TABLE_NAME,
} from "../models/reservation";

const useReservationService = () => {
  const supabaseClient = useSupabaseClient();

  const addReservation = async (
    reservation: Omit<Reservation, "id" | "created_at" | "updated_at">,
    tenant_id: string
  ) => {
    const { data, error } = await supabaseClient
      .from<"reservations", ReservationsResponse>(RESERVATION_TABLE_NAME)
      .insert({ ...reservation, id: uuidv4(), updated_at: new Date().toDateString(), tenant_id })
      .select()
      .single();
    return { data, error };
  };

  const getReservations = async () => {
    const { data, error } = await supabaseClient
      .from<"reservations", ReservationsResponse>(RESERVATION_TABLE_NAME)
      .select();
    return { data, error };
  };

  const getReservationByAdvertId = async (advertId: string) => {
    const { data, error } = await supabaseClient
      .from<"reservations", ReservationsResponse>(RESERVATION_TABLE_NAME)
      .select()
      .eq(RESERVATION_TABLE.ADVERT_ID, advertId);
    return { data, error };
  };

  const updateReservationStatusOnDB = async (reservation_id: string, status: ReservationStatus) => {
    const { data, error } = await supabaseClient
      .from<"reservations", ReservationsResponse>(RESERVATION_TABLE_NAME)
      .update({ status })
      .eq(RESERVATION_TABLE.ID, reservation_id);

    return { data, error };
  };

  return { addReservation, getReservations, updateReservationStatusOnDB, getReservationByAdvertId };
};

export default useReservationService;
