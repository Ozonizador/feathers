import React, { Fragment } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { useState } from "react";
import { Accordion } from "flowbite-react";
import {
  useModalDetalhesPagamento,
  useSetModalDetalhesPagamentoOpen,
} from "../../context/ModalShowProvider";

/* PAGINA 7 DO XD 

para chamar na pagina => <ModalDetalhesPagamento defaultOpen={false} /> 
false nao mostra nada true mostra.
*/

const ModalDetalhesPagamento = () => {
  let isOpen = useModalDetalhesPagamento();
  let setIsOpen = useSetModalDetalhesPagamentoOpen();

  function closeModal() {
    setIsOpen(false);
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-16 mt-6 text-center text-5xl font-bold leading-6 text-gray-900"
                  >
                    Detalhes do Pagamento
                  </Dialog.Title>

                  <div className="mt-2">
                    <div className="px-8">
                      <div className="text-3xl font-bold text-primary-500">Via Unihosts</div>
                      <Accordion>
                        <Accordion.Panel className="modal-w">
                          <Accordion.Title className="modal-w">
                            <div className="modal-w flex flex-row  justify-between bg-slate-800">
                              <div>Primeira Renda</div>
                              <div>300</div>
                            </div>
                          </Accordion.Title>
                          <Accordion.Content>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                              Pagamento antecipado respetivo ao mês de Fevereiro
                            </p>
                          </Accordion.Content>
                        </Accordion.Panel>
                      </Accordion>
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
};

export default ModalDetalhesPagamento;
