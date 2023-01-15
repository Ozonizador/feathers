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
import { StayComplete } from "../../../models/stay";
import { INBOX_URL } from "../../../models/paths";

interface StayInfoProps {
  stay: StayComplete;
}

const StayInfo = ({ stay }: StayInfoProps) => {
  // MODAL REPORT
  const modalReportInfo = useModalReportAdvertisement();
  const setModalReport = useSetModalReportAdvertisement();

  const modalAlterarReservaInfo = useModalAlterarReserva();
  const setModalAlterar = useSetModalAlterarReserva();

  const modalAvaliarExperiencia = useModalAvaliarExperiencia();
  const setModalAvaliar = useSetModalAvaliarExperiencia();

  const openModalReport = () => {
    // check if there are any reports already sent.
    if (stay.report) {
      toast.error("Report was already sent");
      return;
    }

    // TODO change this for the stay
    setModalReport({ ...modalReportInfo, isOpen: true, stay });
  };

  const openModalAvaliarExperiencia = () => {
    // check if there are any reviews already sent.
    if (stay.review) {
      toast.error("Review was already done");
      return;
    }

    // TODO change this
    setModalAvaliar({ ...modalAvaliarExperiencia, isOpen: true, stay });
  };

  const openModalAlterarReserva = () => {
    // TODO change this
    setModalAlterar({ ...modalAlterarReservaInfo, isOpen: true, stay });
  };

  return (
    <div className="my-auto flex w-full flex-row gap-3">
      <div className="flex flex-1 cursor-pointer flex-col items-center" onClick={() => openModalReport()}>
        <BsFlag
          className={classNames("mb-2 text-4xl", {
            "text-red-500": stay?.report === null,
            "text-gray-600": stay?.report !== null,
          })}
        />
        <div className="text-center text-xs">
          Reportar
          <br />
          anúncio
        </div>
      </div>

      <div className="flex flex-1 cursor-pointer flex-col items-center">
        <Link href={INBOX_URL}>
          <a>
            <div className="flex flex-1 flex-col items-center">
              <RiMailSendLine className="mb-2 text-4xl text-green-400" />
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
        <TbRefresh className="mb-2 text-4xl text-amber-700" />
        <div className="text-center text-xs">
          Alterar
          <br />
          reserva
        </div>
      </div>

      <div className="flex flex-1 cursor-pointer flex-col items-center" onClick={() => openModalAvaliarExperiencia()}>
        <AiOutlineStar
          className={classNames("mb-2 text-4xl ", {
            "text-yellow-400": stay?.review === null,
            "text-gray-600": stay?.review !== null,
          })}
        />
        <div className="text-center text-xs">
          Avaliar
          <br />
          experiência
        </div>
      </div>
    </div>
  );
};

export default StayInfo;
