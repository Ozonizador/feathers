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
import { useCallback, useEffect, useState } from "react";
import { useProfileInformation } from "../../../context/MainProvider";
import useStayService from "../../../hooks/stayService";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { StayComplete, StayWithReservation } from "../../../models/stay";
import { GetServerSidePropsContext } from "next";
import Breadcrumbs from "../../../components/utils/Breadcrumbs";

// icons

import IconStay from "../../../public/images/icon-profile.svg";
import { PROCURAR_ADVERT_URL, UNIDESK_URL } from "../../../models/paths";

/* PAGINA 21 do xd */

const EstadiaBreadcrumbs = [
  { url: UNIDESK_URL, label: "Perfil" },
  { url: "", label: "Informações" },
] as {
  url: string;
  label: string;
}[];

const Estadia = () => {
  const profile = useProfileInformation();
  const { getCurrentStayByTenantId, getNextStaysByTenantId } = useStayService();

  const [currentStay, setCurrentStay] = useState<StayComplete>();
  const [nextStays, setNextStays] = useState<StayComplete[]>([]);

  const getProfileStays = useCallback(async () => {
    if (profile) {
      const { data, error } = await getCurrentStayByTenantId(profile.id);
      if (!error) setCurrentStay(data as StayComplete);
    }
  }, [profile]);

  const getNextReservations = useCallback(async () => {
    if (profile) {
      const { data, error } = await getNextStaysByTenantId(profile.id);
      if (!error) setNextStays(data as StayComplete[]);
    }
  }, [profile]);

  useEffect(() => {
    getProfileStays();
    getNextReservations();
  }, [getProfileStays, getNextReservations]);

  return (
    <ModalApplyShowProvider>
      <ModalReportarAnuncioProvider>
        <ModalAlterarReservaProvider>
          <>
            <div>
              <Breadcrumbs icon={IconStay} paths={EstadiaBreadcrumbs} />
              <div className="container mx-auto my-20 w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300  pl-0 lg:container lg:my-20 lg:w-full  lg:px-0 ">
                <div className="flex flex-col lg:flex-row">
                  <div className="mx-auto p-5 lg:ml-auto lg:border-r lg:p-12">
                    <MenuEstudante />
                  </div>
                  <div className="mx-auto w-4/5  pt-12 text-center lg:ml-12 lg:text-left">
                    <div className="mb-7 text-2xl font-semibold">Informações gerais</div>
                    <div className="mt-7 mb-5 text-xl text-gray-600">Estadia atual</div>

                    {/* Modais */}
                    <ModalDenuncia />
                    <ModalAvaliarExperiencia />
                    <ModalAlterarReserva />
                    {/* Logica visivel */}

                    <div className="flex items-center justify-center lg:justify-between">
                      {currentStay && (
                        <>
                          <StayCard stay={currentStay} />
                          <StayInfo stay={currentStay} />
                        </>
                      )}
                      {!currentStay && <div>Não tem estadia programada</div>}
                    </div>
                    <div className="flex w-full flex-col items-center justify-center align-middle">
                      {nextStays && nextStays.length !== 0 && (
                        <div className="mt-2">
                          <h6>Próximas estadias</h6>
                          {nextStays.map((stay, index) => {
                            return (
                              <div key={index} className="mt-2 flex  flex-row items-center gap-2">
                                <StayCard stay={stay} />

                                <StayInfo stay={stay} />
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <>
                        <div className="justify-center lg:mt-10">
                          <div className="mt-12 mb-5 text-base text-primary-500">Não tem + estadias programadas</div>
                        </div>
                        <Link href={PROCURAR_ADVERT_URL}>
                          <a className="my-10 flex w-full items-center justify-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-56">
                            Encontrar
                            <span className="px-1">
                              <CgHome />
                            </span>
                            em...
                          </a>
                        </Link>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </ModalAlterarReservaProvider>
      </ModalReportarAnuncioProvider>
    </ModalApplyShowProvider>
  );
};

export default Estadia;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
