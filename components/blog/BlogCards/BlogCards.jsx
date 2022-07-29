
import Image from "next/image"
import img1 from "../../../public/images/cardpic1.png"
import img2 from "../../../public/images/cardpic2.png"


export default function BlogCards() {
  return (

    <section className="container mx-auto pt-20 pb-5 ">
      <div className="flex flex-col lg:flex-row justify-between gap-14">


        {/* CARD 1 */}
        {/* <div className="flex-1 drop-shadow-xl rounded-3xl bg-white px-3 pt-5 lg:pb-20 ">
          <div className="flex flex-col lg:flex-row">
            <div className="w-40 h-40">
              <Image src={img1} alt="" height="250" width="250" className="object-fill "></Image>
            </div>

            <div className="flex flex-col flex-auto w-full lg:w-10 ml-6">
              <div className="text-xl w-10/12  lg:w-5/6 mb-2">5 formas de melhorar o consumo energético da sua casa</div>
              <div className="w-5/6 lg:w-full text-sm">É certo que Portugal tem melhorado muito no que diz respeito ao consumo energético das suas casas, devido à implementação de várias políticas que visam a eficiência nesse campo. No entanto, ainda muito há para fazer.</div>


              <div className="w-full">
                <div className="flex flex-row justify-between mt-5 gap-8">
                  <div className="text-base text-gray-400">22 de Janeiro de 2022</div>
                  <div className="text-base text-gray-400 mb-20">By Unihosts</div>
                </div>
              </div>

            </div>
          </div>
        </div> */}


        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white drop-shadow-xl rounded-3xl p-5 flex-1">
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


                <div className="flex flex-col ml-3 w-full">
                  <div className="text-xl  mb-2 mt-3 lg:mt-0">5 formas de melhorar o consumo energético da sua casa</div>
                  <div className="text-sm">É certo que Portugal tem melhorado muito no que diz respeito ao consumo energético das suas casas, devido à implementação de várias políticas que visam a eficiência nesse campo. No entanto, ainda muito há para fazer.</div>

                  <div className="flex flex-row justify-between mt-5 gap-0 w-11/12 lg:gap-8 lg:w-full">
                    <div className=" text-gray-400 text-sm">22 de Janeiro de 2022</div>
                    <div className="text-sm text-gray-400 ">By Unihosts</div>
                  </div>
                </div>

              </div>

            </div>
          </div>


          <div className="flex-1">
            <div className="bg-white drop-shadow-xl rounded-3xl p-5 flex-1">
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


                <div className="flex flex-col ml-3 w-full">
                  <div className="text-xl  mb-2 mt-3 lg:mt-0">Saúde Mental - pensar em ti e no teu equilíbrio emocional durante a universidade</div>
                  <div className="text-sm">A recente emergência higiénico-sanitária, provocada pelo novo coronavirus, veio virar as nossas vidas de pernas para o ar.</div>

                  <div className="flex flex-row justify-between mt-5 gap-0 w-11/12 lg:gap-8 lg:w-full">
                    <div className=" text-gray-400 text-sm">22 de Janeiro de 2022</div>
                    <div className="text-sm text-gray-400 ">By Unihosts</div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
























        {/* CARD 2 */}

        {/* <div className="flex-1 drop-shadow-xl rounded-3xl bg-white px-3 pt-5 pb-20 ">
          <div className="flex flex-col lg:flex-row">
            <div className="w-40 h-40">
              <Image src={img1} alt="" height="250" width="250" className="object-fill "></Image>
            </div>

            <div className="flex flex-col flex-auto w-full lg:w-10 ml-6">
              <div className="text-xl w-10/12  lg:w-5/6 mb-2">Saúde Mental - pensar em ti e no teu equilíbrio emocional durante a universidade</div>
              <div className="w-5/6 mb-20 lg:w-full text-sm">A recente emergência higiénico-sanitária, provocada pelo novo coronavirus, veio virar as nossas vidas de pernas para o ar.</div>


              <div className="w-full">
                <div className="flex flex-row justify-between mt-5 gap-8">
                  <div className="text-base text-gray-400">22 de Janeiro de 2022</div>
                  <div className="text-base text-gray-400">By Unihosts</div>
                </div>
              </div>

            </div>
          </div>
        </div> */}







      </div>
    </section>

  );
}
