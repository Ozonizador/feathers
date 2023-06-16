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
import { toast } from "react-toastify";
import classNames from "classnames";
import { INBOX_URL } from "../../../models/paths";
import { ReservationComplete } from "../../../models/reservation";

interface StayInfoProps {
  reservation: ReservationComplete;
  options: { isNextStay: boolean };
}

const StayInfo = ({ reservation, options }: StayInfoProps) => {
  const { isNextStay } = options;

  // MODAL REPORT
  const modalReportInfo = useModalReportAdvertisement();
  const setModalReport = useSetModalReportAdvertisement();

  const modalAlterarReservaInfo = useModalAlterarReserva();
  const setModalAlterar = useSetModalAlterarReserva();

  const modalAvaliarExperiencia = useModalAvaliarExperiencia();
  const setModalAvaliar = useSetModalAvaliarExperiencia();

  const openModalReport = () => {
    // check if there are any reports already sent.
    if (reportWasAlreadySent()) {
      toast.error("Report was already sent");
      return;
    }

    setModalReport({ ...modalReportInfo, isOpen: true, reservation });
  };

  const openModalAvaliarExperiencia = () => {
    // check if there are any reviews already sent.
    if (evaluationWasDone()) {
      toast.error("Review was already done");
      return;
    }

    setModalAvaliar({ ...modalAvaliarExperiencia, isOpen: true, reservation });
  };

  const openModalAlterarReserva = () => {
    setModalAlterar({ ...modalAlterarReservaInfo, isOpen: true, reservation });
  };

  const reportWasAlreadySent = (): boolean => {
    return reservation.reports && reservation.reports.length > 0 ? true : false;
  };

  const evaluationWasDone = (): boolean => {
    return reservation.reviews && reservation.reviews.length > 0 ? true : false;
  };

  return (
    <div className="my-auto flex w-full flex-row gap-5 py-1 lg:w-1/2 lg:gap-5 lg:px-2">
      {!reportWasAlreadySent() && (
        <div className="w-18 flex cursor-pointer flex-col items-center gap-1" onClick={() => openModalReport()}>
          <BsFlag
            size={32}
            className={classNames("mb-2 text-4xl", {
              "fill-red-500": !reportWasAlreadySent(),
            })}
          />
          <div className="text-center text-xs lg:text-sm">
            Reportar
            <br />
            anúncio
          </div>
        </div>
      )}

      <div>
        <Link href={INBOX_URL}>
          <a>
            <div className="w-18 flex cursor-pointer flex-col items-center gap-1">
              <RiMailSendLine className="mb-2 text-4xl text-green-400" size={32} />
              <div className="text-center text-xs lg:text-sm">
                Enviar
                <br />
                mensagem
              </div>
            </div>
          </a>
        </Link>
      </div>

      <div className="w-18 flex cursor-pointer flex-col items-center gap-1" onClick={() => openModalAlterarReserva()}>
        <TbRefresh className="mb-2 text-4xl text-amber-700" size={32} />
        <div className="text-center text-xs lg:text-sm">
          Alterar
          <br />
          reserva
        </div>
      </div>

      {!isNextStay && !evaluationWasDone() && (
        <div
          className="w-18 flex cursor-pointer flex-col items-center gap-1"
          onClick={() => openModalAvaliarExperiencia()}
        >
          <AiOutlineStar
            size={32}
            className={classNames("mb-2 text-4xl ", {
              "text-yellow-400": !evaluationWasDone(),
            })}
          />
          <div className="text-center text-xs lg:text-sm">
            Avaliar
            <br />
            experiência
          </div>
        </div>
      )}
    </div>
  );
};

export default StayInfo;
