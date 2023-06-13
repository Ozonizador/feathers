import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { Reservation, Reservations, RESERVATION_TABLE, RESERVATION_TABLE_NAME } from "../models/reservation";

const useStayService = () => {
  const supabaseClient = useSupabaseClient();
  const getStays = async () => {
    const { data, error } = await supabaseClient.from<"reservations", Reservations>(RESERVATION_TABLE_NAME).select();
    return { data, error };
  };

  const getHistoryStayByTenantId = async (
    tenantId: string
  ): Promise<{ data: Reservation[] | null; error: PostgrestError | null }> => {
    const { data, error } = await supabaseClient
      .from<"reservations", Reservations>(RESERVATION_TABLE_NAME)
      .select()
      .eq(RESERVATION_TABLE.TENANT_ID, tenantId)
      .lte("reservation.end_date", new Date());

    return { data, error };
  };

  /* BY HOST ID */

  const getCurrentStaysByHostId = async (hostId: string) => {
    const date = new Date().toISOString();

    const { data, error } = await supabaseClient
      .from<"reservations", Reservations>(RESERVATION_TABLE_NAME)
      .select("*, tenant:tenant_id(*), advertisement:advertisement_id(*)")
      .eq("advertisement.host_id", hostId)
      .gte("reservation.start_date", date)
      .lte("reservation.end_date", date);

    return { data, error };
  };

  const getNextStaysByHostId = async (hostId: string) => {
    const date = new Date().toISOString();

    const { data, error } = await supabaseClient
      .from<"reservations", Reservations>(RESERVATION_TABLE_NAME)
      .select("*, tenant:tenant_id(*), advertisement:advertisement_id(*)")
      .eq("advertisement.host_id", hostId)
      .gte(RESERVATION_TABLE.START_DATE, date)
      .gte(RESERVATION_TABLE.END_DATE, date);

    return { data, error };
  };

  const getAllStaysByHostId = async (hostId: string) => {
    const { data, error } = await supabaseClient
      .from<"reservations", Reservations>(RESERVATION_TABLE_NAME)
      .select("*, tenant:tenant_id(*), advertisement:advertisement_id(*)")
      .eq("advertisement.host_id", hostId);

    return { data, error };
  };

  return {
    getHistoryStayByTenantId,
    getStays,
    getAllStaysByHostId,
    getNextStaysByHostId,
    getCurrentStaysByHostId,
  };
};

export default useStayService;
