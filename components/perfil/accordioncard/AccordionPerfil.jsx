import React from "react";
import Image from "next/image";
import { Accordion } from "flowbite-react";
import { Carousel } from "flowbite-react";
import { CgHome } from "react-icons/cg";
import { TbBed } from "react-icons/tb"
{
  /* TODO: mudar o nome disto */
}
function AccordionPerfil() {
  return (

    <div className="mb-20">
      <Accordion alwaysOpen={true}>
        <Accordion.Panel>
          <Accordion.Title>
            <div className="flex items-center align-middle">
              <div className="text-4xl mr-2"><CgHome /></div>
              <h1 className="text-base lg:text-xl font-bold">É senhoria unihosts desde 2022</h1>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <h1 className="text-xl my-12">5 anúncios</h1>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
              <Carousel indicators={false} slide={false}>
                <div className="flex gap-2 lg:gap-4 h-full items-center justify-center bg-gray-200">
                  <article className="bg-destaques-slider1 relative h-32  w-32 rounded-lg lg:h-48  lg:w-48">
                    <p className="bold absolute bottom-14 left-2 text-sm font-bold text-white">Título do Anúncio</p>
                    <p className="bold absolute bottom-3 left-2 text-sm  text-gray-300">Ver mais</p>
                  </article>

                  <article className="bg-destaques-slider1 relative h-32  w-32  rounded-lg lg:h-48  lg:w-48">
                    <p className="bold absolute bottom-14 left-2 text-base font-bold text-white">Título do Anúncio</p>
                    <p className="bold absolute bottom-3 left-2 text-base  text-gray-300">Ver mais</p>
                  </article>

                  <article className="bg-destaques-slider1 relative h-32  w-32 hidden  rounded-lg lg:h-48  lg:w-48 lg:block">
                    <p className="bold absolute bottom-14 left-2 text-base font-bold text-white">Título do Anúncio</p>
                    <p className="bold absolute bottom-3 left-2 text-base  text-gray-300">Ver mais</p>
                  </article>

                  <article className="bg-destaques-slider1 relative h-32  w-32 hidden  rounded-lg lg:h-48  lg:w-48 lg:block">
                    <p className="bold absolute bottom-14 left-2 text-base font-bold text-white">Título do Anúncio</p>
                    <p className="bold absolute bottom-3 left-2 text-base  text-gray-300">Ver mais</p>
                  </article>
                </div>

                <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                  Slide 2
                </div>
              </Carousel>
            </div>
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title>
            <div className="flex items-center align-middle">
              <div className="text-4xl mr-2"><TbBed /></div>
              <h1 className="text-base lg:text-xl font-bold">É estudante unihosts desde 2021</h1>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <h1 className="text-xl my-12">5 anúncios</h1>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
              <Carousel indicators={false} slide={false}>
                <div className="flex gap-2 lg:gap-4 h-full items-center justify-center bg-gray-200">
                  <article className="bg-destaques-slider1 relative h-32  w-32 rounded-lg lg:h-48  lg:w-48">
                    <p className="bold absolute bottom-14 left-2 text-sm font-bold text-white">Título do Anúncio</p>
                    <p className="bold absolute bottom-3 left-2 text-sm  text-gray-300">Ver mais</p>
                  </article>

                  <article className="bg-destaques-slider1 relative h-32  w-32  rounded-lg lg:h-48  lg:w-48">
                    <p className="bold absolute bottom-14 left-2 text-base font-bold text-white">Título do Anúncio</p>
                    <p className="bold absolute bottom-3 left-2 text-base  text-gray-300">Ver mais</p>
                  </article>

                  <article className="bg-destaques-slider1 relative h-32  w-32 hidden  rounded-lg lg:h-48  lg:w-48 lg:block">
                    <p className="bold absolute bottom-14 left-2 text-base font-bold text-white">Título do Anúncio</p>
                    <p className="bold absolute bottom-3 left-2 text-base  text-gray-300">Ver mais</p>
                  </article>

                  <article className="bg-destaques-slider1 relative h-32  w-32 hidden  rounded-lg lg:h-48  lg:w-48 lg:block">
                    <p className="bold absolute bottom-14 left-2 text-base font-bold text-white">Título do Anúncio</p>
                    <p className="bold absolute bottom-3 left-2 text-base  text-gray-300">Ver mais</p>
                  </article>


                  {/* <Image src="/images/crousel1.png" alt="" height={164} width={164} /> */}
                </div>


                <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                  Slide 2
                </div>
              </Carousel>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>


  );
}

export default AccordionPerfil;
