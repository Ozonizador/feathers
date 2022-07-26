import React, { Fragment } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { useState } from "react";
import { Rating } from "flowbite-react";
import { Review } from "../../models/review";
import { addReview } from "../../services/reviewService";
import { useUser } from "@supabase/auth-helpers-react";
import { useProfileInformation } from "../../context/MainProvider";
import { useModalAvaliarExperiencia, useSetModalAvaliarExperiencia } from "../../context/ModalShowProvider";
/* PAGINA 24-26 DO XD 

para chamar na pagina => <ModalAvaliarExperiencia defaultOpen={false} /> 
false nao mostra nada true mostra.
*/

const startingReview = {
  advertisementId: "",
  tenantId: "",
  overallRating: 0,
  locationRating: 0,
  valueQualityRating: 0,
  landLordRating: 0,
  comoditiesRating: 0,
  publicReview: "",
  privateReview: "",
} as Review;

const ModalAvaliarExperiencia = () => {
  const profile = useProfileInformation();
  const [step, setStep] = useState(1);
  const isOpen = useModalAvaliarExperiencia();
  const setIsOpen = useSetModalAvaliarExperiencia();
  const [review, setReview] = useState<Review>(startingReview);

  function closeModal() {
    setIsOpen(false);
  }

  const nextStep = () => {
    setStep((oldStep) => oldStep + 1);
  };

  const saveReview = async () => {
    const { data, error } = await addReview(review, profile.id);
    if (!error) {
      nextStep();
    }
  };

  return (
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
          <div className="flex min-h-full items-center justify-center p-14 text-center">
            {step === 1 && <ModalAvaliarExperienciaPrimeiroPasso nextStep={nextStep} />}
            {step === 2 && <ModalAvaliarExperienciaSegundoPasso nextStep={saveReview} />}
            {step === 3 && <ModalAvaliarExperienciaTerceiroPasso nextStep={nextStep} />}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

interface PassosModaisProps {
  nextStep: () => void;
}

const ModalAvaliarExperienciaTerceiroPasso = ({ nextStep }: PassosModaisProps) => {
  return (
    <Dialog.Panel className="h-96 w-1/2 transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all">
      <Dialog.Title
        as="h3"
        className="flex items-center bg-primary-100 p-5 text-lg font-medium leading-6 text-gray-900"
      >
        <Image className="" src="/images/feeedback.png" alt="Avaliar experiência" width="32px" height="32px" />{" "}
        <span className="ml-3 text-3xl font-bold">Avaliar experiência</span>
      </Dialog.Title>
      {/* <!-- Modal --> */}
      <div className="flex h-full flex-col items-center justify-center text-center align-middle">
        <div
          className="modal  fade  -centered"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div>
            <h1 className="text-2xl font-semibold">Obrigada pelo teu feedback!</h1>
            <p className="font-x1 mx-auto mt-7 mb-10 w-2/3 text-center">
              A tua opinião é uma mais valia para a comunidade unihosts, com certeza vai ajudar outros estudantes.
            </p>
          </div>

          <div className="px-8">
            <p className="lead mb-16 mt-7" onClick={() => nextStep()}>
              <a
                className="btn btn-primary btn-lg mt-10  rounded-md bg-primary-500 py-3 px-6 text-white"
                role="button"
                id="modal-btn"
              >
                Fechar
              </a>
            </p>
          </div>
        </div>
      </div>
    </Dialog.Panel>
  );
};

// ------------------------------------------------------------------------------------------------------------------------------------

const ModalAvaliarExperienciaSegundoPasso = ({ nextStep }: PassosModaisProps) => {
  return (
    <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all">
      <Dialog.Title
        as="h3"
        className="flex items-center bg-primary-100 p-5 text-lg font-medium leading-6 text-gray-900"
      >
        <Image className="" src="/images/feeedback.png" alt="Avaliar experiência" width="32px" height="32px" />{" "}
        <span className="ml-3 text-3xl font-bold">Avaliar experiência</span>
      </Dialog.Title>
      {/* <!-- Modal --> */}
      <div
        className="modal  fade  -centered"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="px-8">
          <div className="" id="model-radius">
            <p className="text-semibold mt-7 mb-11 text-3xl">Quarto Privado em T2 - Guarda</p>

            <div className=" m-4 ">
              <p className="mb-3 text-base">Deixa o teu feedback público</p>
              <div className="mb-3 bg-slate-200">
                <textarea
                  className="form-control w-full rounded-md border  border-terciary-500 bg-white"
                  id="exampleFormControlTextarea1"
                  rows={3}
                ></textarea>
              </div>
              <div className="mb-3 mt-10">
                <p className="mb-3 text-base">Deixa o teu feedback privado ao senhorio</p>
                <div className="mb-3 bg-slate-200">
                  <textarea
                    className="form-control w-full rounded-md border border-solid border-terciary-500 bg-white"
                    id="exampleFormControlTextarea1"
                    rows={3}
                  ></textarea>
                </div>
              </div>
              <p className="lead mb-16 mt-7" onClick={() => nextStep()}>
                <a
                  className="btn btn-primary btn-lg mt-10  rounded-md bg-primary-500 py-3 px-6 text-white"
                  role="button"
                  id="modal-btn"
                >
                  Seguinte
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Dialog.Panel>
  );
};

// ------------------------------------------------------------------------------------------------------------------------------------

const ModalAvaliarExperienciaPrimeiroPasso = ({ nextStep }: PassosModaisProps) => {
  const [locationRating, setLocationRating] = useState<number>(1);
  const [overallRating, setOverallRating] = useState<number>(1);
  const [hostRating, setHostRating] = useState<number>(1);
  const [comoditiesRating, setComoditiesRating] = useState<number>(1);
  const [qualityValueRating, setQualityValueRating] = useState<number>(1);

  return (
    <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-3xl bg-white  text-left align-middle shadow-xl transition-all">
      <Dialog.Title
        as="h3"
        className="flex items-center bg-primary-100 p-5 text-lg font-medium leading-6 text-gray-900"
      >
        <Image className="" src="/images/feeedback.png" alt="Avaliar experiência" width="32px" height="32px" />{" "}
        <span className="ml-3 text-3xl font-bold">Avaliar experiência</span>
      </Dialog.Title>
      <div
        className="modal fade -centered"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="px-4 ">
          <div className="" id="model-radius">
            <div className=" m-4 ">
              <p className="text-semibold mt-7 mb-11 text-3xl">Quarto Privado em T3 - Peniche</p>
              <div className="flex flex-col">
                <div className="mb-8 flex w-2/5 flex-row justify-between">
                  <div className="text-2xl text-secondary-300">Localização</div>
                  <Rating>
                    <Rating.Star filled={locationRating >= 1 ? true : false} />
                    <Rating.Star filled={locationRating >= 2 ? true : false} />
                    <Rating.Star filled={locationRating >= 3 ? true : false} />
                    <Rating.Star filled={locationRating >= 4 ? true : false} />
                    <Rating.Star filled={locationRating == 5 ? true : false} />
                  </Rating>
                </div>

                <div className="mb-8 flex w-2/5 flex-row justify-between">
                  <div className="text-2xl text-secondary-300">Qualidade - preço</div>
                  <Rating>
                    <Rating.Star filled={qualityValueRating >= 1 ? true : false} />
                    <Rating.Star filled={qualityValueRating >= 2 ? true : false} />
                    <Rating.Star filled={qualityValueRating >= 3 ? true : false} />
                    <Rating.Star filled={qualityValueRating >= 4 ? true : false} />
                    <Rating.Star filled={qualityValueRating == 5 ? true : false} />
                  </Rating>
                </div>

                <div className="mb-8 flex w-2/5 flex-row justify-between">
                  <div className="text-2xl text-secondary-300">Comodidades</div>
                  <Rating>
                    <Rating.Star filled={comoditiesRating >= 1 ? true : false} />
                    <Rating.Star filled={comoditiesRating >= 2 ? true : false} />
                    <Rating.Star filled={comoditiesRating >= 3 ? true : false} />
                    <Rating.Star filled={comoditiesRating >= 4 ? true : false} />
                    <Rating.Star filled={comoditiesRating == 5 ? true : false} />
                  </Rating>
                </div>

                <div className="mb-8 flex w-2/5 flex-row justify-between">
                  <div className="text-2xl text-secondary-300">Senhorio</div>
                  <Rating>
                    <Rating.Star filled={hostRating >= 1 ? true : false} />
                    <Rating.Star filled={hostRating >= 2 ? true : false} />
                    <Rating.Star filled={hostRating >= 3 ? true : false} />
                    <Rating.Star filled={hostRating >= 4 ? true : false} />
                    <Rating.Star filled={hostRating == 5 ? true : false} />
                  </Rating>
                </div>

                <div className="mb-8 flex w-2/5 flex-row justify-between">
                  <div className="text-2xl text-secondary-300">Avaliação Geral</div>
                  <Rating>
                    <Rating.Star filled={overallRating >= 1 ? true : false} />
                    <Rating.Star filled={overallRating >= 2 ? true : false} />
                    <Rating.Star filled={overallRating >= 3 ? true : false} />
                    <Rating.Star filled={overallRating >= 4 ? true : false} />
                    <Rating.Star filled={overallRating == 5 ? true : false} />
                  </Rating>
                </div>
              </div>

              <p className="lead mb-16 mt-7" onClick={() => nextStep()}>
                <a
                  className="btn btn-primary btn-lg mt-10  rounded-md bg-primary-500 py-3 px-6 text-white"
                  role="button"
                  id="modal-btn"
                >
                  Seguinte
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Dialog.Panel>
  );
};
export default ModalAvaliarExperiencia;
