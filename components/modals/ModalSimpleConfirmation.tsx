import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { useModalSimpleConfirmation, useSetOpenModalSimpleConfirmation } from "../../context/ModalShowProvider";
import { useTranslation } from "next-i18next";
import { IoMdClose } from "react-icons/io";
import { trpc } from "../../utils/trpc";

/**
 * PAGINA 23 DO XD
 */

const ModalSimpleConfirmation = () => {
  const { t } = useTranslation();
  const { isOpen, type, user_id } = useModalSimpleConfirmation();
  const setIsOpen = useSetOpenModalSimpleConfirmation();
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const deleteUser = trpc.profile.deleteProfile.useMutation();

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (confirmation) {
      closeModal();
    }
  });

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
                <IoMdClose
                  className="absolute right-8 top-8 h-8 w-8 cursor-pointer max-sm:top-11"
                  onClick={() => closeModal()}
                />

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
                          <p className="mb-8 text-xl font-semibold">{type == "profile" ? "Eliminar perfil" : ""}</p>
                          <p className="mb-2 mt-8 text-xl font-semibold">{}</p>
                          {/* left */}
                          {/* começa novo */}
                          <div className="mb-5 flex justify-center">
                            <div className="">
                              <p className="form-label text-lg">
                                {type == "profile" ? "Tem a certeza que quer eliminar ester perfil" : ""}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <a
                              className="mx-10 mb-6 mt-10 rounded-md bg-red-500 px-6 py-3 text-white"
                              href="#"
                              role="button"
                              id="modal-btn"
                              onClick={async () => {
                                type == "profile" ? console.log( await deleteUser.mutateAsync(user_id)) : ""
                              }}
                            >
                               {type == "profile" ? "Eliminar" : ""}
                            </a>
                            <a
                              className="mx-10 mb-6 mt-10 rounded-md bg-green-300 px-6 py-3 text-white"
                              href="#"
                              role="button"
                              id="modal-btn"
                              onClick={() => {
                                closeModal()
                              }}
                            >
                              Cancelar
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

export default ModalSimpleConfirmation;
