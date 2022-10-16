import React, { Fragment } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { useState } from "react";

/* Pagina 34 XD
  para chamar na pagina => <ModalPagamento defaultOpen={false} /> 
  false nao mostra nada true mostra.
*/

interface ModalPagamentoProps {
  defaultOpen: boolean;
}

const ModalPagamento = ({ defaultOpen }: ModalPagamentoProps) => {
  let [isOpen, setIsOpen] = useState(defaultOpen);

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
                <Dialog.Title as="h3" className="flex bg-primary-300 p-5 text-lg font-medium leading-6 text-gray-900">
                  <Image className="m-2" src="/images/keyboard.png" height={32} width={32} alt="" />
                  <span>Adicionar detalhes do cartão</span>
                </Dialog.Title>

                {/* <!-- Modal --> */}
                <div
                  className="modal  fade  -centered"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className=" ">
                    <div className="" id="model-radius">
                      <div id="" className="modal-header ">
                        <Image className="m-2" src="/images/keyboard.png" height={32} width={32} alt="" />
                        <div id="" className="p-2">
                          <p id="model-heading-text">Adicionar detalhes do cartão</p>
                        </div>
                      </div>
                      <div className=" m-4 ">
                        <div className="container">
                          <div className="row">
                            <form className="row g-3">
                              <div className="col-12">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputAddress"
                                  placeholder="Número do cartão"
                                />
                              </div>
                              <div className="col-md-6">
                                <input type="email" className="form-control" id="inputEmail4" placeholder="Validade" />
                              </div>
                              <div className="col-md-6">
                                <input type="password" className="form-control" id="inputPassword4" placeholder="CVV" />
                              </div>
                              <div className="col-12">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputAddress2"
                                  placeholder="Código postal"
                                />
                              </div>

                              <div className="col">
                                <label htmlFor="inputState" className="form-label">
                                  País / regiáo
                                </label>
                                <select id="inputState" className="form-select">
                                  <option selected>Portugal</option>
                                  <option>...</option>
                                </select>
                              </div>
                              <div className="col-12">
                                <div className="row">
                                  <div className="col-6">
                                    <button
                                      style={{ float: "right" }}
                                      type="submit"
                                      className="btn btn-secondary  btn-block"
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                  <div className="col-6">
                                    <button
                                      style={{ float: "left" }}
                                      type="submit"
                                      className="bg-primary-500 text-white "
                                    >
                                      Concluido
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
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

export default ModalPagamento;
