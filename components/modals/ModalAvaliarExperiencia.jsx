import React, { Fragment } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { useState } from "react";

export default function ModalAvaliarExperiencia() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
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
                    className="m-2"
                    src="/images/comments.png"
                    alt=""
                    width="10%"
                    height="10%"
                  />{" "}
                  Avaliar Experiencia
                </Dialog.Title>
                <div
                  className="modal  fade  -centered"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className=" ">
                    <div className="" id="model-radius">
                      <div className=" m-4 ">
                        <div className="jumbotron">
                          <p>Quarto Privado em T3 - Peniche</p>
                          <div id="rating-flex">
                            <div id="stars-text">Localização</div>
                            <div id="stars">
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                            </div>
                          </div>

                          <div id="rating-flex" className="mb-2 mt-2">
                            <div id="stars-text">Qualidade - preço</div>
                            <div id="stars">
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                            </div>
                          </div>

                          <div id="rating-flex" className="mb-2 mt-2">
                            <div id="stars-text">Comodidades</div>
                            <div id="stars">
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                            </div>
                          </div>

                          <div id="rating-flex" className="mb-2 mt-2">
                            <div id="stars-text">Senhorio</div>
                            <div id="stars">
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                            </div>
                          </div>

                          <div id="rating-flex" className="mb-4 mt-2">
                            <div id="stars-text">Avaliação Geral</div>
                            <div id="stars">
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1 "></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                              <span className="fa fa-star m-1"></span>
                            </div>
                          </div>
                          <p className="lead">
                            <a
                              className="btn btn-primary btn-lg mt-2 "
                              href="#"
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
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function ModalAvaliarExperienciaTerceiroPasso() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
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
                    className="m-2"
                    src="/images/feeedback.png"
                    alt=""
                    width="30px"
                    height="30px"
                  />{" "}
                  Avaliar experiência
                </Dialog.Title>
                <div
                  className="modal  fade  -centered"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className=" ">
                    <div className="" id="model-radius">
                      <div id="" className="modal-header "></div>
                      <div className=" m-4 p-4">
                        <div className="jumbotron m-4 p-4 text-center">
                          <h5>Obrigada pelo teu feedback!</h5>
                          <p>
                            A tua opinião é uma mais valia para a comunidade unihosts, com certeza
                            vai ajudar outros estudantes.
                          </p>
                          <p className="lead">
                            <a
                              className="btn btn-primary btn-lg"
                              href="#"
                              role="button"
                              id="modal-btn"
                            >
                              Fechar
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
}

function ModalAvaliarExperienciaSegundoPasso() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
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
                  <Image className="m-2" src="/images/flag.png" alt="" width="30px" height="30px" />
                  <span className="my-auto ml-5">Reportar anúncio</span>
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
                        <Image
                          className="m-2"
                          src="/images/comments.png"
                          alt=""
                          width="30px"
                          height="30px"
                        />
                        <div id="model-heading" className="p-2">
                          Avaliar experiência
                        </div>
                      </div>
                      <div className=" m-4 ">
                        <div className="jumbotron">
                          <h5>A UniHosts agradece!</h5>
                          <div className="mb-3">
                            <label
                              id="modal-label"
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label"
                            >
                              Deixa o teu feedback público
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows={3}
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label
                              id="modal-label"
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label"
                            >
                              Deixa o teu feedback privado ao senhorio
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows={3}
                            ></textarea>
                          </div>
                          <p className="lead">
                            <a
                              className="btn btn-primary btn-lg "
                              href="#"
                              role="button"
                              id="modal-btn"
                            >
                              Enviar
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
}
