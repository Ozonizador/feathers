import React, { Fragment, ReactNode } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useModalDetalhesPagamento, useSetModalDetalhesPagamento } from "../../context/ModalShowProvider";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useGetSingleAdvertisement } from "../../context/ShowingSingleAdvertisementProvider";

/* PAGINA 7 DO XD */

const ModalDetalhesPagamento = () => {
  const advertisement = useGetSingleAdvertisement();
  let { detailsModalOpen, selectedDate } = useModalDetalhesPagamento();
  let setIsOpen = useSetModalDetalhesPagamento();

  const formatOnlyMonth = (date: Date) => {
    if (!date) return "";

    const newDate = new Date(date);
    return newDate.toLocaleString("PT", {
      month: "long",
    });
  };

  return (
    <>
      <Transition appear show={detailsModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-900" onClose={() => setIsOpen(false)}>
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
                    className="mb-16 mt-6 text-center text-3xl font-bold leading-6 text-gray-900 lg:text-5xl"
                  >
                    Detalhes do Pagamento
                  </Dialog.Title>

                  <div className="mt-2">
                    <div className="px-8">
                      <div className="my-6 text-xl font-bold text-primary-500 lg:text-2xl">Via Unihosts</div>
                      {/* Unihosts */}
                      <FeathersAccordion>
                        <div className="flex">
                          <div className="font-bold">Primeira Renda</div>
                          <div className="ml-auto flex">
                            <div className="font-bold">{advertisement.month_rent}€</div>
                            <MdOutlineKeyboardArrowUp className="my-auto text-primary-500" size={24} />
                          </div>
                        </div>
                        <div className="flex gap-1 text-neutral-600">
                          <p className="text-sm lg:text-base">
                            Pagamento antecipado respetivo ao mês de{" "}
                            <span className="capitalize">{formatOnlyMonth(selectedDate)}</span>
                          </p>
                          <AiOutlineInfoCircle className="my-auto" />
                        </div>
                      </FeathersAccordion>
                      {/* SENHORIO */}
                      <div className="my-6 text-xl font-bold text-primary-500 lg:text-2xl">Ao Senhorio</div>
                      <FeathersAccordion>
                        <div className="flex">
                          <h6 className="font-bold">No dia do Check-in</h6>
                          <div className="ml-auto flex">
                            <div className="font-bold">{advertisement.month_rent}€</div>
                            <MdOutlineKeyboardArrowUp className="my-auto text-primary-500" size={24} />
                          </div>
                        </div>
                        <div className="flex">
                          <div className="flex gap-1 text-neutral-500">
                            <p className="text-sm lg:text-base">Caução</p>
                            <AiOutlineInfoCircle className="my-auto" size={18} />
                          </div>
                          <div className="ml-auto mr-6 text-neutral-500">{advertisement.month_rent}€</div>
                        </div>
                      </FeathersAccordion>
                      {/* Mensalidade */}
                      <FeathersAccordion>
                        <div className="flex">
                          <h6>Mensalidade a pagar</h6>
                          <div className="ml-auto">
                            <MdOutlineKeyboardArrowUp className="my-auto text-primary-500" size={24} />
                          </div>
                        </div>
                        <div className="mt-1 flex flex-col gap-2">
                          {[1, 2, 3, 4].map((value, index) => {
                            return (
                              <div className="flex text-neutral-500" key={index}>
                                <div>
                                  Renda Mensal de{" "}
                                  <span className="capitalize">
                                    {formatOnlyMonth(new Date(selectedDate.setMonth(selectedDate.getMonth() + value)))}
                                  </span>
                                </div>
                                <div className="ml-auto mr-6">{advertisement.month_rent}€</div>
                              </div>
                            );
                          })}
                        </div>
                      </FeathersAccordion>
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

interface FeathersAccordionProps {
  children: ReactNode;
}

const FeathersAccordion = ({ children }: FeathersAccordionProps) => {
  return <div className="my-5 w-full rounded-xl border border-primary-500 p-5">{children}</div>;
};
