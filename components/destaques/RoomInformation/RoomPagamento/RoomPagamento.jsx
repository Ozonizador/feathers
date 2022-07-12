import React from "react";
import { TextInput } from "flowbite-react/lib/esm/components";
import { Label } from "flowbite-react/lib/esm/components";
import Link from "next/link"

export default function RoomPagamento() {
    return (
        <section className="w-full">
            <div className="w-full border border-terciary-700 rounded-2xl px-4">
                <div className="flex flex-col gap-4 justify-center ">
                    <div className="text-2xl font-bold text-primary-500 text-center mt-2">
                        320&euro;/mês
                    </div>

                    <div className="text-base  text-center mb-2">
                        Despesas incluídas
                    </div>
                    <hr />

                    <div className="flex gap-4 mt-5">
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

                <div className="text-xl font-bold mb-3 mt-4">Pagamento</div>

                <div className="flex flex-row justify-between">
                    <div>1ª Renda</div>
                    <div>€300</div>

                </div>

                <div className="flex flex-row justify-between my-2">
                    <div className="text-base">Taxa de Serviço</div>
                    <div>€0</div>
                </div>

                <div className="flex flex-row justify-between">
                    <div className="underline underline-offset-1 text-secondary-600 mb-7">Detalhes do Pagamento</div>
                </div>
                <hr />


                <div className="flex flex-row justify-between my-8 font-bold">
                    <div className="text-base">Total</div>
                    <div>€300</div>
                </div>


                <Link href="/">
                    <a className="flex  items-center justify-center  rounded-md bg-primary-500 p-3 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl mb-5">
                        Enviar pedido de reserva
                    </a>
                </Link>
            </div>




        </section >
    );
}
