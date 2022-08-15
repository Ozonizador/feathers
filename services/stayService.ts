import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { ADVERTISEMENT_PROPERTIES } from "../models/advertisement";
import { Stay, StayGuest, STAYS_TABLE_NAME, STAY_TABLE } from "../models/stay";

export const addStay = async (stay: Stay) => {
  const { data, error } = await supabaseClient
    .from<Stay>(STAYS_TABLE_NAME)
    .insert({ ...stay, id: uuidv4(), updatedAt: new Date() }, { returning: "minimal" })
    .single();
  return { data, error };
};

export const getStays = async () => {
  const { data, error } = await supabaseClient.from<Stay>(STAYS_TABLE_NAME).select();
  return { data, error };
};

/* BY TENANT ID */

export const getNextStaysByTenantId = async (tenantId: string) => {
  const date = new Date().toISOString();
  const { data, error } = await supabaseClient
    .from<Stay>(STAYS_TABLE_NAME)
    .select("*, advertisement:advertisementId(*)")
    .eq(STAY_TABLE.TENANT_ID, tenantId)
    .gte(STAY_TABLE.START_DATE, date);

  return { data, error };
};

export const getCurrentStayByTenantId = async (tenantId: string) => {
  const date = new Date().toISOString();

  const { data, error } = await supabaseClient
    .from<Stay>(STAYS_TABLE_NAME)
    .select("*, advertisement:advertisementId(*)")
    .eq(STAY_TABLE.TENANT_ID, tenantId)
    .gte(STAY_TABLE.START_DATE, date)
    .lte(STAY_TABLE.END_DATE, date)
    .single();

  return { data, error };
};

export const getHistoryStayByTenantId = async (tenantId: string) => {
  const { data, error } = await supabaseClient
    .from<Stay>(STAYS_TABLE_NAME)
    .select()
    .eq(STAY_TABLE.TENANT_ID, tenantId)
    .lte(STAY_TABLE.END_DATE, new Date());

  return { data, error };
};

/* BY HOST ID */

export const getCurrentStaysByHostId = async (hostId: string) => {
  const date = new Date().toISOString();

  const { data, error } = await supabaseClient
    .from(STAYS_TABLE_NAME)
    .select("*, tenant:tenantId(name, avatarUrl), advertisement:advertisementId(id, type, place, hostId)")
    .eq("advertisement.hostId", hostId)
    .gte(STAY_TABLE.START_DATE, date)
    .lte(STAY_TABLE.END_DATE, date);

  return { data, error };
};
