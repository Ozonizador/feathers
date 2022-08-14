import { BsFlag } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import { AiOutlineStar } from "react-icons/ai";
import {
  useModalAlterarReserva,
  useModalAvaliarExperiencia,
  useModalReportAdvertisement,
  useSetModalAlterarReserva,
  useSetModalAvaliarExperiencia,
  useSetModalReportAdvertisement,
} from "../../../context/ModalShowProvider";
import Link from "next/link";
import { Reservation } from "../../../models/reservation";

interface StayInfoProps {
  reservation: Reservation;
}

const StayInfo = ({ reservation }: StayInfoProps) => {
  // MODAL REPORT
  const modalReportInfo = useModalReportAdvertisement();
  const setModalReport = useSetModalReportAdvertisement();

  const modalAlterarReservaInfo = useModalAlterarReserva();
  const setModalAlterar = useSetModalAlterarReserva();

  const modalAvaliarExperiencia = useModalAvaliarExperiencia();
  const setModalAvaliar = useSetModalAvaliarExperiencia();

  const openModalReport = () => {
    // check if there are any reports already sent.

    // return if yes

    // keep doing if no
    setModalReport({ ...modalReportInfo, isOpen: true, reservation });
  };

  const openModalAvaliarExperiencia = () => {
    // check if there are any reviews already sent.

    // return if yes

    // keep doing if no
    setModalAvaliar({ ...modalAvaliarExperiencia, isOpen: true, reservation });
  };

  const openModalAlterarReserva = () => {
    setModalAlterar({ ...modalAlterarReservaInfo, isOpen: true, reservation });
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

        <div className="flex flex-1 cursor-pointer flex-col items-center">
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
              </div>
            </a>
          </Link>
        </div>

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
