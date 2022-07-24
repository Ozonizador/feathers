import React, { Fragment, useState } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import next from "next";
import { useModalReportAdvertisement, useSetModalReportAdvertisement } from "../../context/ModalShowProvider";

/* PAGINA 21-22 DO XD 

para chamar na pagina => <ModalDenuncia /> 
false nao mostra nada true mostra.
*/

const ModalDenuncia = () => {
  const isOpen = useModalReportAdvertisement();
  const setIsOpen = useSetModalReportAdvertisement();
  const [step, setStep] = useState(1);

  function closeModal() {
    setIsOpen(false);
  }

  const nextStep = () => {
    setStep((oldStep) => oldStep + 1);
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
                {step === 2 && <ModalDenunciaSegundoPasso nextStep={nextStep} />}
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

interface PassosModaisProps {
  nextStep: () => void;
}

const ModalDenunciaPrimeiroPasso = ({ nextStep }: PassosModaisProps) => {
  return (
    <div className="container p-6">
      <div>
        <div tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className=" ">
            <div className="" id="model-radius">
              <div className="m-2">
                <h5 className="mt-2 text-2xl font-semibold">Porque estás a denunciar esta conta?</h5>
                <p className="mt-7 mb-10 text-xl">
                  A tua denúncia é anónima e deves ter em conta que pode prejudicar outros caso não seja verdadeira. Se
                  este anúncio é impróprio ou não condiz com a realidade por favor reporta.{" "}
                </p>
                <div className="radio mb-4">
                  <label>
                    <input className="m-2" type="radio" name="optradio" checked />É impreciso ou incorreto
                  </label>
                </div>
                <div className="radio mb-4">
                  <label>
                    <input className="m-2" type="radio" name="optradio" checked />
                    Não corresponde à realidade
                  </label>
                </div>
                <div className="radio mb-4">
                  <label>
                    <input className="m-2" type="radio" name="optradio" checked />É um esquema
                  </label>
                </div>
                <div className="radio mb-4">
                  <label>
                    <input className="m-2" type="radio" name="optradio" checked />É ofensivo
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input className="m-2" type="radio" name="optradio" checked />É outra coisa
                  </label>
                </div>
                <div className="">
                  <label>
                    <input
                      id="input-modal"
                      className="m-4 border border-b-gray-400 p-2"
                      placeholder="Conta-nos mais sobre isso"
                    />
                  </label>
                </div>
                <div className="flex flex-1 justify-end">
                  <button
                    type="button"
                    className="rounded-lg bg-primary-500 py-2 px-9 text-base text-white"
                    onClick={nextStep}
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

function ModalDenunciaSegundoPasso({ nextStep }: PassosModaisProps) {
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
              onClick={nextStep}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalDenuncia;
