import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { Report, REPORTS_TABLE_NAME, REPORT_TABLE } from "../models/report";

export const addReportOnAdvert = async (report: Report, advertisement_id: string, stay_id: string) => {
  const { data, error } = await supabaseClient
    .from<Report>(REPORTS_TABLE_NAME)
    .insert({ ...report, updated_at: new Date(), stay_id, id: uuidv4(), advertisement_id });
  return { data, error };
};

export const getReports = async (advertId: string) => {
  const { data, error } = await supabaseClient
    .from<Report>(REPORTS_TABLE_NAME)
    .select()
    .eq(REPORT_TABLE.ADVERT_ID, advertId);
  return { data, error };
};

export const checkIfReportWasMade = async (stay_id: string) => {
  try {
    const { data, error } = await supabaseClient
      .from<Report>(REPORTS_TABLE_NAME)
      .select()
      .eq(REPORT_TABLE.STAY_ID, stay_id)
      .single();

    return data ? true : false;
  } catch (err) {
    return false;
  }
};
