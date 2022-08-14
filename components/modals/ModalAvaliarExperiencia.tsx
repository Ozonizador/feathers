import React, { Fragment } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { useState } from "react";
import { Rating, Spinner } from "flowbite-react";
import { Review, REVIEW_COLUMNS } from "../../models/review";
import { addReview } from "../../services/reviewService";
import { useProfileInformation } from "../../context/MainProvider";
import {
  useModalAvaliarExperiencia,
  useSetModalAvaliarExperienciaContextProperty,
  useSetOpenModalAvaliarExperiencia,
} from "../../context/ModalShowProvider";
import { TYPE_ADVERTISEMENT } from "../../models/advertisement";
/* PAGINA 24-26 DO XD 

para chamar na pagina => <ModalAvaliarExperiencia defaultOpen={false} /> 
false nao mostra nada true mostra.
*/

const startingReview = {
  advertisementId: "",
  tenantId: "",
  overallRating: 1,
  locationRating: 1,
  valueQualityRating: 1,
  landLordRating: 1,
  comoditiesRating: 1,
  publicReview: "",
  privateReview: "",
} as Review;

const ModalAvaliarExperiencia = () => {
  const profile = useProfileInformation();
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, stay, step } = useModalAvaliarExperiencia();
  const setModalProperty = useSetModalAvaliarExperienciaContextProperty();
  const setIsOpen = useSetOpenModalAvaliarExperiencia();
  const [review, setReview] = useState<Review>(startingReview);

  function closeModal() {
    setIsOpen(false);
  }

  const nextStep = () => {
    setModalProperty("step", step + 1);
  };

  const saveReview = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data, error } = await addReview(review, profile.id, stay.advertisement.id);
    if (!error) {
      nextStep();
    }
    setLoading(false);
  };

  const setReviwByProperty = (property, value) => {
    setReview({ ...review, [property]: value });
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
            <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-3xl bg-white  text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="flex items-center bg-primary-100 p-5 text-lg font-medium leading-6 text-gray-900"
              >
                <Image className="" src="/images/feeedback.png" alt="Avaliar experiência" width="32px" height="32px" />{" "}
                <span className="ml-3 text-3xl font-bold">Avaliar experiência</span>
              </Dialog.Title>
              {step === 1 && (
                <>
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
                            <div className="mb-8 flex w-full flex-row justify-between">
                              <div className="text-2xl text-secondary-300">Localização</div>
                              <Rating>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LOCATION_RATING, 1)}>
                                  <Rating.Star filled={review.locationRating >= 1 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LOCATION_RATING, 2)}>
                                  <Rating.Star filled={review.locationRating >= 2 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LOCATION_RATING, 3)}>
                                  <Rating.Star filled={review.locationRating >= 3 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LOCATION_RATING, 4)}>
                                  <Rating.Star filled={review.locationRating >= 4 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LOCATION_RATING, 5)}>
                                  <Rating.Star filled={review.locationRating == 5 ? true : false} />
                                </div>
                              </Rating>
                            </div>

                            <div className="mb-8 flex w-full flex-row justify-between">
                              <div className="w-1/2 text-2xl text-secondary-300">Qualidade - preço</div>
                              <Rating className="w-1/2">
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.VALUE_QUALITY_RATING, 1)}>
                                  <Rating.Star filled={review.valueQualityRating >= 1 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.VALUE_QUALITY_RATING, 2)}>
                                  <Rating.Star filled={review.valueQualityRating >= 2 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.VALUE_QUALITY_RATING, 3)}>
                                  <Rating.Star filled={review.valueQualityRating >= 3 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.VALUE_QUALITY_RATING, 4)}>
                                  <Rating.Star filled={review.valueQualityRating >= 4 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.VALUE_QUALITY_RATING, 5)}>
                                  <Rating.Star filled={review.valueQualityRating == 5 ? true : false} />
                                </div>
                              </Rating>
                            </div>

                            <div className="mb-8 flex w-full flex-row justify-between">
                              <div className="text-2xl text-secondary-300">Comodidades</div>
                              <Rating>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.COMODITIES_RATING, 1)}>
                                  <Rating.Star filled={review.comoditiesRating >= 1 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.COMODITIES_RATING, 2)}>
                                  <Rating.Star filled={review.comoditiesRating >= 2 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.COMODITIES_RATING, 3)}>
                                  <Rating.Star filled={review.comoditiesRating >= 3 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.COMODITIES_RATING, 4)}>
                                  <Rating.Star filled={review.comoditiesRating >= 4 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.COMODITIES_RATING, 5)}>
                                  <Rating.Star filled={review.comoditiesRating == 5 ? true : false} />
                                </div>
                              </Rating>
                            </div>

                            <div className="mb-8 flex w-full flex-row justify-between">
                              <div className="text-2xl text-secondary-300">Senhorio</div>
                              <Rating>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LANDLORD_RATING, 1)}>
                                  <Rating.Star filled={review.landLordRating >= 1 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LANDLORD_RATING, 2)}>
                                  <Rating.Star filled={review.landLordRating >= 2 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LANDLORD_RATING, 3)}>
                                  <Rating.Star filled={review.landLordRating >= 3 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LANDLORD_RATING, 4)}>
                                  <Rating.Star filled={review.landLordRating >= 4 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LANDLORD_RATING, 5)}>
                                  <Rating.Star filled={review.landLordRating == 5 ? true : false} />
                                </div>
                              </Rating>
                            </div>

                            <div className="mb-8 flex w-full flex-row justify-between">
                              <div className="text-2xl text-secondary-300">Avaliação Geral</div>
                              <Rating>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.OVERALL_RATING, 1)}>
                                  <Rating.Star filled={review.overallRating >= 1 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.OVERALL_RATING, 2)}>
                                  <Rating.Star filled={review.overallRating >= 2 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.OVERALL_RATING, 3)}>
                                  <Rating.Star filled={review.overallRating >= 3 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.OVERALL_RATING, 4)}>
                                  <Rating.Star filled={review.overallRating >= 4 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.OVERALL_RATING, 5)}>
                                  <Rating.Star filled={review.overallRating == 5 ? true : false} />
                                </div>
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
                </>
              )}
              {step === 2 && (
                <>
                  <div
                    className="modal fade -centered"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="px-8">
                      <div className="" id="model-radius">
                        {stay && (
                          <p className="text-semibold mt-7 mb-11 text-3xl">
                            {TYPE_ADVERTISEMENT[stay.advertisement.type]} - {stay.advertisement.place}
                          </p>
                        )}
                        <div className=" m-4 ">
                          <p className="mb-3 text-base">Deixa o teu feedback público</p>
                          <div className="mb-3 bg-slate-200">
                            <textarea
                              className="form-control w-full rounded-md border border-terciary-500 bg-white"
                              id="exampleFormControlTextarea1"
                              rows={3}
                              value={review.publicReview}
                              onChange={(e) => setReviwByProperty(REVIEW_COLUMNS.PUBLIC_REVIEW, e.target.value)}
                            ></textarea>
                          </div>
                          <div className="mb-3 mt-10">
                            <p className="mb-3 text-base">Deixa o teu feedback privado ao senhorio</p>
                            <div className="mb-3 bg-slate-200">
                              <textarea
                                className="form-control w-full rounded-md border border-solid border-terciary-500 bg-white"
                                id="exampleFormControlTextarea1"
                                rows={3}
                                value={review.privateReview}
                                onChange={(e) => setReviwByProperty(REVIEW_COLUMNS.PRIVATE_REVIEW, e.target.value)}
                              ></textarea>
                            </div>
                          </div>

                          <div className="lead mb-16 mt-7" onClick={() => saveReview}>
                            <button
                              type="button"
                              className="btn btn-primary btn-lg mt-10  rounded-md bg-primary-500 py-3 px-6 text-white"
                              onClick={(e) => saveReview(e)}
                              disabled={loading}
                            >
                              {loading ? <Spinner /> : "Seguinte"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {step === 3 && <ModalAvaliarExperienciaTerceiroPasso />}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const ModalAvaliarExperienciaTerceiroPasso = () => {
  const setIsOpen = useSetOpenModalAvaliarExperiencia();
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* <!-- Modal --> */}
      <div className="flex h-full flex-col items-center justify-center text-center align-middle">
        <div
          className="modal fade -centered"
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
            <p className="lead mb-16 mt-7" onClick={() => closeModal()}>
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
    </>
  );
};

export default ModalAvaliarExperiencia;
