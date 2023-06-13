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
import Breadcrumbs from "../../../components/utils/Breadcrumbs";

// icons
import IconStay from "../../../public/images/icon-profile.svg";
import { PROCURAR_ADVERT_URL, UNIDESK_URL } from "../../../models/paths";
import { format } from "date-fns";
import { UnideskStructure } from "../../../components/unidesk/UnideskStructure";
import { ReservationComplete, Reservations, RESERVATION_TABLE_NAME } from "../../../models/reservation";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

/* PAGINA 21 do xd */

const EstadiaBreadcrumbs = [
  { url: UNIDESK_URL, label: "Perfil" },
  { url: "", label: "Informações" },
] as {
  url: string;
  label: string;
}[];

interface EstadiaComponentProps {
  currentStay: ReservationComplete;
  nextStays: ReservationComplete[];
}

const EstadiaComponent = ({ currentStay, nextStays }: EstadiaComponentProps) => {
  return (
    <ModalApplyShowProvider>
      <ModalReportarAnuncioProvider>
        <ModalAlterarReservaProvider>
          <>
            <div className="lg:mx-5">
              <Breadcrumbs icon={IconStay} paths={EstadiaBreadcrumbs} />
              <UnideskStructure>
                <UnideskStructure.Menu>
                  <MenuEstudante />
                </UnideskStructure.Menu>
                <UnideskStructure.Content>
                  <div className="mb-4 text-2xl font-semibold">Informações gerais</div>
                  <h6 className="text-left text-xl text-gray-600">Estadia atual</h6>
                  {/* Modais */}
                  <ModalDenuncia />
                  <ModalAvaliarExperiencia />
                  <ModalAlterarReserva />
                  {/* Logica visivel */}
                  <div className="flex flex-col gap-7 px-0 lg:flex-row lg:gap-10">
                    {currentStay && (
                      <>
                        <StayCard stay={currentStay} />
                        <StayInfo reservation={currentStay} options={{ isNextStay: false }} />
                      </>
                    )}
                    {!currentStay && <div>Não tem estadia programada</div>}
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="mt-2">
                      <h6 className="text-xl text-gray-600">Próximas estadias</h6>
                    </div>
                    <>
                      {nextStays &&
                        nextStays.map((stay) => {
                          return (
                            <div className="flex flex-col gap-7 lg:flex-row lg:gap-10" key={stay.id}>
                              <StayCard stay={stay} />
                              <StayInfo reservation={stay} options={{ isNextStay: true }} />
                            </div>
                          );
                        })}
                      <div className="mt-12 text-center text-base text-primary-500">Não tem + estadias programadas</div>
                    </>

                    <div className="flex justify-center">
                      <Link href={PROCURAR_ADVERT_URL}>
                        <a className="my-10 flex w-full items-center justify-center rounded-md bg-primary-500 px-9  py-4 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-56">
                          Encontrar
                          <span className="px-1">
                            <CgHome />
                          </span>
                          em...
                        </a>
                      </Link>
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
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
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
      .match({ tenant_id: user.id, status: "OK" })
      .lte("reservation.start_date", formattedDate)
      .gte("reservation.end_date", formattedDate)
      .single();

    return { data, error };
  };

  const getNextStaysForUser = async () => {
    const { data, error } = await supabase
      .from<"reservations", Reservations>(RESERVATION_TABLE_NAME)
      .select("*, advertisement:advertisement_id(*), reports(id), reviews(id)")
      .match({ tenant_id: user.id, status: "OK" })
      .gte("reservation.start_date", date)
      .gte("reservation.end_date", date);

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
    },
  };
};
