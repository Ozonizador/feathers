import React, { Fragment, ReactNode, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useModaisAnuncioDetalhes, useSetModalDetalhesPagamento } from "../../context/ModalShowProvider";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useGetSingleAdvertisement } from "../../context/ShowingSingleAdvertisementProvider";
import { useGetUserDates, useGetUserGuaranteeValue, useGetUserMonthRent } from "../../context/MainProvider";
import differenceInMonths from "date-fns/differenceInMonths";
import addMonths from "date-fns/addMonths";
import { Trans, useTranslation } from "next-i18next";
import { getDate, getDaysInMonth, isLastDayOfMonth, isToday } from "date-fns";
import { has, isString, toNumber } from "lodash";
import { IoMdClose } from "react-icons/io";

interface formatOpts {
  monthsAhead?: number;
}

interface MonthPrice {
  month: string;
  price: number;
}

/* PAGINA 7 DO XD */

const ModalDetalhesPagamento = () => {
  const { t, i18n } = useTranslation();
  const advertisement = useGetSingleAdvertisement();
  let { detailsModalOpen } = useModaisAnuncioDetalhes();
  let { startDate: selectedDate, endDate } = useGetUserDates();
  const { monthRent, semester_discount, trimester_discount, extra_per_host, guest_number } = useGetUserMonthRent();
  let setIsOpen = useSetModalDetalhesPagamento();
  const guaranteed_value = useGetUserGuaranteeValue();
  const [checkedDates, setCheckedDates] = useState<Boolean>(false);
  const [months, setMonths] = useState<Array<MonthPrice>>([]);
  const [hasRunOnce, setHasRunOnce] = useState<boolean>(false);

  const formatOnlyMonth = (date: Date, opts: formatOpts) => {
    if (!date) return "";
    const { monthsAhead } = opts || { monthsAhead: undefined };

    const newDate = new Date(date);
    if (monthsAhead) {
      newDate.setMonth(newDate.getMonth() + monthsAhead);
    }

    return newDate.toLocaleString("PT", {
      month: "long",
    });
  };

  const closeModal = () => {
    setCheckedDates(false);
    setIsOpen(false);
  };

  const getMonths = () => {
    if (!checkedDates && !isToday(selectedDate)) {
      const monthDiference = differenceInMonths(endDate, selectedDate);
      let rent;
      if (advertisement) {
        const { month_rent, extra_per_host } = advertisement;
        rent = month_rent + extra_per_host * (guest_number! - 1);
      } else {
        rent = toNumber(monthRent! + extra_per_host! * (guest_number! - 1));
      }

      const totalDaysOfMonth = getDaysInMonth(addMonths(selectedDate, 1));
      const getDaysTillEndMonth = totalDaysOfMonth - getDate(selectedDate);

      let arrayOfMonths: any[] = [];
      const pricePerDay = rent / 30;
      let selectedMonth = addMonths(selectedDate, 1);
      const monthLong = selectedMonth.toLocaleString(i18n.language, { month: "long" });

      if (getDaysTillEndMonth > 0) {
        if (getDaysTillEndMonth >= 30) {
          arrayOfMonths.push({ month: monthLong, price: rent.toFixed(2) });
        } else {
          let priceAdjustment = pricePerDay * getDaysTillEndMonth;

          arrayOfMonths.push({ month: monthLong, price: priceAdjustment.toFixed(2) });
        }

        if (isLastDayOfMonth(endDate)) {
          while (arrayOfMonths.length < monthDiference) {
            let selectedMonth = addMonths(selectedDate, arrayOfMonths.length + 1);
            const monthLong = selectedMonth.toLocaleString(i18n.language, { month: "long" });
            arrayOfMonths.push({ month: monthLong, price: rent.toFixed(2) });
          }
        } else {
          // Fazer o Resto da codigo com preco feito por dia/quinzena ou mes
          while (arrayOfMonths.length < monthDiference - 1) {
            let selectedMonth = addMonths(selectedDate, arrayOfMonths.length + 1);
            const monthLong = selectedMonth.toLocaleString(i18n.language, { month: "long" });
            arrayOfMonths.push({ month: monthLong, price: rent.toFixed(2) });
          }

          let endDay = getDate(endDate);

          arrayOfMonths.push({
            month: endDate.toLocaleString(i18n.language, { month: "long" }),
            price: (endDay * pricePerDay).toFixed(2),
          });
        }

        setMonths(arrayOfMonths);
      } else {
        if (isLastDayOfMonth(endDate)) {
          while (arrayOfMonths.length < monthDiference - 1) {
            let selectedMonth = addMonths(selectedDate, arrayOfMonths.length + 1);
            const monthLong = selectedMonth.toLocaleString(i18n.language, { month: "long" });
            arrayOfMonths.push({ month: monthLong, price: rent.toFixed(2) });
          }

          let endDay = getDate(endDate);

          arrayOfMonths.push({
            month: endDate.toLocaleString(i18n.language, { month: "long" }),
            price: (endDay * pricePerDay).toFixed(2),
          });
        } else {
          // Fazer o Resto da codigo com preco feito por dia/quinzena ou mes
          while (arrayOfMonths.length < monthDiference - 1) {
            let selectedMonth = addMonths(selectedDate, arrayOfMonths.length + 1);
            const monthLong = selectedMonth.toLocaleString(i18n.language, { month: "long" });
            arrayOfMonths.push({ month: monthLong, price: rent.toFixed(2) });
          }

          let endDay = getDate(endDate);

          arrayOfMonths.push({
            month: endDate.toLocaleString(i18n.language, { month: "long" }),
            price: (endDay * pricePerDay).toFixed(2),
          });
        }

        setMonths(arrayOfMonths);
      }
      setCheckedDates(true);
    }
  };

  const setAdvertPrice = () => {
    if (advertisement) {
      const { month_rent, semester_discount, trimester_discount } = advertisement;

      const advertDiferenceInMonths = differenceInMonths(endDate, selectedDate);
      if (advertDiferenceInMonths < 3) return month_rent.toFixed(2) + extra_per_host! * (guest_number! - 1);
      if (advertDiferenceInMonths >= 6)
        return ((toNumber(month_rent) + extra_per_host! * (guest_number! - 1)) * (1 - semester_discount / 100)).toFixed(
          2
        );
      return ((month_rent + extra_per_host! * (guest_number! - 1)) * (1 - trimester_discount / 100)).toFixed(2);
    } else {
      const advertDiferenceInMonths = differenceInMonths(endDate, selectedDate);
      if (advertDiferenceInMonths < 3) return toNumber(monthRent).toFixed(2) + extra_per_host! * (guest_number! - 1);
      if (advertDiferenceInMonths >= 6)
        return ((toNumber(monthRent) + extra_per_host! * (guest_number! - 1)) * (1 - semester_discount! / 100)).toFixed(
          2
        );
      return ((toNumber(monthRent) + extra_per_host! * (guest_number! - 1)) * (1 - trimester_discount! / 100)).toFixed(
        2
      );
    }
  };

  useEffect(() => {
    if (!hasRunOnce) {
      if (!isToday(selectedDate)) {
        getMonths();
        setHasRunOnce(true);
      }
    }
  }, [checkedDates, selectedDate, endDate, advertisement, months, getMonths, hasRunOnce, setMonths]);

  return (
    <>
      <Transition appear show={detailsModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-900" onClose={() => closeModal()}>
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
            <>{getMonths()}</>
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
                    className="mb-16 mt-6 text-center text-2xl font-bold leading-6 text-gray-900 lg:text-4xl ml-2"
                  >
                    {t("common:payment_details")}
                    <IoMdClose className=" ml-2 h-8 w-8 absolute right-10 top-14 cursor-pointer max-sm:top-11" onClick={() => closeModal()}/>
                  </Dialog.Title>

                  <div className="mt-2">
                    <div className="px-8">
                      <div className="padding-2 my-6 text-xl font-bold text-primary-500 lg:text-2xl">Via Unihosts</div>
                      {/* Unihosts */}
                      <FeathersAccordion>
                        <div className="flex max-sm:flex-col">
                          <div className="flex max-sm:flex-row">
                            <div className="font-bold">{t("common:first_rent")}</div>
                            <div className="relative my-auto ml-1">
                              <AiOutlineInfoCircle className="peer my-auto" size={14} />
                              <div className="-bottom-10 -right-60 hidden peer-hover:absolute peer-hover:block">
                                <div className="relative w-56 rounded-lg bg-primary-500 p-2 text-white">
                                  <div className="absolute -left-2 h-0 w-0 border-b-[10px] border-r-[10px] border-t-[10px] border-b-transparent border-r-primary-500 border-t-transparent"></div>
                                  <p>{t("first_rent_description")}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-auto flex max-sm:ml-0">
                            <div className="font-bold">{setAdvertPrice().toLocaleString()}€</div>
                          </div>
                        </div>
                        <div className="flex gap-1 text-neutral-600">
                          <p className="text-sm lg:text-base">
                            <Trans
                              i18nKey="first_payment_rent_description"
                              components={{
                                1: <span className="capitalize">{formatOnlyMonth(selectedDate, {})}</span>,
                              }}
                            />
                          </p>
                        </div>
                      </FeathersAccordion>
                      {/* SENHORIO */}
                      <div className="my-6 text-xl font-bold text-primary-500 lg:text-2xl">{t("to_landlord")}</div>
                      <FeathersAccordion>
                        <div className="flex max-sm:flex-col">
                          <h6 className="font-bold">{t("on_check_day")}</h6>
                          <div className="ml-auto flex max-sm:ml-0">
                            <div className="font-bold">{setAdvertPrice().toLocaleString()}€</div>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="relative mt-1 flex gap-1 text-neutral-500">
                            <p className="my-auto text-sm lg:text-base">{t("deposit")}</p>
                            <div className="relative mt-1">
                              <AiOutlineInfoCircle className="peer my-auto" size={14} />
                              <div className="-bottom-[90px] -right-60 hidden peer-hover:absolute peer-hover:block">
                                <div className="relative w-56 rounded-lg bg-primary-500 p-2 text-white">
                                  <div className="absolute -left-2 h-0 w-0 border-b-[10px] border-r-[10px] border-t-[10px] border-b-transparent border-r-primary-500 border-t-transparent"></div>
                                  <p>{t("value_retained_description")}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-auto mr-6 text-neutral-500">
                            {advertisement?.guarantee_value.toFixed(2).toLocaleString() || guaranteed_value?.toFixed(2).toLocaleString()}€
                          </div>
                        </div>
                      </FeathersAccordion>
                      {/* Mensalidade */}
                      <FeathersAccordion>
                        <div className="flex">
                          <h6>{t("rent_month_paid")}</h6>
                          <div className="ml-auto">
                            <MdOutlineKeyboardArrowUp className="my-auto text-primary-500" size={24} />
                          </div>
                        </div>
                        <div className="mt-2 flex flex-col gap-1">
                          {checkedDates &&
                            months.length > 0 &&
                            hasRunOnce &&
                            months.map((value, index) => {
                              return (
                                <div className="flex text-sm text-neutral-500" key={index}>
                                  <div>{t("rent_of_month", { month: value.month })}</div>
                                  <div className="ml-auto mr-6">{value.price.toLocaleString()}€</div>
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
function sleep(arg0: number) {
  throw new Error("Function not implemented.");
}
