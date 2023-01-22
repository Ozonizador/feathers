import React, { Fragment, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { VscArrowRight } from "react-icons/vsc";
import { useModalAlterarReserva, useSetOpenModalAlterarReserva } from "../../context/ModalShowProvider";
import FeatherDatePicker from "../utils/FeatherDatepicker";
import { Reservation, ReservationStatus, RESERVATION_TABLE } from "../../models/reservation";

/* PAGINA 23 DO XD 

*/

const ModalAlterarReserva = () => {
  const { isOpen, stay } = useModalAlterarReserva();
  const setIsOpen = useSetOpenModalAlterarReserva();

  const [newReservation, setNewReservation] = useState<Omit<Reservation, "created_at" | "updated_at">>({
    id: "",
    start_date: new Date().toDateString(),
    end_date: new Date().toDateString(),
    status: ReservationStatus.CHANGE_REQUESTED,
    advertisement_id: "",
    tenant_id: "",
  });

  const updateToOldReservation = useCallback(() => {
    if (stay) {
      const reservation = stay.reservation;
      if (reservation && reservation.id !== newReservation.id) {
        setNewReservation({
          ...newReservation,
          start_date: reservation?.start_date || new Date().toDateString(),
          end_date: reservation?.end_date || new Date().toDateString(),
          advertisement_id: reservation?.advertisement_id,
          tenant_id: reservation?.tenant_id,
          status: ReservationStatus.CHANGE_REQUESTED,
        });
      }
    }
  }, [newReservation, stay]);

  useEffect(() => {
    updateToOldReservation();
  }, [updateToOldReservation]);

  function closeModal() {
    setIsOpen(false);
  }

  const changeNewReservationProperty = (property: string, value: any) => {
    setNewReservation({ ...newReservation, [property]: value });
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
                  <span className="ml-3 text-3xl font-bold">Alterar reserva</span>
                </Dialog.Title>

                {/* <!-- Modal --> */}
                <div
                  className="modal modal-lg fade  -scrollable   "
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className=" ">
                    <div className="" id="model-radius">
                      <div className=" m-4 p-5">
                        <div className="jumbotron">
                          <p className="mb-8 text-xl font-semibold">
                            Diz ao teu senhorio porque queres alterar a tua reserva
                          </p>
                          <div className="mb-3 bg-slate-200">
                            <textarea
                              className="form-control w-full rounded-md border border-solid border-terciary-500 bg-white"
                              id="exampleFormControlTextarea1"
                              rows={3}
                            ></textarea>
                          </div>
                          <p className="mt-8 mb-2 text-xl font-semibold">Reserva Original</p>
                          {/* left */}
                          {/* começa novo */}
                          <div className="mb-5">
                            <div className="inline-block">
                              <label htmlFor="exampleInputEmail1" className="form-label  text-base">
                                Entrada
                              </label>
                              {stay && (
                                <div className="ml-3 inline-block">{new String(stay.reservation.start_date)}</div>
                              )}
                            </div>
                            <div>
                              <label htmlFor="exampleInputEmail1" className="form-label mb-2 text-base">
                                Saida
                              </label>
                              {stay && <div className="ml-3 inline-block">{new String(stay.reservation.end_date)}</div>}
                            </div>
                          </div>
                          {newReservation && (
                            <div className="flex items-center justify-between gap-7 align-middle">
                              <div>
                                <label htmlFor="exampleInputEmail1" className="form-label  text-base">
                                  Entrada
                                </label>
                                <FeatherDatePicker
                                  date={new Date(newReservation.start_date) || new Date()}
                                  onChange={(e) =>
                                    changeNewReservationProperty(RESERVATION_TABLE.START_DATE, e.target.value)
                                  }
                                />
                              </div>

                              <div>
                                <VscArrowRight className="mt-7 text-3xl" />
                              </div>

                              <div>
                                <label htmlFor="exampleInputEmail1" className="form-label mb-2 text-base">
                                  Saida
                                </label>

                                <FeatherDatePicker
                                  date={new Date(newReservation.end_date) || new Date()}
                                  onChange={(e) =>
                                    changeNewReservationProperty(RESERVATION_TABLE.END_DATE, e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          )}
                          <div className="input-group">
                            {/* fim novo */}

                            {/* HOSPEDES */}
                            <div className="mt-7 flex flex-row justify-between gap-4">
                              <div className="mb-3 mt-3 flex w-full flex-col">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                  Número de hóspedes
                                </label>
                                <select className="mt-2 w-full rounded-md border border-solid border-terciary-500 bg-white py-2 px-3">
                                  <option>1 hóspede</option>
                                </select>
                              </div>

                              {/* FIM */}
                              <div>
                                <VscArrowRight className="mt-12 text-3xl" />
                              </div>

                              <div className="mb-3  flex w-full flex-col">
                                <div className="mb-3 mt-3 flex w-full flex-col">
                                  <label htmlFor="exampleInputEmail1" className="form-label">
                                    Número de hóspedes
                                  </label>
                                  <select className="mt-2 w-full rounded-md border border-solid border-terciary-500 bg-white py-2 px-3">
                                    <option>1 hóspede</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            {/* HOSPEDES */}

                            <div className="mx-auto flex w-8/12 justify-between ">
                              <div className="text-center">
                                <h5 className="mb-3 font-bold">Pagamento Original</h5>
                                <p className="underline underline-offset-8">Detalhes</p>
                              </div>

                              <div className="text-center">
                                <h5 className="mb-3 font-bold">Novo Pagamento</h5>
                                <p className="underline underline-offset-8">Detalhes</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <a
                              className="mx-auto mt-10 mb-6 rounded-md bg-primary-300 py-3 px-6 text-white"
                              href="#"
                              role="button"
                              id="modal-btn"
                            >
                              Enviar pedido de alteração
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
