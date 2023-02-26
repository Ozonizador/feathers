import React from "react";
import TestemunhoCard from "../TestemunhoCard/TestemunhoCard";
import { Carousel } from "flowbite-react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Testemunhos } from "../../../models/static";
import { group } from "../../../utils/utils";

const TestemunhosComponent = () => {
  return (
    <section>
      <div className="w-full bg-terciary-300">
        <h6 className="py-8 text-center text-3xl font-black">Testemunhos</h6>
        <div className="hidden h-96 lg:flex">
          <Carousel
            leftControl={<BsFillArrowLeftCircleFill size={32} className="text-5xl text-white drop-shadow-xl" />}
            rightControl={<BsFillArrowRightCircleFill size={32} className="text-5xl text-white drop-shadow-xl" />}
            indicators={true}
          >
            {group(Testemunhos, 3).map((children, index) => {
              return (
                <div key={index} className="flex gap-6 px-24 lg:justify-center">
                  {children.map((testemunho, index) => {
                    return (
                      <div key={index}>
                        <TestemunhoCard
                          testimonial={testemunho.description}
                          img={testemunho.image}
                          name={testemunho.host}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </Carousel>
        </div>

        <div className="flex h-96 lg:hidden">
          <Carousel
            leftControl={
              <BsFillArrowLeftCircleFill size={32} className="hidden text-5xl text-white drop-shadow-xl lg:block" />
            }
            rightControl={
              <BsFillArrowRightCircleFill size={32} className="hidden text-5xl text-white drop-shadow-xl lg:block" />
            }
            indicators={false}
          >
            {Testemunhos.map((testemunho, index) => {
              return (
                <div key={index}>
                  <TestemunhoCard testimonial={testemunho.description} img={testemunho.image} name={testemunho.host} />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestemunhosComponent;
