import React, { useState } from "react";
import { Label } from "flowbite-react/lib/esm/components";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { useSetModalDetalhesPagamento } from "../../../../context/ModalShowProvider";

import useReservationService from "../../../../hooks/reservationService";
import { useCurrentUser } from "../../../../context/MainProvider";
import FeatherDatePicker from "../../../utils/FeatherDatepicker";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import Input from "../../../utils/Input";
import { Controller, useForm } from "react-hook-form";
import ExpensesComponent from "../../../anuncio/ExpensesComponent";

interface FormReservation {
  number_guests: number;
}

export const RoomPagamento = () => {
  const { addReservation } = useReservationService();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const advertisement = useGetSingleAdvertisement();
  const profile = useCurrentUser();
  let setIsOpen = useSetModalDetalhesPagamento();

  const router = useRouter();

  // /* Reservation */
  // const [reservation, setReservation] = useState<Omit<Reservation, "id" | "created_at" | "updated_at">>({
  //   start_date: startDate.toDateString(),
  //   end_date: endDate.toDateString(),
  //   status: ReservationStatus.REQUESTED,
  //   advertisement_id: advertisement.id,
  //   tenant_id: "",
  // });

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

  return (
    <>
      <form className="w-full" id="reserva" onSubmit={handleSubmit(makeReservation)}>
        <div className="w-full rounded-2xl border-0 px-4 lg:border lg:border-terciary-700">
          <div className="flex flex-col justify-center gap-4 ">
            <div className="mt-2 text-center text-2xl font-bold text-primary-500">
              {advertisement?.month_rent || 0}&euro;/mês
            </div>

            <ExpensesComponent expenses={advertisement?.expenses || {}} />
            <hr />

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="mb-2 block w-full">
                <div className="mb-2 block">
                  <Label htmlFor="Entrada" value="Entrada" />
                </div>
                <FeatherDatePicker date={startDate} onChange={(date) => setStartDate(date)} />
              </div>

              <div className="mb-2 block w-full">
                <div className="mb-2 block">
                  <Label htmlFor="Saida" value="Saida" />
                </div>
                <FeatherDatePicker date={endDate} onChange={(date) => setEndDate(date)} minDate={startDate} />
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
            <div>{`€${advertisement?.month_rent || 0}`}</div>
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
              {advertisement?.month_rent || 0}&euro;<span className="text-gray-600">/mês</span>
            </h1>
            <h1 className="mt-3  text-xl text-gray-500">Sep 19-24</h1>

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
