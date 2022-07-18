import React, { Fragment } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { useState } from "react";

/* PAGINA 23 DO XD 

para chamar na pagina => <ModalAlterarReserva defaultOpen={false} /> 
false nao mostra nada true mostra.
*/
interface ModalAlterarReservaProps {
  defaultOpen: boolean;
}

const ModalAlterarReserva = ({ defaultOpen }: ModalAlterarReservaProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  function closeModal() {
    setIsOpen(false);
  }

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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-t-3xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex bg-primary-300 p-5 text-lg font-medium leading-6 text-gray-900"
                >
                  <Image
                    id="modal-img"
                    className="m-2"
                    src="/images/doublearrow.png"
                    alt=""
                    width="10%"
                    height="10%"
                  />
                  <span>Alterar reserva</span>
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
                      <div id="" className="modal-header ">
                        <Image
                          id="modal-img"
                          className="m-2"
                          src="/images/doublearrow.png"
                          alt=""
                          width="10%"
                          height="10%"
                        />
                        <div id="model-heading" className="p-2">
                          Alterar reserva
                        </div>
                      </div>
                      <div className=" m-4 ">
                        <div className="jumbotron">
                          <p>Diz ao teu senhorio porque queres alterar a tua reserva</p>
                          <div className="mb-3">
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows={1}
                            ></textarea>
                          </div>
                          <p>Reserva Original</p>
                          <div className="row mb-4">
                            {/* left */}
                            <div className="col">
                              {" "}
                              <div className="input-group">
                                <div>
                                  <label htmlFor="exampleInputEmail1" className="form-label">
                                    Entrada
                                  </label>
                                  <input
                                    type="date"
                                    aria-label="First name"
                                    className="form-control m-1"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="exampleInputEmail1" className="form-label">
                                    Entrada
                                  </label>
                                  <input
                                    type="date"
                                    aria-label="Last name"
                                    className="form-control m-1"
                                  />
                                </div>

                                <div className="mb-3 mt-3">
                                  <label htmlFor="exampleInputEmail1" className="form-label">
                                    Número de hóspedes
                                  </label>
                                  <input
                                    placeholder="1 hóspede"
                                    type="text"
                                    className="form-control"
                                    id="exampleInputText"
                                  />
                                </div>
                                <div className="text-center">
                                  <h5>Pagamento Original</h5>
                                  <a href="" id="link-modal">
                                    Detalhes
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="input-group">
                                <div>
                                  <label htmlFor="exampleInputEmail1" className="form-label">
                                    Entrada
                                  </label>
                                  <input
                                    type="date"
                                    aria-label="First name"
                                    className="form-control m-1"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="exampleInputEmail1" className="form-label">
                                    Entrada
                                  </label>
                                  <input
                                    type="date"
                                    aria-label="Last name"
                                    className="form-control m-1"
                                  />
                                </div>

                                <div className="mb-3 mt-3">
                                  <label htmlFor="exampleInputEmail1" className="form-label">
                                    Número de hóspedes
                                  </label>
                                  <input
                                    placeholder="1 hóspede"
                                    type="text"
                                    className="form-control"
                                    id="exampleInputText"
                                  />
                                </div>
                                <div className="text-center">
                                  <h5>Pagamento Original</h5>
                                  <a href="" id="link-modal">
                                    Detalhes
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="row">
                            <a
                              className="btn btn-primary btn-block "
                              href="#"
                              role="button"
                              id="modal-btn"
                            >
                              Enviar pedido de alteração
                            </a>
                          </p>
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
