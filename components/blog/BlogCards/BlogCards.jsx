
import Image from "next/image"
import img1 from "../../../public/images/cardpic1.png"
import img2 from "../../../public/images/cardpic2.png"


export default function BlogCards() {
  return (

    <section className="container mx-auto pt-20 pb-5">
      <div className="flex justify-between gap-28">


        {/* CARD 1 */}
        <div className="flex-1 drop-shadow-xl rounded-3xl bg-white px-5 py-5 ">
          <div className="flex">
            <div className="w-60 h-60">
              <Image src={img1} alt="" height="250" width="250" className="object-fill "></Image>
            </div>

            <div className="flex flex-col flex-auto w-10 ml-6">
              <div className="text-xl w-5/6 mb-2">5 formas de melhorar o consumo energético da sua casa</div>
              <div className="w-96">É certo que Portugal tem melhorado muito no que diz respeito ao consumo energético das suas casas, devido à implementação de várias políticas que visam a eficiência nesse campo. No entanto, ainda muito há para fazer.</div>

              <div className=" absolute">
                <div className="relative top-48 w-96">
                  <div className="flex flex-row justify-between mt-5 ">
                    <div className="text-base text-gray-400">22 de Janeiro de 2022</div>
                    <div className="text-base text-gray-400">By Unihosts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="flex-1 drop-shadow-xl rounded-3xl bg-white px-5 py-5 ">
          <div className="flex">
            <div className="w-60 h-60">
              <Image src={img2} alt="" height="250" width="250" className="object-fill "></Image>
            </div>

            <div className="flex flex-col flex-auto w-10 ml-6">
              <div className="text-xl w-5/6 mb-2">Saúde Mental - pensar em ti e no teu equilíbrio emocional durante a universidade</div>
              <div className="w-96">A recente emergência higiénico-sanitária, provocada pelo novo coronavirus, veio virar as nossas vidas de pernas para o ar.</div>

              <div className=" absolute">
                <div className="relative top-48 w-96">
                  <div className="flex flex-row justify-between mt-5 ">
                    <div className="text-base text-gray-400">22 de Janeiro de 2022</div>
                    <div className="text-base text-gray-400">By Unihosts</div>
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
