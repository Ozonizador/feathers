import { SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { ReservationWithAdvertisement, RESERVATION_TABLE, RESERVATION_TABLE_NAME } from "../models/reservation";
import { Stay, StayGuest, STAYS_TABLE_NAME, STAY_TABLE } from "../models/stay";

export const addStay = async (supabaseClient: SupabaseClient<any, "public", any>, stay: Stay) => {
  const { data, error } = await supabaseClient
    .from(STAYS_TABLE_NAME)
    .insert({ ...stay, id: uuidv4(), updated_at: new Date() })
    .single();
  return { data, error };
};

export const getStays = async (supabaseClient: SupabaseClient<any, "public", any>) => {
  const { data, error } = await supabaseClient.from<"stays", Stay>(STAYS_TABLE_NAME).select();
  return { data, error };
};

/* BY TENANT ID */

export const getNextStaysByTenantId = async (supabaseClient: SupabaseClient<any, "public", any>, tenantId: string) => {
  const date = new Date().toISOString();
  const { data, error } = await supabaseClient
    .from<"stays", StayGuest>(STAYS_TABLE_NAME)
    .select("*, advertisement:advertisement_id(*)")
    .eq(STAY_TABLE.TENANT_ID, tenantId)
    .gte(STAY_TABLE.START_DATE, date)
    .gte(STAY_TABLE.END_DATE, date);

  return { data, error };
};

export const getCurrentStayByTenantId = async (
  supabaseClient: SupabaseClient<any, "public", any>,
  tenantId: string
) => {
  const date = new Date().toISOString();

  const { data, error } = await supabaseClient
    .from<"stays", StayGuest>(STAYS_TABLE_NAME)
    .select("*, advertisement:advertisement_id(*)")
    .eq(STAY_TABLE.TENANT_ID, tenantId)
    .gte(STAY_TABLE.START_DATE, date)
    .lte(STAY_TABLE.END_DATE, date)
    .single();

  return { data, error };
};

export const getHistoryStayByTenantId = async (
  supabaseClient: SupabaseClient<any, "public", any>,
  tenantId: string
) => {
  const { data, error } = await supabaseClient
    .from<"stays", Stay>(STAYS_TABLE_NAME)
    .select()
    .eq(STAY_TABLE.TENANT_ID, tenantId)
    .lte(STAY_TABLE.END_DATE, new Date());

  return { data, error };
};

/* BY HOST ID */

export const getCurrentStaysByHostId = async (supabaseClient: SupabaseClient<any, "public", any>, hostId: string) => {
  const date = new Date().toISOString();

  const { data, error } = await supabaseClient
    .from<"stays", StayGuest>(STAYS_TABLE_NAME)
    .select("*, tenant:tenant_id(id, name, avatar_url), advertisement:advertisement_id(id, type, place, host_id)")
    .eq("advertisement.host_id", hostId)
    .gte(STAY_TABLE.START_DATE, date)
    .lte(STAY_TABLE.END_DATE, date);

  return { data, error };
};

export const getNextReservationsByHostId = async (
  supabaseClient: SupabaseClient<any, "public", any>,
  hostId: string
) => {
  const date = new Date().toISOString();

  const { data, error } = await supabaseClient
    .from<"reservations", ReservationWithAdvertisement>(RESERVATION_TABLE_NAME)
    .select("*, tenant:tenant_id(id, name, avatar_url), advertisement:advertisement_id(id, type, place, host_id)")
    .eq("advertisement.host_id", hostId)
    .gte(RESERVATION_TABLE.START_DATE, date)
    .gte(RESERVATION_TABLE.END_DATE, date);

  return { data, error };
};

export const getAllReservationsByHostId = async (
  supabaseClient: SupabaseClient<any, "public", any>,
  hostId: string
) => {
  const date = new Date().toISOString();

  const { data, error } = await supabaseClient
    .from<"reservations", ReservationWithAdvertisement>(RESERVATION_TABLE_NAME)
    .select("*, tenant:tenant_id(id, name, avatar_url), advertisement:advertisement_id(id, type, place, host_id)")
    .eq("advertisement.host_id", hostId);

  return { data, error };
};
