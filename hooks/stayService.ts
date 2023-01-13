import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";
import { RESERVATION_TABLE, RESERVATION_TABLE_NAME } from "../models/reservation";
import { Stay, StayGuest, Stays, STAYS_TABLE_NAME, StayWithReservation, STAY_TABLE } from "../models/stay";

const useStayService = () => {
  const supabaseClient = useSupabaseClient();
  const getStays = async () => {
    const { data, error } = await supabaseClient.from<"stays", Stay>(STAYS_TABLE_NAME).select();
    return { data, error };
  };

  /* BY TENANT ID */

  const getNextStaysByTenantId = async (tenantId: string) => {
    const date = new Date().toISOString();
    const { data, error } = await supabaseClient
      .from<"stays", StayWithReservation>(STAYS_TABLE_NAME)
      .select("*, advertisement:advertisement_id(*), reservation:reservation_id(*)")
      .eq(STAY_TABLE.TENANT_ID, tenantId)
      .gte("reservation.start_date", date)
      .lte("reservation.end_date", date);

    return { data, error };
  };

  const getCurrentStayByTenantId = async (tenantId: string) => {
    const date = new Date().toISOString();

    const { data, error } = await supabaseClient
      .from<"stays", StayWithReservation>(STAYS_TABLE_NAME)
      .select("*, advertisement:advertisement_id(*), reservation:reservation_id(*)")
      .eq(STAY_TABLE.TENANT_ID, tenantId)
      .gte("reservation.start_date", date)
      .lte("reservation.end_date", date)
      .single();

    return { data, error };
  };

  const getHistoryStayByTenantId = async (tenantId: string) => {
    const { data, error } = await supabaseClient
      .from<"stays", Stay>(STAYS_TABLE_NAME)
      .select()
      .eq(STAY_TABLE.TENANT_ID, tenantId)
      .lte("reservation.end_date", new Date());

    return { data, error };
  };

  /* BY HOST ID */

  const getCurrentStaysByHostId = async (hostId: string) => {
    const date = new Date().toISOString();

    const { data, error } = await supabaseClient
      .from<"stays", StayGuest>(STAYS_TABLE_NAME)
      .select(
        "*, tenant:tenant_id(id, name, avatar_url), advertisement:advertisement_id(id, type, place, host_id), reservation:reservation_id(*)"
      )
      .eq("advertisement.host_id", hostId)
      .gte("reservation.start_date", date)
      .lte("reservation.end_date", date);

    return { data, error };
  };

  const getNextStaysByHostId = async (hostId: string) => {
    const date = new Date().toISOString();

    const { data, error } = await supabaseClient
      .from<"stays", StayGuest>(STAYS_TABLE_NAME)
      .select(
        "*, tenant:tenant_id(id, name, avatar_url), advertisement:advertisement_id(id, type, place, host_id), reservation:reservation_id(*)"
      )
      .eq("advertisement.host_id", hostId)
      .gte(RESERVATION_TABLE.START_DATE, date)
      .gte(RESERVATION_TABLE.END_DATE, date);

    return { data, error };
  };

  const getAllStaysByHostId = async (hostId: string) => {
    const { data, error } = await supabaseClient
      .from<"stays", StayGuest>(STAYS_TABLE_NAME)
      .select(
        "*, tenant:tenant_id(id, name, avatar_url), advertisement:advertisement_id(id, type, place, host_id), reservation:reservation_id(*)"
      )
      .eq("advertisement.host_id", hostId);

    return { data, error };
  };

  return {
    getHistoryStayByTenantId,
    getStays,
    getAllStaysByHostId,
    getNextStaysByHostId,
    getCurrentStayByTenantId,
    getCurrentStaysByHostId,
    getNextStaysByTenantId,
  };
};

export default useStayService;
