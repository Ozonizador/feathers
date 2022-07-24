import MenuEstudante from "../../../components/unidesk/Menus/MenuEstudante";
import Breadcrumbs from "../../../components/Stay/Breadcrumbs/Breadcrumbs";
import StayCard from "../../../components/Stay/Card/StayCard";
import Link from "next/link";
import { CgHome } from "react-icons/cg";

import {
  ModalApplyShowProvider,
  ModalDetalhesPagamentoProvider,
  ModalReportarAnuncioProvider,
} from "../../../context/ModalShowProvider";
import ModalAvaliarExperiencia from "../../../components/modals/ModalAvaliarExperiencia";
import ModalAlterarReserva from "../../../components/modals/ModalAlteralReserva";
import ModalDenuncia from "../../../components/modals/ModalDenuncia";
import StayInfo from "../../../components/Stay/Info/StayInfo";
/* PAGINA 21 do xd */
const Estadia = () => {
  return (
    <ModalApplyShowProvider>
      <ModalReportarAnuncioProvider>
        <ModalAlterarReservaProvider>
          <>
            {/* Modais */}
            <ModalDenuncia />
            <ModalAvaliarExperiencia />
            <ModalAlterarReserva />
            {/* Logica visivel */}
            <div>
              <Breadcrumbs />
              <div className="mx-auto my-20  w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300 py-12 px-12">
                <div className="flex">
                  <div className="mr-12 w-1/5">
                    <MenuEstudante />
                  </div>
                  <div>
                    <div className="ml-12">
                      <div className="text-3xl font-bold">Informações gerais</div>
                      <div className="mt-7 mb-5 text-xl text-gray-600">Estadia atual</div>
                    </div>
                    <div className="ml-10 flex items-center justify-between">
                      <StayCard />
                      <StayInfo />
                    </div>

                    <div className="flex w-full flex-col items-center justify-center align-middle">
                      <div className="mt-12 mb-5 text-base text-primary-500">Não tem + estadias programadas</div>
                      <Link href="/">
                        <a className="hover: flex w-48 items-center  justify-center rounded-md  bg-primary-500 px-9 py-3 align-middle text-base text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
                          Encontrar{" "}
                          <span className="px-1">
                            <CgHome />
                          </span>{" "}
                          em...
                        </a>
                      </Link>
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
