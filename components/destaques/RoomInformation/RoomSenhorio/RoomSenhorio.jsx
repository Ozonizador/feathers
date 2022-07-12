import React from "react";
import { Card } from "flowbite-react/lib/esm/components";
import { RiMailSendFill } from "react-icons/ri"

export default function RoomSenhorio() {
    return (
        <section className="my-20">
            <div className="font-bold text-2xl mb-5">Sobre o seu senhorio</div>



            <div className="flex flex-row w-11/12 gap-8 items-end">
                <div className="max-w-md">

                    <div className="w-64">
                        <Card>
                            <div className="flex justify-end px-4 pt-4">

                            </div>
                            <div className="flex flex-col items-center pb-10">
                                <img
                                    className="mb-3 h-24 w-24 rounded-full shadow-lg"
                                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                                    alt="Bonnie image"
                                />
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    Maria
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Senhoria desde 2020
                                </span>
                                <hr />
                                <div className="mt-4 flex space-x-3 lg:mt-6 items-center">
                                    <div className=""><RiMailSendFill className=" text-4xl text-blue-600 " /></div>
                                    <div className="">Taxa de resposta <br /> 90%</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>





                <div className="flex flex-col w-7/12">
                    <div className="max-w-md">
                        <div>
                            <h1 className="font-bold text-2xl mb-4">Olá, sou a Maria!</h1>
                            <p className="text-secondary-400">Tenho 4 casas em Peniche e já fui estudante também. Quero que os meus inquilinos se sintam bem e estou sempre disponível para ajudar naquilo que for preciso.</p>
                        </div>
                    </div>

                    <div className="w-full mt-8">
                        <Card>
                            <h1 className="font-bold text-xl">Política de Cancelamento</h1>

                            <div className="flex flex-row gap-4 items-start align-top justify-start">
                                <div className="w-12 h-5 bg-yellow-300 rounded-full">

                                </div>

                                <div className="flex flex-col">
                                    <h2 className="text-base font-bold">Flexível</h2>
                                    <p className="text-base text-secondary-400">Até 30 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 7 dias antes , o valor reembolsado é de 50%. Após esse período o pagamento é integral.</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>


        </section>
    );
}


