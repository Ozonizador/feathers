import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { Reservation, ReservationStatus, RESERVATION_TABLE, RESERVATION_TABLE_NAME } from "../models/reservation";

export const addReservation = async (reservation: Reservation, tenantId: string) => {
  const { data, error } = await supabaseClient
    .from<Reservation>(RESERVATION_TABLE_NAME)
    .insert({ ...reservation, id: uuidv4(), updatedAt: new Date(), tenantId }, { returning: "representation" })
    .single();
  return { data, error };
};

export const getReservations = async () => {
  const { data, error } = await supabaseClient.from<Reservation>(RESERVATION_TABLE_NAME).select();
  return { data, error };
};

export const getReservationByAdvertId = async (advertId: string) => {
  const { data, error } = await supabaseClient
    .from<Reservation>(RESERVATION_TABLE_NAME)
    .select()
    .eq(RESERVATION_TABLE.ADVERT_ID, advertId);
  return { data, error };
};

export const updateReservationStatusOnDB = async (reservationId: string, status: ReservationStatus) => {
  const { data, error } = await supabaseClient
    .from<Reservation>(RESERVATION_TABLE_NAME)
    .update({ status }, { returning: "representation" })
    .eq(RESERVATION_TABLE.ID, reservationId)
    .single();

  return { data, error };
};
