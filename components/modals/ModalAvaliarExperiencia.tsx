import React, { Fragment } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { useState } from "react";
import { Rating, Spinner } from "flowbite-react";
import { Review, REVIEW_COLUMNS } from "../../models/review";
import useReviewService from "../../hooks/reviewService";
import { useCurrentUser } from "../../context/MainProvider";
import {
  useModalAvaliarExperiencia,
  useSetModalAvaliarExperienciaContextProperty,
  useSetOpenModalAvaliarExperiencia,
} from "../../context/ModalShowProvider";
import { TYPE_ADVERTISEMENT } from "../../models/advertisement";
import { useTranslation } from "next-i18next";
/* PAGINA 24-26 DO XD 

para chamar na pagina => <ModalAvaliarExperiencia defaultOpen={false} /> 
false nao mostra nada true mostra.
*/

const startingReview = {
  overall_rating: 1,
  location_rating: 1,
  value_quality_rating: 1,
  landlord_rating: 1,
  comodities_rating: 1,
  public_review: "",
  private_review: "",
} as Omit<Review, "created_at" | "updated_at">;

const ModalAvaliarExperiencia = () => {
  const { t } = useTranslation();
  const { addReview } = useReviewService();
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, reservation, step } = useModalAvaliarExperiencia();
  const setModalProperty = useSetModalAvaliarExperienciaContextProperty();
  const setIsOpen = useSetOpenModalAvaliarExperiencia();
  const [review, setReview] = useState<Omit<Review, "created_at" | "updated_at">>(startingReview);

  function closeModal() {
    setIsOpen(false);
  }

  const nextStep = () => {
    setModalProperty("step", step + 1);
  };

  const saveReview = async () => {
    setLoading(true);
    if (!reservation) return;
    try {
      const { error } = await addReview(review, reservation.id);
      if (error) return;

      nextStep();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const setReviwByProperty = (property: string, value: any) => {
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
            <Dialog.Panel className="w-full transform overflow-hidden rounded-3xl bg-white text-left  align-middle shadow-xl transition-all lg:w-1/2">
              <Dialog.Title
                as="h3"
                className="flex items-center bg-primary-100 p-5 text-lg font-medium leading-6 text-gray-900"
              >
                <Image className="" src="/images/feeedback.png" alt="Avaliar experiência" width="32" height="32" />{" "}
                <span className="ml-3 text-3xl font-bold">{t("evaluate_experience")}</span>
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
                          <p className="text-semibold mb-11 mt-7 text-3xl">MUDAR AQUI Quarto Privado em T3 - Peniche</p>
                          <div className="flex flex-col gap-6">
                            <div className="flex w-full flex-row justify-between">
                              <div className="text-2xl text-secondary-300">{t("location")}</div>
                              <Rating>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LOCATION_RATING, 1)}>
                                  <Rating.Star filled={review.location_rating >= 1 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LOCATION_RATING, 2)}>
                                  <Rating.Star filled={review.location_rating >= 2 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LOCATION_RATING, 3)}>
                                  <Rating.Star filled={review.location_rating >= 3 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LOCATION_RATING, 4)}>
                                  <Rating.Star filled={review.location_rating >= 4 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LOCATION_RATING, 5)}>
                                  <Rating.Star filled={review.location_rating == 5 ? true : false} />
                                </div>
                              </Rating>
                            </div>

                            <div className="flex w-full flex-row justify-between">
                              <div className="text-2xl text-secondary-300">{t("quality_price")}</div>
                              <Rating>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.VALUE_QUALITY_RATING, 1)}>
                                  <Rating.Star filled={review.value_quality_rating >= 1 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.VALUE_QUALITY_RATING, 2)}>
                                  <Rating.Star filled={review.value_quality_rating >= 2 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.VALUE_QUALITY_RATING, 3)}>
                                  <Rating.Star filled={review.value_quality_rating >= 3 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.VALUE_QUALITY_RATING, 4)}>
                                  <Rating.Star filled={review.value_quality_rating >= 4 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.VALUE_QUALITY_RATING, 5)}>
                                  <Rating.Star filled={review.value_quality_rating == 5 ? true : false} />
                                </div>
                              </Rating>
                            </div>

                            <div className="flex w-full flex-row justify-between">
                              <div className="text-2xl text-secondary-300">{t("advertisements:amenities")}</div>
                              <Rating>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.COMODITIES_RATING, 1)}>
                                  <Rating.Star filled={review.comodities_rating >= 1 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.COMODITIES_RATING, 2)}>
                                  <Rating.Star filled={review.comodities_rating >= 2 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.COMODITIES_RATING, 3)}>
                                  <Rating.Star filled={review.comodities_rating >= 3 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.COMODITIES_RATING, 4)}>
                                  <Rating.Star filled={review.comodities_rating >= 4 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.COMODITIES_RATING, 5)}>
                                  <Rating.Star filled={review.comodities_rating == 5 ? true : false} />
                                </div>
                              </Rating>
                            </div>

                            <div className="flex w-full flex-row justify-between">
                              <div className="text-2xl text-secondary-300">{t("landlord", { count: 1 })}</div>
                              <Rating>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LANDLORD_RATING, 1)}>
                                  <Rating.Star filled={review.landlord_rating >= 1 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LANDLORD_RATING, 2)}>
                                  <Rating.Star filled={review.landlord_rating >= 2 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LANDLORD_RATING, 3)}>
                                  <Rating.Star filled={review.landlord_rating >= 3 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LANDLORD_RATING, 4)}>
                                  <Rating.Star filled={review.landlord_rating >= 4 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.LANDLORD_RATING, 5)}>
                                  <Rating.Star filled={review.landlord_rating == 5 ? true : false} />
                                </div>
                              </Rating>
                            </div>

                            <div className="flex w-full flex-row justify-between">
                              <div className="text-2xl text-secondary-300">{t("overall_rating")}</div>
                              <Rating>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.OVERALL_RATING, 1)}>
                                  <Rating.Star filled={review.overall_rating >= 1 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.OVERALL_RATING, 2)}>
                                  <Rating.Star filled={review.overall_rating >= 2 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.OVERALL_RATING, 3)}>
                                  <Rating.Star filled={review.overall_rating >= 3 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.OVERALL_RATING, 4)}>
                                  <Rating.Star filled={review.overall_rating >= 4 ? true : false} />
                                </div>
                                <div onClick={(e) => setReviwByProperty(REVIEW_COLUMNS.OVERALL_RATING, 5)}>
                                  <Rating.Star filled={review.overall_rating == 5 ? true : false} />
                                </div>
                              </Rating>
                            </div>
                          </div>

                          <p className="my-3 flex justify-end" onClick={() => nextStep()}>
                            <a
                              className="btn btn-primary btn-lg mt-10  rounded-md bg-primary-500 px-6 py-3 text-white"
                              role="button"
                              id="modal-btn"
                            >
                              {t("next_step")}
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
                        {reservation && (
                          <p className="text-semibold mb-11 mt-7 text-3xl">
                            {t(TYPE_ADVERTISEMENT[reservation.advertisement.type])} - {reservation.advertisement.place}
                          </p>
                        )}
                        <div className=" m-4 ">
                          <p className="mb-3 text-base">{t("give_public_feedback")}</p>
                          <div className="mb-3 bg-slate-200">
                            <textarea
                              className="form-control w-full rounded-md border border-terciary-500 bg-white"
                              id="exampleFormControlTextarea1"
                              rows={3}
                              value={review.public_review}
                              onChange={(e) => setReviwByProperty(REVIEW_COLUMNS.PUBLIC_REVIEW, e.target.value)}
                            ></textarea>
                          </div>
                          <div className="mb-3 mt-10">
                            <p className="mb-3 text-base">{t("give_private_feedback")}</p>
                            <div className="mb-3 bg-slate-200">
                              <textarea
                                className="form-control w-full rounded-md border border-solid border-terciary-500 bg-white"
                                id="exampleFormControlTextarea1"
                                rows={3}
                                value={review.private_review}
                                onChange={(e) => setReviwByProperty(REVIEW_COLUMNS.PRIVATE_REVIEW, e.target.value)}
                              ></textarea>
                            </div>
                          </div>

                          <div className="my-3 flex justify-end">
                            <button
                              type="button"
                              className="btn btn-primary btn-lg mt-10  rounded-md bg-primary-500 px-6 py-3 text-white"
                              onClick={saveReview}
                              disabled={loading}
                            >
                              {loading ? <Spinner /> : t("next_step")}
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
  const { t } = useTranslation();
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
            <p className="font-x1 mx-auto mb-10 mt-7 w-2/3 text-center">
              A tua opinião é uma mais valia para a comunidade unihosts, com certeza vai ajudar outros estudantes.
            </p>
          </div>

          <div className="px-8">
            <p className="lead mb-16 mt-7" onClick={() => closeModal()}>
              <a
                className="btn btn-primary btn-lg mt-10  rounded-md bg-primary-500 px-6 py-3 text-white"
                role="button"
                id="modal-btn"
              >
                {t("close")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAvaliarExperiencia;
