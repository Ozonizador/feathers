import React, { useState } from "react";
import { TextInput } from "flowbite-react/lib/esm/components";
import { Label } from "flowbite-react/lib/esm/components";
import { BiInfoCircle } from "react-icons/bi";
import RoomUtilitesPopover from "../../../roomUtils/roomUtilitiesPopover";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { useSetModalDetalhesPagamento } from "../../../../context/ModalShowProvider";

import useReservationService from "../../../../hooks/reservationService";
import { Reservation, ReservationStatus } from "../../../../models/reservation";
import { useProfileInformation } from "../../../../context/MainProvider";
import FeatherDatePicker from "../../../utils/FeatherDatepicker";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { checkIfExpensesIncluded } from "../../../../helpers/advertisementHelper";
import Link from "next/link";

export default function RoomPagamento() {
  const { addReservation } = useReservationService();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const advertisement = useGetSingleAdvertisement();
  const profile = useProfileInformation();
  let setIsOpen = useSetModalDetalhesPagamento();

  const router = useRouter();

  /* Reservation */
  const [reservation, setReservation] = useState<Omit<Reservation, "id" | "created_at" | "updated_at">>({
    start_date: startDate.toDateString(),
    end_date: endDate.toDateString(),
    status: ReservationStatus.REQUESTED,
    advertisement_id: advertisement.id,
    tenant_id: "",
  });

  const makeReservation = async () => {
    if (!profile) {
      router.push("/auth/login");
      return;
    }
    // get the reservation
    const { data, error } = await addReservation(reservation, profile.id);
    if (!error && data) {
      toast("Wow so easy!");
    } else {
      toast("ERROR");
    }
  };

  return (
    <>
      <div className="w-full" id="reserva">
        <div className="w-full rounded-2xl border-0 px-4 lg:border lg:border-terciary-700">
          <div className="flex flex-col justify-center gap-4 ">
            <div className="mt-2 text-center text-2xl font-bold text-primary-500">
              {advertisement.month_rent}&euro;/mês
            </div>

            <div className="relative mb-2 text-center text-base">
              <div className="flex items-center justify-center gap-2 align-middle">
                <div className="group flex items-center">
                  {advertisement && advertisement.expenses && (
                    <span>{checkIfExpensesIncluded(advertisement.expenses?.services || [])}</span>
                  )}
                  <BiInfoCircle className="ml-2" />
                </div>
                <RoomUtilitesPopover expenses={advertisement.expenses} />
              </div>
            </div>
            <hr />

            <div className="mt-5 flex flex-wrap gap-4">
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
                <FeatherDatePicker date={endDate} onChange={(date) => setEndDate(date)} />
              </div>
            </div>

            <div className="mb-2 block">
              <div className="mb-2 block">
                <Label htmlFor="Hóspedes" value="Hóspedes" />
              </div>
              <TextInput id="Hóspedes" type="text" sizing="md" />
            </div>
          </div>

          <div className="mb-3 mt-4 text-xl font-bold">Pagamento</div>

          <div className="flex flex-row justify-between">
            <div>1ª Renda</div>
            <div>{`€${advertisement.month_rent}`}</div>
          </div>

          <div className="my-2 flex flex-row justify-between">
            <div className="text-base">Taxa de Serviço</div>
            <div>€0</div>
          </div>

          <div className="flex flex-row justify-between">
            <div
              className="mb-7 cursor-pointer text-secondary-600 underline underline-offset-1"
              onClick={(e) => setIsOpen(true)}
            >
              Detalhes do Pagamento
            </div>
          </div>
          <hr />

          <div className="my-8 flex flex-row justify-between font-bold">
            <div className="text-base">Total</div>
            <div>€{advertisement.month_rent}</div>
          </div>

          <div onClick={makeReservation}>
            <a className="mb-5 flex cursor-pointer items-center justify-center rounded-md bg-primary-500 p-3 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
              Enviar pedido de reserva
            </a>
          </div>
        </div>
      </div>

      {/* MOBILE STYLES */}

      <div className="fixed bottom-0 left-0 z-900 flex w-full flex-row items-center justify-between border  border-t-2 bg-white px-5 py-7 drop-shadow-2xl lg:hidden">
        <div className="flex flex-col text-left">
          <h1 className="mt-2 text-2xl font-bold text-black">
            {advertisement.month_rent}&euro;<span className="text-gray-600">/mês</span>
          </h1>
          <h1 className="mt-3  text-xl text-gray-500">Sep 19-24</h1>

          <div
            className="mb-7 cursor-pointer text-base  text-gray-500 underline underline-offset-8"
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
    </>
  );
}
