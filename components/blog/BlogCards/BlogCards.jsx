import Image from "next/image";
import img1 from "../../../public/images/cardpic1.png";
import img2 from "../../../public/images/cardpic2.png";

export default function BlogCards() {
  return (
    <section className="container mx-auto pt-20 pb-5 ">
      <div className="flex flex-col justify-between gap-14 lg:flex-row">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <div className="flex-1 rounded-3xl bg-white p-5 drop-shadow-xl">
              <div className="flex flex-col lg:flex-row">
                <div className="w-80 rounded-3xl ">
                  <Image
                    layout="responsive"
                    src="/images/cardpic1.png"
                    alt="5 formas de melhorar o consumo energético da sua casa"
                    objectFit="contain"
                    height="100%"
                    width="100%"
                  ></Image>
                </div>

                <div className="ml-3 flex w-full flex-col">
                  <div className="mb-2  mt-3 text-xl lg:mt-0">
                    5 formas de melhorar o consumo energético da sua casa
                  </div>
                  <div className="text-sm">
                    É certo que Portugal tem melhorado muito no que diz respeito ao consumo energético das suas casas,
                    devido à implementação de várias políticas que visam a eficiência nesse campo. No entanto, ainda
                    muito há para fazer.
                  </div>

                  <div className="mt-5 flex w-11/12 flex-row justify-between gap-0 lg:w-full lg:gap-8">
                    <div className=" text-sm text-gray-400">22 de Janeiro de 2022</div>
                    <div className="text-sm text-gray-400 ">By Unihosts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex-1 rounded-3xl bg-white p-5 drop-shadow-xl">
              <div className="flex flex-col lg:flex-row">
                <div className="w-80 rounded-3xl ">
                  <Image
                    layout="responsive"
                    src="/images/cardpic2.png"
                    alt="Saúde Mental - pensar em ti e no teu equilíbrio emocional durante a universidade"
                    objectFit="contain"
                    height="100%"
                    width="100%"
                  ></Image>
                </div>

                <div className="ml-3 flex w-full flex-col">
                  <div className="mb-2  mt-3 text-xl lg:mt-0">
                    Saúde Mental - pensar em ti e no teu equilíbrio emocional durante a universidade
                  </div>
                  <div className="text-sm">
                    A recente emergência higiénico-sanitária, provocada pelo novo coronavirus, veio virar as nossas
                    vidas de pernas para o ar.
                  </div>

                  <div className="mt-5 flex w-11/12 flex-row justify-between gap-0 lg:w-full lg:gap-8">
                    <div className=" text-sm text-gray-400">22 de Janeiro de 2022</div>
                    <div className="text-sm text-gray-400 ">By Unihosts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
