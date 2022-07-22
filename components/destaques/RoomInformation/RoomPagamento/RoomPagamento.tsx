import React, { useState } from "react";
import { TextInput } from "flowbite-react/lib/esm/components";
import { Label } from "flowbite-react/lib/esm/components";
import Link from "next/link";
import { BiInfoCircle } from "react-icons/bi";
import RoomUtilitesPopover from "../../../roomUtils/roomUtilitiesPopover";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { EXPENSES_TO_TEXT } from "../../../../models/advertisement";
import ModalPagamento from "../../../modals/ModalPagamento";

export default function RoomPagamento() {
  const advertisement = useGetSingleAdvertisement();
  const [modalPagamento, isModalPagamento] = useState<boolean>(false);

  const openModal = (e) => {
    e.preventDefault();
    isModalPagamento(true);
  };
  return (
    <section className="w-full">
      <ModalPagamento defaultOpen={modalPagamento} />
      <div className="w-full rounded-2xl border border-terciary-700 px-4">
        <div className="flex flex-col justify-center gap-4 ">
          <div className="mt-2 text-center text-2xl font-bold text-primary-500">
            {advertisement.monthRent}&euro;/mês
          </div>

          <div className="relative  mb-2 text-center text-base">
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

          <div className="mt-5 flex gap-4">
            <div className="mb-2 block ">
              <div className="mb-2 block">
                <Label htmlFor="Entrada" value="Entrada" />
              </div>
              <TextInput id="date" type="text" sizing="md" />
            </div>

            <div className="mb-2 block">
              <div className="mb-2 block">
                <Label htmlFor="Saida" value="Saida" />
              </div>
              <TextInput id="saida" type="text" sizing="md" />
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
            onClick={(e) => openModal(e)}
          >
            Detalhes do Pagamento
          </div>
        </div>
        <hr />

        <div className="my-8 flex flex-row justify-between font-bold">
          <div className="text-base">Total</div>
          <div>€300</div>
        </div>

        <Link href="/">
          <a className="mb-5 flex items-center justify-center rounded-md bg-primary-500 p-3 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
            Enviar pedido de reserva
          </a>
        </Link>
      </div>
    </section>
  );
}
