import React from "react";
import { Accordion } from "flowbite-react";
import { Carousel } from "flowbite-react";
import { GiPersonInBed } from "react-icons/gi";

// this is repeated to accordionPeril */
const AccordionEstudante = () => {
  return (
    <div>
      <Accordion alwaysOpen={true}>
        <Accordion.Panel>
          <Accordion.Title>
            <div className="flex items-center align-middle">
              <div className="mr-2 text-4xl">
                <GiPersonInBed />
              </div>
              <h1 className="text-xl font-bold"> É senhoria unihosts desde 2022</h1>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <h1 className="my-12 text-xl">5 anúncios</h1>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
              <Carousel indicators={false} slide={false}>
                <div className="flex h-full items-center justify-center gap-4 bg-gray-200">
                  <article className=" relative h-56  w-40  rounded-lg lg:h-48  lg:w-48">
                    <p className="bold absolute bottom-14 left-2 text-base font-bold text-white">Título do Anúncio</p>
                    <p className="bold absolute bottom-3 left-2 text-base  text-gray-300">Ver mais</p>
                  </article>

                  <article className=" relative h-56  w-40  rounded-lg lg:h-48  lg:w-48">
                    <p className="bold absolute bottom-14 left-2 text-base font-bold text-white">Título do Anúncio</p>
                    <p className="bold absolute bottom-3 left-2 text-base  text-gray-300">Ver mais</p>
                  </article>

                  <article className=" relative h-56  w-40  rounded-lg lg:h-48  lg:w-48">
                    <p className="bold absolute bottom-14 left-2 text-base font-bold text-white">Título do Anúncio</p>
                    <p className="bold absolute bottom-3 left-2 text-base  text-gray-300">Ver mais</p>
                  </article>

                  <article className=" relative h-56  w-40  rounded-lg lg:h-48  lg:w-48">
                    <p className="bold absolute bottom-14 left-2 text-base font-bold text-white">Título do Anúncio</p>
                    <p className="bold absolute bottom-3 left-2 text-base  text-gray-300">Ver mais</p>
                  </article>

                  {/* <Image src="/images/crousel1.png" alt="" height={164} width={164} /> */}
                </div>
                <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                  Slide 2
                </div>
                <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                  Slide 3
                </div>
              </Carousel>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default AccordionEstudante;
