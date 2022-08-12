import React, { useState } from "react";
import { TextInput } from "flowbite-react/lib/esm/components";
import { Label } from "flowbite-react/lib/esm/components";
import { BiInfoCircle } from "react-icons/bi";
import RoomUtilitesPopover from "../../../roomUtils/roomUtilitiesPopover";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { EXPENSES_TO_TEXT } from "../../../../models/advertisement";
import { useSetModalDetalhesPagamentoOpen } from "../../../../context/ModalShowProvider";

import { addReservation } from "../../../../services/reservationService";
import { Reservation, ReservationStatus } from "../../../../models/reservation";
import { useProfileInformation } from "../../../../context/MainProvider";
import { addNotification } from "../../../../services/notificationsService";
import { createNotification } from "../../../../helpers/notificationHelper";
import { NOTIFICATION_LINKS, NOTIFICATION_TYPES } from "../../../../models/notification";
import FeatherDatePicker from "../../../utils/FeatherDatepicker";
import { addConversation } from "../../../../services/conversationService";
import { Conversation } from "../../../../models/conversation";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function RoomPagamento() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const advertisement = useGetSingleAdvertisement();
  const profile = useProfileInformation();
  let setIsOpen = useSetModalDetalhesPagamentoOpen();

  const router = useRouter();

  /* Reservation */
  const [reservation, setReservation] = useState<Reservation>({
    startDate: startDate,
    endDate: endDate,
    status: ReservationStatus.REQUESTED,
    advertisementId: advertisement.id,
    tenantId: "",
  });

  const makeReservation = async () => {
    if (!profile) {
      router.push("/auth/login");
      return;
    }
    // get the reservation
    const { data, error } = await addReservation(reservation, profile.id);
    if (!error && data) {
      const notification = createNotification(
        NOTIFICATION_TYPES.LANDLORD_RESERVATION_RECEIVED,
        NOTIFICATION_LINKS.STAY,
        profile
      );

      await addNotification(notification);
      await createConversation(data.id);
      toast("Wow so easy!");
    } else {
      toast("ERROR");
    }
  };

  const createConversation = async (reservationId: string) => {
    const conversation = {
      hostId: advertisement.host.id,
      tenantId: profile.id,
      reservationId: reservationId,
    } as Conversation;

    await addConversation(conversation);
  };

  return (
    <>
      <div className="w-full ">
        <div className="w-full rounded-2xl border border-terciary-700 px-4">
          <div className="flex flex-col justify-center gap-4 ">
            <div className="mt-2 text-center text-2xl font-bold text-primary-500">
              {advertisement.monthRent}&euro;/mês
            </div>

            <div className="relative mb-2 text-center text-base">
              <div className="flex items-center justify-center gap-2 align-middle">
                <div className="peer flex items-center">
                  {advertisement && advertisement.expenses && (
                    <span>{EXPENSES_TO_TEXT[advertisement.expenses.inclusive]}</span>
                  )}
                  <BiInfoCircle className="ml-2" />
                </div>
                <RoomUtilitesPopover expenses={advertisement.expenses} />
              </div>
            </div>
            <hr />

            <div className="mt-5 flex flex-wrap gap-4">
              <div className="mb-2 block ">
                <div className="mb-2 block">
                  <Label htmlFor="Entrada" value="Entrada" />
                </div>
                <FeatherDatePicker date={startDate} onChange={(date) => setStartDate(date)} />
              </div>

              <div className="mb-2 block">
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
            <div>{`€${advertisement.monthRent}`}</div>
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
            <div>€{advertisement.monthRent}</div>
          </div>

          <div onClick={makeReservation}>
            <a className="mb-5 flex cursor-pointer items-center justify-center rounded-md bg-primary-500 p-3 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
              Enviar pedido de reserva
            </a>
          </div>
        </div>
      </div>

      {/* MOBILE STYLES */}

      <div className="fixed bottom-0 left-0 z-50 flex w-full flex-row items-center justify-between border  border-t-2 bg-white px-5 py-7 drop-shadow-2xl lg:hidden">
        <div className="flex flex-col text-left">
          <h1 className="mt-2 text-2xl font-bold text-black">
            {" "}
            {advertisement.monthRent}&euro;<span className="text-gray-600">/mês</span>
          </h1>
          <h1 className="mt-3  text-xl text-gray-500">Sep 19-24</h1>

          <div
            className="mb-7 cursor-pointer text-xl text-gray-500 underline underline-offset-8"
            onClick={(e) => setIsOpen(true)}
          >
            Detalhes do Pagamento
          </div>
        </div>

        <div>
          <div onClick={makeReservation}>
            <a className="flex cursor-pointer items-center justify-center rounded-md bg-primary-500 px-10 py-5 text-xl text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
              Reserva
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
