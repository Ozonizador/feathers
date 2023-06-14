import React, { Fragment } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import {
  useModaisAnuncioDetalhes,
  useModalGerarReferencia,
  useSetModalGerarReferencia,
} from "../../context/ModalShowProvider";

const ModalGerarReferencia = () => {
  const { generateReferenceModalOpen } = useModaisAnuncioDetalhes();
  const reservation = useModalGerarReferencia();
  const setModalProperty = useSetModalGerarReferencia();

  function closeModal() {
    setModalProperty(false);
  }

  const generateReference = () => {
    if (!reservation) return;
  };

  return (
    <Transition appear show={generateReferenceModalOpen} as={Fragment}>
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
                  <span>Gerar referencia</span>
                </Dialog.Title>

                {/* <!-- Modal --> */}
                <div
                  className="modal fade -centered"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="flex justify-center gap-5 py-10">
                    <div className="my-auto">
                      <Image src="/icons/multibanco.svg" alt="multibanco" width={54} height={42}></Image>
                    </div>
                    <div>
                      <Image src="/icons/mbway.svg" alt="mbway" width={114} height={64}></Image>
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

export default ModalGerarReferencia;
