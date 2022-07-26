import React, { Fragment, useCallback, useState } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { useModalReportAdvertisement, useSetModalReportAdvertisement } from "../../context/ModalShowProvider";
import { Report, ReportsType } from "../../models/report";
import { addReportOnAdvert } from "../../services/reportService";
import { useProfileInformation } from "../../context/MainProvider";

/* PAGINA 21-22 DO XD 

para chamar na pagina => <ModalDenuncia /> 
false nao mostra nada true mostra.
*/

interface PassosModaisProps {
  nextStep: () => void;
}

const ModalDenuncia = ({ advertisementId }) => {
  const profile = useProfileInformation();
  const isOpen = useModalReportAdvertisement();
  const setIsOpen = useSetModalReportAdvertisement();

  const [step, setStep] = useState(1);
  const [report, setReport] = useState<Report>({
    type: ReportsType.IMPRECISE,
    advertisementId,
    tenantId: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  const nextStep = () => {
    setStep((oldStep) => oldStep + 1);
  };

  const ModalDenunciaSegundoPasso = () => {
    const setIsOpen = useSetModalReportAdvertisement();

    const closeModal = (event) => {
      event.preventDefault();
      setIsOpen(false);
    };
    return (
      <>
        <div className="container p-6">
          <div>
            <div className="jumbotron m-4 p-4 text-center">
              <h5 className="text-xl font-bold">A UniHosts agradece!</h5>
              <p className="my-7">
                Vamos averiguar a situação. Obrigada por teres denunciado e tornado
                <br />a nosssa comunidade unihosts num lugar melhor!
              </p>
              <button
                type="button"
                className="rounded-lg bg-primary-500 py-2 px-9 text-base text-white"
                onClick={(e) => closeModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ModalDenunciaPrimeiroPasso = ({ nextStep }: PassosModaisProps) => {
    const [description, setDescription] = useState<string>("");

    const changeReportType = (event) => {
      const type = event.target.value;
      setReport({ ...report, type });
    };

    const saveReport = async (event) => {
      event.preventDefault();
      if (profile) {
        setReport({ ...report, description });
        const { data, error } = await addReportOnAdvert(report, advertisementId, profile.id);
        if (data) {
          nextStep();
        }
      }
    };

    return (
      <div className="container p-6">
        <div>
          <div tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className=" ">
              <div className="" id="model-radius">
                <div className="m-2">
                  <h5 className="mt-2 text-2xl font-semibold">Porque estás a denunciar esta conta?</h5>
                  <p className="mt-7 mb-10 text-xl">
                    A tua denúncia é anónima e deves ter em conta que pode prejudicar outros caso não seja verdadeira.
                    Se este anúncio é impróprio ou não condiz com a realidade por favor reporta.{" "}
                  </p>
                  <div className="radio mb-4">
                    <label>
                      <input
                        className="m-2"
                        type="radio"
                        name="optradio"
                        value={ReportsType.IMPRECISE}
                        checked={report.type === ReportsType.IMPRECISE}
                        onChange={changeReportType}
                      />
                      É impreciso ou incorreto
                    </label>
                  </div>
                  <div className="radio mb-4">
                    <label>
                      <input
                        className="m-2"
                        type="radio"
                        name="optradio"
                        value={ReportsType.NOT_REALITY}
                        checked={report.type === ReportsType.NOT_REALITY}
                        onChange={changeReportType}
                      />
                      Não corresponde à realidade
                    </label>
                  </div>
                  <div className="radio mb-4">
                    <label>
                      <input
                        className="m-2"
                        type="radio"
                        name="optradio"
                        value={ReportsType.SCAM}
                        checked={report.type === ReportsType.SCAM}
                        onChange={changeReportType}
                      />
                      É um esquema
                    </label>
                  </div>
                  <div className="radio mb-4">
                    <label>
                      <input
                        className="m-2"
                        type="radio"
                        name="optradio"
                        value={ReportsType.OFFENSIVE}
                        checked={report.type === ReportsType.OFFENSIVE}
                        onChange={changeReportType}
                      />
                      É ofensivo
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        className="m-2"
                        type="radio"
                        name="optradio"
                        value={ReportsType.OTHER}
                        checked={report.type === ReportsType.OTHER}
                        onChange={changeReportType}
                      />
                      É outra coisa
                    </label>
                  </div>
                  <div className="w-5/6">
                    <textarea
                      className="form-control w-full rounded-md border border-terciary-500 bg-white"
                      id="exampleFormControlTextarea1"
                      rows={3}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Conta-nos mais sobre isso"
                      defaultValue={description}
                    ></textarea>
                  </div>
                  <div className="flex flex-1 justify-end">
                    <button
                      type="button"
                      className="mx-5 rounded-lg bg-primary-500 py-2 px-9 text-base text-white"
                      onClick={saveReport}
                    >
                      Seguinte
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="flex bg-primary-100 p-5 text-lg font-medium leading-6 text-gray-900">
                  <Image className="m-2" src="/images/flag.png" alt="" width="40px" height="30px" />
                  <span className="my-auto ml-5 text-3xl font-bold">Reportar anúncio</span>
                </Dialog.Title>
                {step === 1 && <ModalDenunciaPrimeiroPasso nextStep={nextStep} />}
                {step === 2 && <ModalDenunciaSegundoPasso />}
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalDenuncia;
