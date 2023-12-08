import HospedesMenu from "../../../components/unidesk/Menus/HospedesMenu";
import HospedeCard from "../../../components/hospedes/HospedeCard/HospedeCard";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Breadcrumbs, { BreadcrumbPath } from "../../../components/utils/Breadcrumbs";

// Icon
import IconAHospedes from "../../../public/images/icon-pg37-1.svg";
import { ReservationGuest, Reservations, RESERVATION_TABLE_NAME } from "../../../models/reservation";
import { UNIDESK_URL } from "../../../models/paths";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import MenuSenhorio from "../../../components/unidesk/Menus/MenuSenhorio";

const paths = [
  { url: UNIDESK_URL, label: "uni-desk" },
  { url: UNIDESK_URL, label: "uni-controlo" },
  { url: "", label: "guest_other" },
] as BreadcrumbPath[];

interface UniControloHospedesProps {
  stays: ReservationGuest[];
}

const UniControloHospedes = ({ stays }: UniControloHospedesProps) => {
  const { t } = useTranslation();
  return (
    <section className="max-width">
      <Breadcrumbs icon={IconAHospedes} paths={paths} />

      <div className="mx-7 my-16 w-full bg-terciary-300">
        <div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex justify-center lg:py-12 lg:px-6 ">
            <MenuSenhorio activeSection="uni-controlo" activeUrl="guests"/>
          </div>  

          <div className="flex flex-col gap-3 px-3 pt-12 lg:mx-auto lg:ml-12 lg:w-4/5">
            <>
              <div className="mb-7 text-3xl font-semibold">{t("guest", { count: 2 })}</div>
              <div className="mb-5 font-bold">{t("admin:guests.current_guests")}</div>
              {!stays || (stays.length === 0 && <div>{t("admin:guests.no_guests")}</div>)}
              {stays &&
                stays.map((stay, index) => {
                  return <HospedeCard stay={stay} key={index} />;
                })}
            </>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniControloHospedes;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };

  const host = session.user;
  const date = new Date().toISOString();

  const { data, error } = await supabase
    .from<"reservations", Reservations>(RESERVATION_TABLE_NAME)
    .select("*, tenant:tenant_id(*), advertisement:advertisement_id(*)")
    .eq("advertisement.host_id", host.id)
    .gte("start_date", date)
    .lte("end_date", date);

  return {
    props: {
      initialSession: session,
      user: session.user,
      stays: error ? [] : data,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
