import React from "react";
import { Card } from "flowbite-react/lib/esm/components";
import { RiMailSendFill } from "react-icons/ri";
import Image from "next/image";

export default function RoomSenhorio() {
  return (
    <section className="my-20">
      <div className="mb-5 text-2xl font-bold">Sobre o seu senhorio</div>

      <div className="flex w-11/12 flex-row items-end gap-8">
        <div className="max-w-md">
          <div className="w-64">
            <Card>
              <div className="flex justify-end px-4 pt-4"></div>
              <div className="flex flex-col items-center pb-10">
                <Image
                  className="mb-3 h-24 w-24 rounded-full shadow-lg"
                  src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                  alt="Bonnie image"
                  height={96}
                  width={96}
                  unoptimized={true}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Maria</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Senhoria desde 2020</span>
                <hr />
                <div className="mt-4 flex items-center space-x-3 lg:mt-6">
                  <div className="">
                    <RiMailSendFill className=" text-4xl text-blue-600 " />
                  </div>
                  <div className="">
                    Taxa de resposta <br /> 90%
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex w-7/12 flex-col">
          <div className="max-w-md">
            <div>
              <h1 className="mb-4 text-2xl font-bold">Olá, sou a Maria!</h1>
              <p className="text-secondary-400">
                Tenho 4 casas em Peniche e já fui estudante também. Quero que os meus inquilinos se sintam bem e estou
                sempre disponível para ajudar naquilo que for preciso.
              </p>
            </div>
          </div>

          <div className="mt-8 w-full">
            <Card>
              <h1 className="text-xl font-bold">Política de Cancelamento</h1>

              <div className="flex flex-row items-start justify-start gap-4 align-top">
                <div className="h-5 w-12 rounded-full bg-yellow-300"></div>

                <div className="flex flex-col">
                  <h2 className="text-base font-bold">Flexível</h2>
                  <p className="text-base text-secondary-400">
                    Até 30 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 7
                    dias antes , o valor reembolsado é de 50%. Após esse período o pagamento é integral.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
