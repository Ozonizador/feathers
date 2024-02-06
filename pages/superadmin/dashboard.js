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
const colors = ["rgb(196 139 96)", "gray", "rgb(232 232 232)", "blue", "green"];

export default function Dashboard(props) {
  const reservations = props.reservations;
  const reservationCount = props.reservationCount;

  return (
    <>
      <div className="flex flex-wrap">
        <div className="mb-12 w-full px-4 xl:mb-0 xl:w-8/12">
          <CardLineChart data={reservationCount}/>
        </div>
        <div className="w-full px-4 xl:w-4/12">
          <CardBarChart />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap">
        <div className="mb-12 w-full px-4 xl:mb-0 xl:w-full">
          <CardPageVisits data={reservations} />
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

  if (!session)
    return {
      redirect: {
        destination: "/faqs",
        permanent: false,
        locale: locale,
      },
    };

  const user = session.user;
  const { data: profile, error: errorProfile } = await supabaseAdmin
    .from("profiles")
    .select("id, user_type")
    .eq("id", user.id)
    .single();

  if (errorProfile || !profile || profile.user_type !== "ADMIN")
    return {
      redirect: {
        destination: "/",
        permanent: false,
        locale: locale,
      },
    };

  const { data: reservationCount, errorRerservation } = await supabaseAdmin
    .from("reservations")
    .select("created_at")
    .order("created_at", { ascending: false });

    const groupedData = reservationCount.reduce((acc, entry) => {
      const createdAt = new Date(entry.created_at);
      const year = createdAt.getFullYear();
      const month = createdAt.getMonth() + 1; // Months are zero-based
    
      const key = `${year}-${month}`;
      if (!acc[key]) {
        acc[key] = 1;
      } else {
        acc[key]++;
      }
    
      return acc;
    }, {});
    
    // Create arrays for each year with labels and data
    const resultArrays = Object.entries(groupedData).reduce((acc, [yearMonth, count]) => {
      const [year, month] = yearMonth.split('-');
      const existingYearData = acc.find(item => item.label === +year);
    
      if (!existingYearData) {
        acc.push({
          label: +year,
          fill: false,
          backgroundColor: colors[acc.length % colors.length],
          borderColor: colors[acc.length % colors.length],
          data: Array(12).fill(0),
        });
      }
    
      const monthIndex = +month - 1;
      acc.find(item => item.label === +year).data[monthIndex] = count;
    
      return acc;
    }, []);
    

  const { data, count, error } = await supabaseAdmin
    .from("reservations")
    .select("*, advertisement:advertisement_id(*), tenant:tenant_id(*)")
    .order("created_at", { ascending: false })
    .range(0, 4);

  return {
    props: {
      reservations: data,
      reservationCount:  resultArrays,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
