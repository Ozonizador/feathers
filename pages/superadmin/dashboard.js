import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";

// components
import CardLineChart from "../../components/notus/Cards/CardLineChart.js";
import CardBarChart from "../../components/notus/Cards/CardBarChart.js";
import CardPageVisits from "../../components/notus/Cards/CardPageVisits.js";
import CardSocialTraffic from "../../components/notus/Cards/CardSocialTraffic.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard(props) {
  const reservations = props.reservations;
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart/>
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-full mb-12 xl:mb-0 px-4">
          <CardPageVisits data={reservations}/>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
export const getServerSideProps = async (ctx) => {
  const locale = ctx.locale;
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, count, error } = await supabaseAdmin
    .from("reservations")
    .select('*, advertisement:advertisement_id(*), tenant:tenant_id(*)')
    .order('created_at', {ascending: false})
    .range(0,4);

  return {
    props: {
      reservations: data,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
