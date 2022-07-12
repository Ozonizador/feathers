import React from "react";
import { HiOutlineBadgeCheck } from "react-icons/hi"

export default function RoomPedido() {
    return (
        <section className="w-full mt-8">
            <div className="w-full border border-terciary-700 rounded-2xl px-4 py-4 bg-green-100">

                <div className="flex flex-col justify-center">
                    <div className="flex justify-center align-middle h-24 w-24 bg-white rounded-full">
                        <HiOutlineBadgeCheck className="text-6xl text-lime-400" />
                    </div>

                    <div className="text-xl font-bold my-3 text-center">
                        Pedido de reserva enviado!
                    </div>
                    <p className="text-sm text-secondary-500 text-center">O teu pedido de reserva foi enviado. O senhorio tem 24h para aceitar o teu pedido. Assim que houver novidades iremos enviar uma notificação!</p>
                </div>
            </div>
        </section >
    );
}
