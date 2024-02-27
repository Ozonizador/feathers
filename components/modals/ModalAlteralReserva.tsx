import React, { Fragment, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { VscArrowRight } from "react-icons/vsc";
import { useModalAlterarReserva, useSetOpenModalAlterarReserva } from "../../context/ModalShowProvider";
import FeatherDatePicker from "../utils/FeatherDatepicker";
import { Reservation, RESERVATION_TABLE } from "../../models/reservation";
import Input from "../utils/Input";
import { useTranslation } from "next-i18next";
import { addMonths, isSameDay } from "date-fns";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

/**
 * PAGINA 23 DO XD
 */

const ModalAlterarReserva = () => {
  const { t } = useTranslation();
  const { isOpen, reservation } = useModalAlterarReserva();
  const setIsOpen = useSetOpenModalAlterarReserva();
  const router = useRouter();

  const [newReservation, setNewReservation] = useState<
    Omit<
      Reservation,
      "id" | "created_at" | "updated_at" | "start_date" | "end_date" | "payment_status" | "previous_stay"
    >
  >({
    status: "CHANGE_REQUESTED",
    advertisement_id: (reservation && reservation.advertisement && reservation.advertisement_id) || "",
    tenant_id: (reservation && reservation.advertisement && reservation.tenant_id) || "",
    number_guests: (reservation && reservation.number_guests) || 1,
  });

  const [newReservationStartDate, setNewReservationStartDate] = useState<Date>(
    (reservation?.start_date && new Date(reservation?.start_date as string)) || new Date()
  );
  const [newReservationEndDate, setNewReservationEndDate] = useState<Date>(
    (reservation?.end_date && new Date(reservation?.end_date as string)) || new Date()
  );

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isSameDay(newReservationStartDate, new Date())) {
      if (reservation) {
        setNewReservationStartDate(new Date(reservation.start_date));
        setNewReservationEndDate(addMonths(newReservationStartDate, reservation.advertisement.minimum_stay));
      }
    }
  });

  const changeNewReservationProperty = (property: string, value: any) => {
    setNewReservation({ ...newReservation, [property]: value });
  };

  const handleSubmit = (() => {
    toast.success(t("messages:success:saved_success"))
    setTimeout(() => {
      closeModal();
      router.reload();
    }, 2000)
  })

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-900" onClose={closeModal}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all lg:w-1/2">
                <Dialog.Title
                  as="h3"
                  className="flex items-center bg-primary-100 p-5 text-lg font-medium leading-6 text-gray-900"
                >
                  <Image className="m-2" src="/images/doublearrow.png" alt="" width="40" height="40" />
                  <span className="ml-3 text-3xl font-bold">{t("change_reservation")}</span>
                  <IoMdClose
                    className=" absolute right-10 top-14 ml-2 h-8 w-8 cursor-pointer max-sm:top-11"
                    onClick={() => closeModal()}
                  />
                </Dialog.Title>

                {/* <!-- Modal --> */}
                <div
                  className="modal modal-lg fade -scrollable"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className=" ">
                    <div className="" id="model-radius">
                      <div className=" m-4 p-5">
                        <div className="jumbotron">
                          <p className="mb-8 text-xl font-semibold">{t("reason_change_reservation")}</p>
                          <div className="mb-3 bg-slate-200">
                            <textarea
                              className="form-control w-full rounded-md border border-solid bg-white focus:border-primary-500 focus:outline-none focus:ring-0"
                              id="exampleFormControlTextarea1"
                              rows={3}
                            ></textarea>
                          </div>
                          <p className="mb-2 mt-8 text-xl font-semibold">{t("advertisements:current_reservation")}</p>
                          {/* left */}
                          {/* começa novo */}
                          <div className="mb-5">
                            <div className="inline-block">
                              <label htmlFor="exampleInputEmail1" className="form-label  text-base">
                                {t("start")}
                              </label>
                              {reservation && (
                                <div className="ml-3 inline-block">{new String(reservation?.start_date || "")}</div>
                              )}
                            </div>
                            <div>
                              <label htmlFor="exampleInputEmail1" className="form-label mb-2 text-base">
                                {t("end")}
                              </label>
                              {reservation && (
                                <div className="ml-3 inline-block">{new String(reservation?.end_date || "")}</div>
                              )}
                            </div>
                          </div>
                          {newReservation && (
                            <div className="flex items-center justify-center gap-7 align-middle">
                              <div>
                                <label htmlFor="exampleInputEmail1" className="form-label  text-base">
                                  {t("start")}
                                </label>
                                <div className="rounded-[14px] border-2 border-terciary-700">
                                  <FeatherDatePicker
                                    date={newReservationStartDate}
                                    onChange={(e) => setNewReservationStartDate(e)}
                                    minDate={new Date()}
                                  />
                                </div>
                              </div>

                              <div>
                                <VscArrowRight className="mt-7 text-3xl" />
                              </div>

                              <div>
                                <label htmlFor="exampleInputEmail1" className="form-label mb-2 text-base">
                                  {t("end")}
                                </label>

                                <div className="rounded-[14px] border-2 border-terciary-700">
                                  <FeatherDatePicker
                                    date={newReservationEndDate}
                                    onChange={(e) => setNewReservationEndDate(e)}
                                    minDate={addMonths(
                                      newReservationStartDate,
                                      reservation?.advertisement?.minimum_stay as number
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="input-group">
                            {/* fim novo */}

                            {/* HOSPEDES */}
                            <div className="mt-7 flex flex-row justify-between gap-4">
                              <div className="mb-3 mt-3 flex w-full flex-col">
                                <Input
                                  name="current_guests"
                                  labelText={t("advertisements:guest_number")}
                                  pattern="[0-9]+"
                                  value={(reservation && reservation.number_guests) || 1}
                                  type="number"
                                  disabled
                                />
                              </div>

                              {/* FIM */}
                              <div>
                                <VscArrowRight className="mt-12 text-3xl" />
                              </div>

                              <div className="mb-3  flex w-full flex-col">
                                <div className="mb-3 mt-3 flex w-full flex-col">
                                  <Input
                                    name="current_guests"
                                    labelText={t("advertisements:guest_number")}
                                    pattern="[0-9]+"
                                    value={newReservation.number_guests}
                                    onChange={(e) =>
                                      changeNewReservationProperty(RESERVATION_TABLE.NUMBER_GUESTS, e.target.value)
                                    }
                                    min={1}
                                    max={reservation?.advertisement.tenant_number}
                                    type="number"
                                  />
                                </div>
                              </div>
                            </div>
                            {/* HOSPEDES */}
                            {/*
                            <div className="mx-auto flex w-8/12 justify-between ">
                              <div className="text-center">
                                <h5 className="mb-3 font-bold">{t("original_payment")})</h5>
                                <p className="underline underline-offset-8">{t("details")}</p>
                              </div>

                              <div className="text-center">
                                <h5 className="mb-3 font-bold">{t("new_payment")}</h5>
                                <p className="underline underline-offset-8">{t("details")}</p>
                              </div>
                            </div>
                            */}
                          </div>
                          <div className="flex justify-center">
                            <a
                              className="mx-auto mb-6 mt-10 rounded-md bg-primary-300 px-6 py-3 text-white"
                              onClick={handleSubmit}
                              role="button"
                              id="modal-btn"
                            >
                              {t("send_change_request")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalAlterarReserva;
