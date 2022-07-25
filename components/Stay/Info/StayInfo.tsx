import { BsFlag } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import { AiOutlineStar } from "react-icons/ai";
import {
  useSetModalAlterarReserva,
  useSetModalAvaliarExperiencia,
  useSetModalReportAdvertisement,
} from "../../../context/ModalShowProvider";
import Link from "next/link";

const StayInfo = () => {
  const setModalReport = useSetModalReportAdvertisement();
  const setModalAvaliar = useSetModalAvaliarExperiencia();
  const setModalAlterar = useSetModalAlterarReserva();

  const openModalReport = () => {
    setModalReport(true);
  };

  const openModalAvaliarExperiencia = () => {
    setModalAvaliar(true);
  };

  const openModalAlterarReserva = () => {
    setModalAlterar(true);
  };

  return (
    <div>
      <div className="ml-8 flex w-96 flex-row gap-4">
        <div className="flex flex-1 cursor-pointer flex-col items-center" onClick={() => openModalReport()}>
          <div>
            <BsFlag className="mb-2 text-4xl text-red-500" />
          </div>
          <div className="text-center text-xs">
            Reportar
            <br />
            anúncio
          </div>
        </div>

        <Link href="/unidesk/inbox">
          <a>
            <div className="flex flex-1 flex-col items-center">
              <div>
                <RiMailSendLine className="mb-2 text-4xl text-green-400" />
              </div>
              <div className="text-center text-xs">
                Enviar
                <br />
                mensagem
              </div>
            </div>{" "}
          </a>
        </Link>

        <div className="flex flex-1 cursor-pointer flex-col items-center" onClick={() => openModalAlterarReserva()}>
          <div>
            <TbRefresh className="mb-2 text-4xl text-amber-700" />
          </div>
          <div className="text-center text-xs">
            Alterar
            <br />
            reserva
          </div>
        </div>

        <div className="flex flex-1 cursor-pointer flex-col items-center" onClick={() => openModalAvaliarExperiencia()}>
          <div>
            <AiOutlineStar className="mb-2 text-4xl text-yellow-400" />
          </div>
          <div className="text-center text-xs">
            Avaliar
            <br />
            experiência
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayInfo;
