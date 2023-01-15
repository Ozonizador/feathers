import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";
import { Report, ReportsResponse, REPORTS_TABLE_NAME, REPORT_TABLE } from "../models/report";

const useReportService = () => {
  const supabaseClient = useSupabaseClient();

  const addReportOnAdvert = async (report: Partial<Report>) => {
    const { data, error } = await supabaseClient
      .from(REPORTS_TABLE_NAME)
      .insert({ ...report, updated_at: new Date().toDateString(), id: uuidv4() });
    return { data, error };
  };

  const getReports = async (advertId: string) => {
    const { data, error } = await supabaseClient
      .from<"reports", ReportsResponse>(REPORTS_TABLE_NAME)
      .select()
      .eq(REPORT_TABLE.ADVERT_ID, advertId);
    return { data, error };
  };

  const checkIfReportWasMade = async (stay_id: string) => {
    try {
      const { data, error } = await supabaseClient
        .from<"reports", ReportsResponse>(REPORTS_TABLE_NAME)
        .select()
        .eq(REPORT_TABLE.STAY_ID, stay_id)
        .single();

      return data ? true : false;
    } catch (err) {
      return false;
    }
  };

  return { addReportOnAdvert, getReports, checkIfReportWasMade };
};

export default useReportService;
