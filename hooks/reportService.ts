import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Report, ReportsResponse, REPORTS_TABLE_NAME, REPORT_TABLE } from "../models/report";

const useReportService = () => {
  const supabaseClient = useSupabaseClient();

  const addReportOnAdvert = async (report: Pick<Report, "type" | "description">, reservationId: string) => {
    const { data, error } = await supabaseClient
      .from<"reports", ReportsResponse>(REPORTS_TABLE_NAME)
      .insert({ ...report, reservation_id: reservationId })
      .select()
      .single();

    return { data, error };
  };

  // Not being used. for the unihosts panel.
  const getReports = async (advertId: string) => {
    const { data, error } = await supabaseClient
      .from<"reports", ReportsResponse>(REPORTS_TABLE_NAME)
      .select()
      .eq(REPORT_TABLE.ADVERT_ID, advertId);
    return { data, error };
  };

  return { addReportOnAdvert, getReports };
};

export default useReportService;
