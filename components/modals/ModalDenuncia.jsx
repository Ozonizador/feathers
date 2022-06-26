import React, { Fragment, useState } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";

/** Missing styles  */
export default function ModalDenuncia() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
                      className="m-2"
                      src="/images/flag.png"
                      alt=""
                      width="30px"
                      height="30px"
                    />
                    <span className="my-auto ml-5">Reportar anúncio</span>
                  </Dialog.Title>
                  <div className="container p-6">
                    <div>
                      <div tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className=" ">
                          <div className="" id="model-radius">
                            <div className="m-2">
                              <h5 className="mt-2">Porque estás a denunciar esta conta?</h5>
                              <p className="mt-4">
                                A tua denúncia é anónima e deves ter em conta que pode prejudicar
                                outros caso não seja verdadeira. Se este anúncio é impróprio ou não
                                condiz com a realidade por favor reporta.{" "}
                              </p>
                              <div className="radio mt-3">
                                <label>
                                  <input className="m-2" type="radio" name="optradio" checked />É
                                  impreciso ou incorreto
                                </label>
                              </div>
                              <div className="radio">
                                <label>
                                  <input className="m-2" type="radio" name="optradio" checked />
                                  Não corresponde à realidade
                                </label>
                              </div>
                              <div className="radio">
                                <label>
                                  <input className="m-2" type="radio" name="optradio" checked />É um
                                  esquema
                                </label>
                              </div>
                              <div className="radio">
                                <label>
                                  <input className="m-2" type="radio" name="optradio" checked />É
                                  ofensivo
                                </label>
                              </div>
                              <div className="radio">
                                <label>
                                  <input className="m-2" type="radio" name="optradio" checked />É
                                  outra coisa
                                </label>
                              </div>
                              <div className="">
                                <label>
                                  <input
                                    id="input-modal"
                                    className="m-4"
                                    placeholder="Conta-nos mais sobre isso"
                                  />
                                </label>
                              </div>
                              <div className="flex flex-1 justify-end">
                                <button
                                  type="button"
                                  className="rounded-lg bg-primary-500 p-2 text-white"
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

/* Juntar este modal e acabar css */
function ModalDenunciaSegundoPasso() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
                      className="m-2"
                      src="/images/flag.png"
                      alt=""
                      width="30px"
                      height="30px"
                    />
                    <span className="my-auto ml-5">Reportar anúncio</span>
                  </Dialog.Title>
                  <div>
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <h1>Modal</h1>
                          {/* <!-- Button trigger modal --> */}
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Launch demo modal
                          </button>

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
                                  <Image
                                    className="m-2"
                                    src="/images/flag.png"
                                    alt=""
                                    width="30px"
                                    height="30px"
                                  />
                                  <div id="model-heading" className="p-2">
                                    Reportar anúncio
                                  </div>
                                </div>
                                <div className=" m-4 p-4">
                                  <div className="jumbotron m-4 p-4 text-center">
                                    <h5>A UniHosts agradece!</h5>
                                    <p>
                                      Vamos averiguar a situação. Obrigada por teres denunciado e
                                      tornado a nosssa comunidade unihosts num lugar melhor!
                                    </p>
                                    <p className="lead">
                                      <a
                                        className="btn btn-primary btn-lg"
                                        href="#"
                                        role="button"
                                        id="modal-btn"
                                      >
                                        Learn more
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
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
    </>
  );
}
