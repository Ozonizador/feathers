import React, { useState } from "react";
import { differenceInMonths } from "date-fns";

import { Label } from "flowbite-react/lib/esm/components";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { useSetModalDetalhesPagamento } from "../../../../context/ModalShowProvider";

import useReservationService from "../../../../hooks/reservationService";
import { useCurrentUser, useGetUserDates, useSetSearchLocationByProperty } from "../../../../context/MainProvider";
import FeatherDatePicker from "../../../utils/FeatherDatepicker";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import Input from "../../../utils/Input";
import { Controller, useForm } from "react-hook-form";
import ExpensesComponent from "../../../anuncio/ExpensesComponent";
import { SearchFields } from "../../../search/SearchInputField";

interface FormReservation {
  number_guests: number;
}

export const RoomPagamento = () => {
  const router = useRouter();
  const profile = useCurrentUser();
  const { addReservation } = useReservationService();

  let { startDate: userSelectedStartDate, endDate: userSelectedEndDate } = useGetUserDates();
  const setSearchInfoProperty = useSetSearchLocationByProperty();
  const advertisement = useGetSingleAdvertisement();
  let setIsOpen = useSetModalDetalhesPagamento();

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
    // get the reservation
    const { error } = await addReservation(reservation, profile.id);
    if (error) return toast.error("There was a error making the reservation. Contact the Unihosts support.");
    toast.success("Reservation requested.");
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
    if (advertDiferenceInMonths < 3) return month_rent;
    if (advertDiferenceInMonths >= 6) return month_rent * (1 - semester_discount / 100);
    return month_rent * (1 - trimester_discount / 100);
  };

  return (
    <>
      <form className="w-full" id="reserva" onSubmit={handleSubmit(makeReservation)}>
        <div className="w-full rounded-2xl border-0 px-4 lg:border lg:border-terciary-700">
          <div className="flex flex-col justify-center gap-4 ">
            <div className="mt-2 text-center text-2xl font-bold text-primary-500">{setAdvertPrice()}&euro;/mês</div>

            <ExpensesComponent expenses={advertisement?.expenses || {}} />
            <hr />

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="mb-2 block w-full">
                <div className="mb-2 block">
                  <Label htmlFor="Entrada" value="Entrada" />
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
                <Label htmlFor="Hóspedes" value="Hóspedes" />
              </div>
              <Controller
                control={control}
                name={"number_guests"}
                render={({ field: { onChange } }) => {
                  return <Input id="Hóspedes" type="number" onChange={onChange} value={1} />;
                }}
              ></Controller>
            </div>
          </div>

          <div className="mb-3 mt-4 text-xl font-bold">Pagamento</div>

          <div className="flex flex-row justify-between">
            <div>1ª Renda</div>
            <div>{`€${setAdvertPrice()}`}</div>
          </div>

          <div className="my-2 flex flex-row justify-between">
            <div className="text-base">Taxa de Serviço</div>
            <div>€0</div>
          </div>

          <div className="flex flex-row justify-between">
            <div
              className="mb-7 cursor-pointer text-[#8A8A8A] underline underline-offset-1"
              onClick={(e) => setIsOpen(true)}
            >
              Detalhes do Pagamento
            </div>
          </div>
          <hr />

          <div className="my-8 flex flex-row justify-between font-bold">
            <div className="text-base">Total</div>
            <div>€{advertisement?.month_rent || 0}</div>
          </div>

          <button
            type="submit"
            className="mb-5 flex cursor-pointer items-center justify-center rounded-md bg-primary-500 p-3 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl"
          >
            Enviar pedido de reserva
          </button>
        </div>
        {/* MOBILE STYLES */}
        <div className="fixed bottom-0 left-0 z-900 flex w-full flex-row items-center justify-between border  border-t-2 bg-white px-5 py-7 drop-shadow-2xl lg:hidden">
          <div className="flex flex-col text-left">
            <h1 className="mt-2 text-2xl font-bold text-black">
              {setAdvertPrice()}&euro;<span className="text-gray-600">/mês</span>
            </h1>
            <h1 className="mt-3  text-xl text-gray-500">{mobileRangeDates()}</h1>

            <div
              className="mb-7 cursor-pointer text-base text-[#8A8A8A] underline underline-offset-8"
              onClick={(e) => setIsOpen(true)}
            >
              Detalhes do Pagamento
            </div>
          </div>

          <Link href="#reserva">
            <a className="flex cursor-pointer items-center justify-center rounded-md bg-primary-500 px-5 py-3 text-xl text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
              Reserva
            </a>
          </Link>
        </div>
      </form>
    </>
  );
};

export default RoomPagamento;
