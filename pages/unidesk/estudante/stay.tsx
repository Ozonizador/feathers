import MenuEstudante from "../../../components/unidesk/Menus/MenuEstudante";
import StayCard from "../../../components/Stay/Card/StayCard";
import Link from "next/link";
import { CgHome } from "react-icons/cg";

import {
  ModalAlterarReservaProvider,
  ModalApplyShowProvider,
  ModalReportarAnuncioProvider,
} from "../../../context/ModalShowProvider";
import ModalAvaliarExperiencia from "../../../components/modals/ModalAvaliarExperiencia";
import ModalAlterarReserva from "../../../components/modals/ModalAlteralReserva";
import ModalDenuncia from "../../../components/modals/ModalDenuncia";
import StayInfo from "../../../components/Stay/Info/StayInfo";
import { GetServerSidePropsContext } from "next";
import Breadcrumbs, { BreadcrumbPath } from "../../../components/utils/Breadcrumbs";

// icons
import IconStay from "../../../public/images/icon-profile.svg";
import { PROCURAR_ADVERT_URL, UNIDESK_URL } from "../../../models/paths";
import { format } from "date-fns";
import { UnideskStructure } from "../../../components/unidesk/UnideskStructure";
import { ReservationComplete, Reservations, RESERVATION_TABLE_NAME } from "../../../models/reservation";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

/* PAGINA 21 do xd */

const EstadiaBreadcrumbs = [
  { url: UNIDESK_URL, label: "uni-desk" },
  { url: "", label: "my_stay" },
] as BreadcrumbPath[];

interface EstadiaComponentProps {
  currentStay: ReservationComplete;
  nextStays: ReservationComplete[];
}

const EstadiaComponent = ({ currentStay, nextStays }: EstadiaComponentProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log(nextStays)
  })

  return (
    <ModalApplyShowProvider>
      <ModalReportarAnuncioProvider>
        <ModalAlterarReservaProvider>
          <>
            <div className="">
              <Breadcrumbs icon={IconStay} paths={EstadiaBreadcrumbs} />
              <UnideskStructure>
                <UnideskStructure.Menu>
                  <MenuEstudante activeSection={"stay"} activeUrl={"general"} />
                </UnideskStructure.Menu>
                <UnideskStructure.Content>
                  <div className="w-5/6">
                    <div className="mb-4 text-2xl font-semibold">{t("admin:unidesk.student.general")}</div>
                    <h6 className="text-left text-xl text-gray-600">{t("admin:unidesk.student.current_stay")}</h6>
                    {/* Modais */}
                    <ModalDenuncia />
                    <ModalAvaliarExperiencia />
                    <ModalAlterarReserva />
                    {/* Logica visivel */}
                    <div className="flex flex-col gap-7 px-0 md:flex-wrap lg:flex-row lg:gap-10">
                      {currentStay && (
                        <>
                          <StayCard stay={currentStay} />
                          <StayInfo reservation={currentStay} options={{ isNextStay: false }} />
                        </>
                      )}
                      {!currentStay && <div>{t("admin:unidesk.student.no_stay")}</div>}
                    </div>
                    <div className="mt-5 flex flex-col gap-3">
                      <h6 className="text-xl text-gray-600">{t("admin:unidesk.student.next_stays")}</h6>
                      <>
                        {nextStays &&
                          nextStays.map((stay) => {
                            return (
                              <div
                                className="stay_div flex flex-col gap-7 md:flex-wrap lg:flex-row lg:gap-10"
                                key={stay.id}
                              >
                                <StayCard stay={stay} />
                                <StayInfo reservation={stay} options={{ isNextStay: true }} />
                              </div>
                            );
                          })}
                        <div className="mt-12 text-center text-base text-primary-500">
                          {t("admin:unidesk.student.no_next_stay")}
                        </div>
                      </>

                      <div className="flex justify-center">
                        <Link
                          href={PROCURAR_ADVERT_URL}
                          className="my-10 flex w-full items-center justify-center rounded-md bg-primary-500 px-9  py-4 text-center leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-56"
                        >
                          {t("find")}
                          <span className="px-1">
                            <CgHome />
                          </span>
                          {t("at")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </UnideskStructure.Content>
              </UnideskStructure>
            </div>
          </>
        </ModalAlterarReservaProvider>
      </ModalReportarAnuncioProvider>
    </ModalApplyShowProvider>
  );
};

export default EstadiaComponent;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };
  }

  const user = session.user;
  const date = new Date();
  const formattedDate = format(date, "yyyy-MM-dd");

  const getCurrentUserStay = async () => {
    const { data, error } = await supabase
      .from<"reservations", Reservations>(RESERVATION_TABLE_NAME)
      .select("*, advertisement:advertisement_id(*), reports(id), reviews(id)")
      .match({ tenant_id: user.id})
      .in("status", ["ACCEPTED", "CHANGE_ACCEPTED"])
      .lte("start_date", formattedDate)
      .gte("end_date", formattedDate)
      .single();

    return { data, error };
  };

  const getNextStaysForUser = async () => {
    const { data, error } = await supabase
      .from<"reservations", Reservations>(RESERVATION_TABLE_NAME)
      .select("*, advertisement:advertisement_id(*), reports(id), reviews(id)")
      .match({ tenant_id: user.id})
      .in("status", ["ACCEPTED", "CHANGE_ACCEPTED"])
      .gte("start_date", formattedDate)
      .gte("end_date", formattedDate);

    return { data, error };
  };

  const [currentUserStay, nextUserStays] = await Promise.all([getCurrentUserStay(), getNextStaysForUser()]);
  const { data: currentStay, error: currentStayError } = currentUserStay;
  const { data: nextStays, error: nextStaysError } = nextUserStays;

  return {
    props: {
      initialSession: session,
      user: session.user,
      currentStay: !currentStayError && currentStay ? currentStay : null,
      nextStays: !nextStaysError && nextStays ? nextStays : [],
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
