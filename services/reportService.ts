import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { Report, REPORTS_TABLE_NAME, REPORT_TABLE } from "../models/report";

export const addReportOnAdvert = async (report: Report, advertisementId: string, tenantId: string) => {
  const { data, error } = await supabaseClient
    .from<Report>(REPORTS_TABLE_NAME)
    .insert({ ...report, updatedAt: new Date(), tenantId, id: uuidv4(), advertisementId });
  return { data, error };
};

export const getReports = async (advertId: string) => {
  const { data, error } = await supabaseClient
    .from<Report>(REPORTS_TABLE_NAME)
    .select()
    .eq(REPORT_TABLE.ADVERT_ID, advertId);
  return { data, error };
};
