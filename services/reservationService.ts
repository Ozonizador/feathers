import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import Advertisement, { ADVERTISEMENT_PROPERTIES } from "../models/advertisement";
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

/* BY TENANT ID */

export const getNextReservationsByTenantId = async (tenantId: string) => {
  const date = new Date().toISOString();
  const { data, error } = await supabaseClient
    .from<Reservation>(RESERVATION_TABLE_NAME)
    .select("*, advertisement:advertisementId(*)")
    .eq(RESERVATION_TABLE.TENANT_ID, tenantId)
    .eq(RESERVATION_TABLE.STATUS, ReservationStatus.ACCEPTED)
    .gte(RESERVATION_TABLE.START_DATE, date);

  return { data, error };
};

export const getCurrentReservationByTenantId = async (tenantId: string) => {
  const date = new Date().toISOString();

  const { data, error } = await supabaseClient
    .from<Reservation>(RESERVATION_TABLE_NAME)
    .select("*, advertisement:advertisementId(*)")
    .eq(RESERVATION_TABLE.TENANT_ID, tenantId)
    // .eq(RESERVATION_TABLE.STATUS, ReservationStatus.ACCEPTED)
    // .gte(RESERVATION_TABLE.START_DATE, date)
    // .lte(RESERVATION_TABLE.END_DATE, date)
    .single();

  debugger;
  return { data, error };
};

export const getHistoryReservationsByTenantId = async (tenantId: string) => {
  const { data, error } = await supabaseClient
    .from<Reservation>(RESERVATION_TABLE_NAME)
    .select()
    .eq(RESERVATION_TABLE.TENANT_ID, tenantId)
    .lte(RESERVATION_TABLE.END_DATE, new Date());

  return { data, error };
};

/* BY HOST ID */

export const getCurrentReservationsByHostId = async (hostId: string) => {
  const { data, error } = await supabaseClient
    .from(RESERVATION_TABLE_NAME)
    .select("*, tenant:tenantId(*), advertisement:advertisementId(id, type, place)")
    .eq(RESERVATION_TABLE.STATUS, ReservationStatus.ACCEPTED)
    .eq(RESERVATION_TABLE.HOST_ID, hostId);

  return { data, error };
};
