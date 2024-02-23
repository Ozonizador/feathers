import React, { Fragment, useEffect, useState } from "react";
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
import Input from "../utils/Input";
import { AddReservationPaymentProps } from "../../server/helpers/paymentsHelper";
import { useTranslation } from "next-i18next";
import { isBefore, subMinutes } from "date-fns";
import { toNumber } from "lodash";

const ModalGerarReferencia = () => {
  const user = useUser();
  const [loadingReference, setLoadingReference] = useState<boolean>(false);
  const [loadedReference, setLoadedReference] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<"multibanco" | "mbway">("multibanco");
  const [data, setData] = useState<AddReservationPaymentProps>();
  const { generateReferenceModalOpen } = useModaisAnuncioDetalhes();
  const { reservation, value } = useModalGerarReferencia();
  const [open, setOpen] = useState<boolean>(false);
  const setModalProperty = useSetModalGerarReferencia();
  const { t } = useTranslation();

  // trpc methods

  const addMultibancoReference = trpc.payments.addMultibancoPayment.useMutation();
  const addMbWayReference = trpc.payments.addMbWayPayment.useMutation();
  const checkIfPaymentWasCreated = trpc.payments.checkIfPaymentWasCreated.useMutation();

  function closeModal() {
    setOpen(false);
    setLoadedReference(false);
    setModalProperty(false);
  }

  const handlePaymentClick = (payment: string) => {
    if (payment == "multibanco" || payment == "mbway") {
      setSelectedPayment(payment);
    }
    setData(undefined);
  };

  const generateReference = async () => {
    if (!reservation || !user || value == undefined) return;

    setLoadingReference(true);
    let checked = false;

    if (selectedPayment != "mbway") {
      await checkIfPaymentWasCreated.mutateAsync(
        { reservation_id: reservation.id },
        {
          onSuccess: (data: any) => {
            if (data && selectedPayment.toUpperCase() == data.payment_type) {
              let compareDate = subMinutes(new Date(), 30);
              let date = new Date(data.created_at);
              if (data.payment_type == "MULTIBANCO") {
                setData({
                  reference: data.referencia,
                  entidade: data.entidade,
                  metadata: data.metadata,
                  valor: data.valor,
                  payment_type: data.payment_type,
                });
                checked = true;
                setLoadedReference(true);
              } else if (!isBefore(compareDate, date)) {
                setData({
                  reference: data.referencia,
                  entidade: data.entidade,
                  metadata: data.metadata,
                  valor: data.valor,
                  payment_type: data.payment_type,
                });
                checked = true;
                setLoadedReference(true);
              }
            }
          },
          onSettled: () => setLoadingReference(false),
        }
      );

      setOpen(true);
    }

    if (selectedPayment === "mbway") {
      let Reference = await addMbWayReference.mutateAsync(
        {
          reservationId: reservation.id,
          value,
          inputtedPhone: phone,
        },
        {
          onSuccess: (data) => {
            setLoadedReference(true);
            setData(data);
          },
          onSettled: () => setLoadingReference(false),
        }
      );

      setData(Reference);
    } else if (!checked) {
      let Reference = await addMultibancoReference.mutateAsync(
        { value, reservationId: reservation.id },
        {
          onSuccess: (data) => {
            setData(data);
            setLoadedReference(true);
          },
          onSettled: () => setLoadingReference(false),
        }
      );

      setData(Reference);
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex gap-3 bg-primary-300 p-5 text-lg font-medium leading-6 text-white"
                >
                  <Image className="m-2" src="/images/keyboard.png" height={32} width={32} alt="" />
                  <span className="my-auto">{t("advertisements:generate")}</span>
                </Dialog.Title>

                {/* <!-- Modal --> */}
                <div
                  className="modal fade -centered"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex justify-center gap-5 py-10">
                      <div
                        className={classNames("relative flex cursor-pointer flex-col items-center px-4 py-4", {
                          "border-b border-primary-500": selectedPayment === "multibanco",
                        })}
                        onClick={() => handlePaymentClick("multibanco")}
                      >
                        <Image
                          className="py-3"
                          src="/icons/icons8-multibanco.svg"
                          alt="multibanco"
                          style={{ objectFit: "contain" }}
                          height={64}
                          width={64}
                        ></Image>
                        <span>Multibanco</span>
                      </div>
                      <div
                        onClick={() => handlePaymentClick("mbway")}
                        className={classNames("relative flex cursor-pointer flex-col items-center px-4 py-4", {
                          "border-b border-primary-500": selectedPayment === "mbway",
                        })}
                      >
                        <Image
                          src="/icons/icons8-mb-way.svg"
                          alt="mbway"
                          style={{ objectFit: "contain" }}
                          height={64}
                          width={84}
                        ></Image>
                        <span>MB Way</span>
                      </div>
                    </div>
                    {selectedPayment === "mbway" && (
                      <div className="my-5 flex flex flex-col items-center justify-center">
                        <span>{t("advertisements:cellphone")}</span>
                        <Input onChange={(e) => setPhone(e.target.value)} value={phone} />
                      </div>
                    )}
                    {!loadedReference && (
                      <div className="mb-5 flex justify-center">
                        <div className="w-40">
                          <Button type={"button"} disabled={loadingReference} onClick={generateReference}>
                            {loadingReference ? <FeathersSpinner /> : t("advertisements:generate")}
                          </Button>
                        </div>
                      </div>
                    )}
                    {loadedReference && open && (
                      <div className="column mb-5 flex w-1/2 flex-col justify-center">
                        {selectedPayment == "multibanco" && (
                          <>
                            <span>{t("advertisements:entity", { entity: data?.entidade })}</span>
                            <span>{t("advertisements:reference", { reference: data?.reference })}</span>
                          </>
                        )}
                        <span>{t("advertisements:amount", { amount: toNumber(data?.valor).toFixed(2) })}</span>
                      </div>
                    )}
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
