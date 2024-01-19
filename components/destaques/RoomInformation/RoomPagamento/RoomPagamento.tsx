import React, { useState } from "react";
import { addMonths, differenceInMonths, isSameMonth } from "date-fns";

import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import {
  useSetModalDetalhesPagamento,
  useSetModalGerarReferencia,
  useSetModalGerarReferenciaInfo,
} from "../../../../context/ModalShowProvider";

import { useCurrentUser, useGetUserDates, useSetSearchLocationByProperty } from "../../../../context/MainProvider";
import FeatherDatePicker from "../../../utils/FeatherDatepicker";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import Input from "../../../utils/Input";
import { Controller, useForm } from "react-hook-form";
import ExpensesComponent from "../../../anuncio/ExpensesComponent";
import { SearchFields } from "../../../search/SearchInputField";
import { Reservation } from "../../../../models/reservation";
import { trpc } from "../../../../utils/trpc";
import { Label } from "flowbite-react";
import { useTranslation } from "next-i18next";
import { HouseExpenses, Included } from "../../../../models/advertisement";
import { includes } from "lodash";

type FormReservation = {
  number_guests: number;
};

export const RoomPagamento = () => {
  const { t } = useTranslation();
  const options = [
    { value: 1, label: 1 + " " + t("advertisements:person") },
    { value: 2, label: 2 + " " + t("advertisements:person") },
  ];
  const router = useRouter();
  const profile = useCurrentUser();

  let { startDate: userSelectedStartDate, endDate: userSelectedEndDate } = useGetUserDates();
  const setSearchInfoProperty = useSetSearchLocationByProperty();
  const advertisement: any = useGetSingleAdvertisement();
  let setIsOpen = useSetModalDetalhesPagamento();

  const addReservation = trpc.reservations.addReservation.useMutation();

  const { month_rent, semester_discount, trimester_discount, months_notif_in_advance, minimum_stay } =
    advertisement || {
      month_rent: 0,
      semester_discount: 0,
      trimester_discount: 0,
      months_notif_in_advance: 0,
      minimum_stay: 0,
    };

  const checkMonthsInAdvance = () => {
    if (!advertisement) return new Date();
    const today = new Date();
    if (!months_notif_in_advance) return today;

    today.setMonth(today.getMonth() + +months_notif_in_advance);
    return today;
  };

  const checkMinimumStay = () => {
    if (!advertisement || !minimum_stay) return new Date();

    const minimumDate = new Date();
    minimumDate.setMonth(minimumDate.getMonth() + +minimum_stay);
    return minimumDate;
  };

  const setInicialStartValue = () => {
    if (!advertisement) return userSelectedStartDate;

    // check if the date gives the mininum date to warn owner.
    const advertisementMininuMonthsInAdvance = checkMonthsInAdvance();
    if (advertisementMininuMonthsInAdvance > userSelectedStartDate) return advertisementMininuMonthsInAdvance;
    return userSelectedStartDate;
  };

  const setInicialEndValue = () => {
    if (!advertisement) return userSelectedEndDate;

    // check the minimum stay of the advertisement.
    const advertisementMinimumDate = checkMinimumStay();
    if (advertisementMinimumDate > userSelectedEndDate) return advertisementMinimumDate;
    return userSelectedEndDate;
  };

  const [startDate, setStartDate] = useState(setInicialStartValue());
  const [endDate, setEndDate] = useState(setInicialEndValue());
  const [guests = 1, setGuestsNumber] = useState();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormReservation>({
    defaultValues: {
      number_guests: 1,
    },
  });

  const makeReservation = async (reservation: any) => {
    if (!profile) {
      router.push("/auth/login");
      return;
    }

    if (!advertisement) return;

    const newReservation = {
      start_date: startDate,
      end_date: endDate,
      advertisement_id: advertisement.id,
      number_guests: guests,
      ...reservation,
    } as Reservation;

    // get the reservation
    await addReservation.mutateAsync(newReservation, {
      onSuccess: async (info: any) => {
        const { data, error } = info;
        if (error || !data) return toast.error(t("messages:errors.making_reservation"));

        if (!advertisement) return;
        let included = "Despesas Incluídas";
        for (let expense of advertisement.expenses.services!) {
          if (expense.included == "PARTIALLY" && included == "INCLUDED") included = "Despesas Parcialmente incluídas";
          if (expense.included == "EXCLUDED") included = "Despesas excluídas";
        }

        let formData = {
          email: advertisement.host.email,
          templateId: "d-f01d64f7f9ef4d9ca945f72013114958",
          data: {
            first_name: advertisement.host.name,
            accommodation_name: advertisement.title,
            reservation_occupation: newReservation.number_guests,
            accommodation_address: `${advertisement.street} ${advertisement.street_number}, ${advertisement.postal_code} ${advertisement.place}`,
            entry_date: new Date(newReservation.start_date).toLocaleDateString(),
            departure_date: new Date(newReservation.end_date).toLocaleDateString(),
            monthly_value: advertisement.month_rent + (advertisement.extra_per_host * newReservation.number_guests),
            bills_conditions: included,
            link: `unidesk/inbox?id=${data.id}`,
          },
        };

        await fetch("/api/mail", {
          method: "POST",
          body: JSON.stringify(formData),
        });

        formData.templateId = "d-aa6938d1e5784bc1880d920eb812e662";
        formData.email = profile.email;
        formData.data.first_name = profile.name;

        await fetch("/api/mail", {
          method: "POST",
          body: JSON.stringify(formData),
        });

        toast.success(t("messages:success.reservation_requested"));
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const mobileRangeDates = () => {
    const startMonthStr = startDate.toLocaleDateString("en-GB", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const endMonthStr = endDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return `${startMonthStr} - ${endMonthStr}`;
  };

  const setAdvertPrice = () => {
    if (!advertisement) return 0;

    const advertDiferenceInMonths = differenceInMonths(endDate, startDate);
    if (advertDiferenceInMonths < 3) return month_rent + advertisement.extra_per_host * (guests - 1);
    if (advertDiferenceInMonths >= 6)
      return (month_rent + advertisement.extra_per_host * (guests - 1)) * (1 - semester_discount / 100);
    return (month_rent + advertisement.extra_per_host * (guests - 1)) * (1 - trimester_discount / 100);
  };

  const setAdvertDatesOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <form className="w-full" id="reserva" onSubmit={handleSubmit(makeReservation)}>
        <div className="w-full rounded-2xl border-0 px-4 lg:border lg:border-terciary-700">
          <div className="flex flex-col justify-center gap-4 ">
            <div className="mt-2 text-center text-2xl font-bold text-primary-500">
              {t("advertisements:price_month", { price: setAdvertPrice() })}
            </div>

            <ExpensesComponent expenses={advertisement?.expenses || {}} />
            <hr />

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="mb-2 block w-full">
                <div className="mb-2 block">
                  <Label htmlFor="Entrada" value={t("start")} />
                </div>
                <FeatherDatePicker
                  minDate={checkMonthsInAdvance()}
                  date={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setSearchInfoProperty(SearchFields.START_DATE, date);
                  }}
                />
              </div>

              <div className="mb-2 block w-full">
                <div className="mb-2 block">
                  <Label htmlFor="Saida" value="Saida" />
                </div>
                <FeatherDatePicker
                  date={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    setSearchInfoProperty(SearchFields.END_DATE, date);
                  }}
                  minDate={checkMinimumStay()}
                />
              </div>
            </div>

            <div className="mb-2 block">
              <div className="mb-2 block">
                <Label htmlFor="Hóspedes" value={t("guest", { count: 2 })} />
              </div>
              <Controller
                control={control}
                name={"number_guests"}
                render={({ field: { onChange } }) => {
                  return (
                    <Input
                      id="Hóspedes"
                      options={options}
                      onChange={(e) => setGuestsNumber(e.target.value)}
                      value={guests || "1"}
                    />
                  );
                }}
              ></Controller>
            </div>
          </div>

          <div className="mb-3 mt-4 text-xl font-bold">{t("payment")}</div>

          <div className="flex flex-row justify-between">
            <div>1ª Renda</div>
            <div>{`€${setAdvertPrice()}`}</div>
          </div>

          <div className="my-2 flex flex-row justify-between">
            <div className="text-base">{t("service_fee")}</div>
            <div>€0</div>
          </div>

          <div className="flex flex-row justify-between">
            <div
              className="mb-7 cursor-pointer text-[#8A8A8A] underline underline-offset-1"
              onClick={() => {
                setSearchInfoProperty(SearchFields.START_DATE, startDate);
                setSearchInfoProperty(SearchFields.END_DATE, endDate);
                setAdvertDatesOpenModal();
              }}
            >
              {t("payment_details")}
            </div>
          </div>
          <hr />

          <div className="my-8 flex flex-row justify-between font-bold">
            <div className="text-base">Total</div>
            <div>€{setAdvertPrice() || 0}</div>
          </div>

          <button
            type="submit"
            className="mb-5 flex cursor-pointer items-center justify-center rounded-md bg-primary-500 p-3 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl"
          >
            {t("send_request_reservation")}
          </button>
        </div>
        {/* MOBILE STYLES */}
        <div className="fixed bottom-0 left-0 z-900 flex w-full flex-row items-center justify-between border  border-t-2 bg-white px-5 py-7 drop-shadow-2xl lg:hidden">
          <div className="flex flex-col text-left">
            <h1 className="mt-2 text-2xl font-bold text-black">
              {t("advertisements:price_month", { price: setAdvertPrice() })}
            </h1>
            <h1 className="mt-3  text-xl text-gray-500">{mobileRangeDates()}</h1>

            <div
              className="mb-7 cursor-pointer text-base text-[#8A8A8A] underline underline-offset-8"
              onClick={() => setIsOpen(true)}
            >
              {t("payment_details")}
            </div>
          </div>

          <Link
            href="#reserva"
            className="flex cursor-pointer items-center justify-center rounded-md bg-primary-500 px-5 py-3 text-xl text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl"
          >
            {t("index:section.how_it_works.reservation.title")}
          </Link>
        </div>
      </form>
    </>
  );
};

export default RoomPagamento;
