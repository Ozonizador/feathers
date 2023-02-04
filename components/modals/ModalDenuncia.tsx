import React, { Fragment, useCallback, useState } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import {
  useModalReportAdvertisement,
  useSetModalReportAdvertisement,
  useSetModalReportContextProperty,
  useSetOpenModalReport,
} from "../../context/ModalShowProvider";
import { Report, ReportsType } from "../../models/report";
import { useCurrentUser } from "../../context/MainProvider";
import useReportService from "../../hooks/reportService";
import FeathersSpinner from "../utils/Spinner";

/* PAGINA 21-22 DO XD */

const ModalDenuncia = () => {
  const { addReportOnAdvert } = useReportService();
  const profile = useCurrentUser();
  const { isOpen, step, stay } = useModalReportAdvertisement();
  const setModalReportProperty = useSetModalReportContextProperty();
  const setIsOpen = useSetOpenModalReport();

  const [loading, setLoading] = useState<boolean>(false);
  const [report, setReport] = useState<Pick<Report, "type" | "description">>({
    type: ReportsType.IMPRECISE,
    description: "",
  });

  function closeModal() {
    setIsOpen(false);
    setReport((oldReport) => ({ ...oldReport, description: "" }));
  }

  const nextStep = () => {
    setModalReportProperty("step", step + 1);
  };

  const changeReportType = (event) => {
    const type = event.target.value;
    setReport({ ...report, type });
  };

  const changeReportDescription = (event) => {
    event.preventDefault();
    const description = event.target.value;
    setReport({ ...report, description });
  };

  const saveReport = async (event) => {
    event.preventDefault();

    if (!profile) return;
    setLoading(true);
    const { data, error } = await addReportOnAdvert(report, stay.id);
    if (!error) nextStep();
    setLoading(false);
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
              <Dialog.Panel className="w-full transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all lg:w-1/2">
                <Dialog.Title as="h3" className="flex bg-primary-100 p-5 text-lg font-medium leading-6 text-gray-900">
                  <Image src="/images/flag.png" alt="" width="40px" height="30px" />
                  <span className="my-auto ml-5  text-xl font-bold lg:text-3xl">Reportar anúncio</span>
                </Dialog.Title>
                {step === 1 && (
                  <>
                    <div className="container p-6">
                      <div tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div id="model-radius">
                          <div>
                            <h5 className="mt-2 text-xl font-semibold lg:text-2xl">
                              Porque estás a denunciar esta conta?
                            </h5>
                            <p className="mt-7 mb-10 text-justify lg:text-xl">
                              A tua denúncia é anónima e deves ter em conta que pode prejudicar outros caso não seja
                              verdadeira. Se este anúncio é impróprio ou não condiz com a realidade por favor reporta.
                            </p>
                            <div className="flex flex-col gap-3">
                              <div className="flex gap-3">
                                <input
                                  type="radio"
                                  name="optradio"
                                  className="my-auto"
                                  value={ReportsType.IMPRECISE}
                                  checked={report.type === ReportsType.IMPRECISE}
                                  onChange={changeReportType}
                                />
                                <label>É impreciso ou incorreto</label>
                              </div>
                              <div className="flex gap-3">
                                <input
                                  type="radio"
                                  name="optradio"
                                  className="my-auto"
                                  value={ReportsType.NOT_REALITY}
                                  checked={report.type === ReportsType.NOT_REALITY}
                                  onChange={changeReportType}
                                />
                                <label>Não corresponde à realidade</label>
                              </div>
                              <div className="flex gap-3">
                                <input
                                  type="radio"
                                  name="optradio"
                                  className="my-auto"
                                  value={ReportsType.SCAM}
                                  checked={report.type === ReportsType.SCAM}
                                  onChange={changeReportType}
                                />
                                <label>É um esquema</label>
                              </div>
                              <div className="flex gap-3">
                                <input
                                  type="radio"
                                  name="optradio"
                                  className="my-auto"
                                  value={ReportsType.OFFENSIVE}
                                  checked={report.type === ReportsType.OFFENSIVE}
                                  onChange={changeReportType}
                                />
                                <label>É ofensivo</label>
                              </div>
                              <div className="flex gap-3">
                                <input
                                  type="radio"
                                  name="optradio"
                                  className="my-auto"
                                  value={ReportsType.OTHER}
                                  checked={report.type === ReportsType.OTHER}
                                  onChange={changeReportType}
                                />
                                <label>É outra coisa</label>
                              </div>
                              <div className="mt-3 w-full">
                                <textarea
                                  className="form-control w-full rounded-md border border-terciary-500 bg-white"
                                  id="exampleFormControlTextarea1"
                                  key="description-textarea"
                                  rows={3}
                                  onChange={(e) => changeReportDescription(e)}
                                  placeholder="Conta-nos mais sobre isso"
                                  defaultValue={report.description}
                                ></textarea>
                              </div>
                              <div className="flex flex-1 justify-center lg:justify-end">
                                <button
                                  type="button"
                                  className="rounded-lg bg-primary-500 py-2 px-9 text-base text-white"
                                  onClick={saveReport}
                                  disabled={loading}
                                >
                                  {loading ? <FeathersSpinner /> : "Seguinte"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {step === 2 && <ModalDenunciaSegundoPasso />}
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const ModalDenunciaSegundoPasso = () => {
  const reportModal = useModalReportAdvertisement();
  const setModalReport = useSetModalReportAdvertisement();

  const closeModal = (event) => {
    event.preventDefault();
    setModalReport({ ...reportModal, isOpen: false, step: 1 });
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
              onClick={closeModal}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDenuncia;
