import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";

// components
import CardLineChart from "../../components/notus/Cards/CardLineChart.js";
import CardBarChart from "../../components/notus/Cards/CardBarChart.js";
import CardPageVisits from "../../components/notus/Cards/CardPageVisits.js";
import CardSocialTraffic from "../../components/notus/Cards/CardSocialTraffic.js";
import Sidebar from "../../components/notus/Sidebar/Sidebar";

// layout for page

import Admin from "layouts/Admin.js";
const colors = ["rgb(196 139 96)", "gray", "rgb(232 232 232)", "blue", "green"];

export default function Dashboard(props) {
  const reservations = props.reservations;
  const reservationCount = props.reservationCount;
  const last12MonthsCount = props.last12MonthsCount;
  const last12MonthsDate = props.last12MonthsDate;

  return (
    <>
      <div>
        <Sidebar />
        <div className="ml-64 mt-10">
          <div className="flex flex-wrap">
            <div className="mb-12 w-full px-4 xl:mb-0 xl:w-8/12">
              <CardLineChart data={reservationCount} />
            </div>
            <div className="w-full px-4 xl:w-4/12">
              <CardBarChart data={last12MonthsCount} date={last12MonthsDate} title={"Reservas"} />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap">
            <div className="mb-12 w-full px-4 xl:mb-0 xl:w-full">
              <CardPageVisits data={reservations} />
            </div>
          </div>
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
    .select("created_at, status, payment_status")
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
    const [year, month] = yearMonth.split("-");
    const existingYearData = acc.find((item) => item.label === +year);

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
    acc.find((item) => item.label === +year).data[monthIndex] = count;

    return acc;
  }, []);

  // Function to check if the element is from the last 12 months and has status 'ACCEPTED'
  function isPaid(data) {
    const currentDate = new Date();
    const startMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, 1);

    // Initialize an array to store month-count pairs
    const monthCounts = [];

    // Loop through each month starting from 12 months ago to the current month
    for (let i = 0; i <= 12; i++) {
      const currentMonthDate = new Date(startMonthDate.getFullYear(), startMonthDate.getMonth() + i, 1);
      const monthIndex = currentMonthDate.getMonth();
      const monthKey = currentMonthDate.toISOString().slice(0, 7);

      // Filter entries for the current month
      const validEntries = data.filter((entry) => {
        const createdAtDate = new Date(entry.created_at);
        return (
          createdAtDate >= currentMonthDate &&
          createdAtDate < new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1) &&
          entry.status === "ACCEPTED" &&
          entry.payment_status == "PAID"
        );
      });

      // Add the count for the current month to the array
      monthCounts.push(validEntries.length);
    }

    return monthCounts;
  }

  function countEntriesByMonth(data) {
    const currentDate = new Date();
    const startMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, 1);

    // Initialize an array to store month-count pairs
    const monthCounts = [];

    // Loop through each month starting from 12 months ago to the current month
    for (let i = 0; i <= 12; i++) {
      const currentMonthDate = new Date(startMonthDate.getFullYear(), startMonthDate.getMonth() + i, 1);
      const monthIndex = currentMonthDate.getMonth();
      const monthKey = currentMonthDate.toISOString().slice(0, 7);

      // Filter entries for the current month
      const validEntries = data.filter((entry) => {
        const createdAtDate = new Date(entry.created_at);
        return (
          createdAtDate >= currentMonthDate &&
          createdAtDate < new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1)
        );
      });

      // Add the count for the current month to the array
      monthCounts.push(validEntries.length);
    }

    return monthCounts;
  }

  // Filter the array to get valid elements
  const validElements = {
    data: isPaid(reservationCount),
    fill: false,
    barThickness: 8,
    label: "Confirmadas",
    backgroundColor: colors[0],
    borderColor: colors[0],
  };

  const allElements = {
    data: countEntriesByMonth(reservationCount),
    fill: false,
    barThickness: 8,
    label: "Total",
    backgroundColor: colors[1],
    borderColor: colors[1],
  };

  function getLast12MonthsNames() {
    const currentDate = new Date();
    const monthNames = [];

    for (let i = 0; i < 12; i++) {
      const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = lastMonthDate.toLocaleDateString("pt-PT", { month: "long" });
      const formattedName = `${monthName} ${lastMonthDate.getFullYear() % 100}`;
      monthNames.push(formattedName);
    }

    return monthNames.reverse();
  }

  const combinedArray = [validElements, allElements];

  const { data, count, error } = await supabaseAdmin
    .from("reservations")
    .select("*, advertisement:advertisement_id(*), tenant:tenant_id(*)")
    .order("created_at", { ascending: false })
    .range(0, 4);

  return {
    props: {
      reservations: data,
      last12MonthsCount: combinedArray,
      last12MonthsDate: getLast12MonthsNames(),
      reservationCount: resultArrays,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
