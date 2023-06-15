import React, { Fragment, useState } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import {
  useModaisAnuncioDetalhes,
  useModalGerarReferencia,
  useSetModalGerarReferencia,
} from "../../context/ModalShowProvider";
import classNames from "classnames";
import Button from "../utils/Button";
import { trpc } from "../../utils/trpc";
import { useUser } from "@supabase/auth-helpers-react";
import FeathersSpinner from "../utils/Spinner";

const ModalGerarReferencia = () => {
  const user = useUser();
  const [loadingReference, setLoadingReference] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<"multibanco" | "mbway">("multibanco");
  const { generateReferenceModalOpen } = useModaisAnuncioDetalhes();
  const { reservation, value } = useModalGerarReferencia();
  const setModalProperty = useSetModalGerarReferencia();

  // trpc methods

  const addMultibancoReference = trpc.payments.addMultibancoPayment.useMutation();
  const addMbWayReference = trpc.payments.addMbWayPayment.useMutation();

  function closeModal() {
    setModalProperty(false);
  }

  const generateReference = async () => {
    if (!reservation || !user || !value) return;

    setLoadingReference(true);
    if (selectedPayment === "mbway") {
      await addMbWayReference.mutateAsync(
        {
          reservationId: reservation.id,
          value,
          inputtedPhone: "",
        },
        {
          onSuccess: (data) => {
            console.log(data);
          },
          onSettled: () => setLoadingReference(false),
        }
      );
    } else {
      await addMultibancoReference.mutateAsync(
        { reservationId: reservation.id, value },
        {
          onSuccess: (data) => {
            console.log(data);
          },
          onSettled: () => setLoadingReference(false),
        }
      );
    }
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
                <Dialog.Title
                  as="h3"
                  className="flex gap-3 bg-primary-300 p-5 text-lg font-medium leading-6 text-white"
                >
                  <Image className="m-2" src="/images/keyboard.png" height={32} width={32} alt="" />
                  <span className="my-auto">Gerar referencia</span>
                </Dialog.Title>

                {/* <!-- Modal --> */}
                <div
                  className="modal fade -centered"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-center gap-5 py-10">
                      <div
                        className={classNames("relative h-24 px-4 py-4", {
                          "my-auto cursor-pointer border-b border-primary-500": selectedPayment === "multibanco",
                        })}
                        onClick={() => setSelectedPayment("multibanco")}
                      >
                        <Image
                          className="py-3"
                          src="/icons/multibanco.svg"
                          alt="multibanco"
                          objectFit="contain"
                          height={64}
                          width={48}
                        ></Image>
                      </div>
                      <div
                        onClick={() => setSelectedPayment("mbway")}
                        className={classNames("relative h-24 px-4 py-4", {
                          "cursor-pointer border-b border-primary-500": selectedPayment === "mbway",
                        })}
                      >
                        <Image src="/icons/mbway.svg" alt="mbway" objectFit="contain" height={64} width={64}></Image>
                      </div>
                    </div>
                    <div className="mb-5 flex justify-center">
                      <div className="w-40">
                        <Button type={"button"} disabled={loadingReference} onClick={generateReference}>
                          {loadingReference ? <FeathersSpinner /> : "Gerar Referencia"}
                        </Button>
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

export default ModalGerarReferencia;
