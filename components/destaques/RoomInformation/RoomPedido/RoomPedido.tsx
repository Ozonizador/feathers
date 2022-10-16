import React from "react";
import { HiOutlineBadgeCheck } from "react-icons/hi";

export default function RoomPedido() {
  return (
    <section className="mt-8 w-full">
      <div className="w-full rounded-2xl border border-terciary-700 bg-green-100 px-4 py-4">
        <div className="flex flex-col items-center justify-center align-middle">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white align-middle">
            <HiOutlineBadgeCheck className="text-6xl text-lime-400" />
          </div>

          <div className="my-3 text-center text-xl font-bold">Pedido de reserva enviado!</div>
          <p className="text-center text-sm text-secondary-500">
            O teu pedido de reserva foi enviado. O senhorio tem 24h para aceitar o teu pedido. Assim que houver
            novidades iremos enviar uma notificação!
          </p>
        </div>
      </div>
    </section>
  );
}
