import React from "react";
import TestemunhoCard from "../TestemunhoCard/TestemunhoCard";
import { Carousel } from "flowbite-react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Testemunhos } from "../../../models/static";

const group = (items, n) =>
  items.reduce((acc, x, i) => {
    const idx = Math.floor(i / n);
    acc[idx] = [...(acc[idx] || []), x];
    return acc;
  }, []);

export default function HomeSection6() {
  return (
    <section>
      <div className="w-full bg-terciary-300">
        <div className="hidden h-96 lg:flex">
          <Carousel
            leftControl={<BsFillArrowLeftCircleFill className="text-5xl text-white drop-shadow-xl" />}
            rightControl={<BsFillArrowRightCircleFill className="text-5xl text-white drop-shadow-xl" />}
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
                          desc={testemunho.job}
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
            leftControl={<BsFillArrowLeftCircleFill className="hidden text-5xl text-white drop-shadow-xl lg:block" />}
            rightControl={<BsFillArrowRightCircleFill className="hidden text-5xl text-white drop-shadow-xl lg:block" />}
          >
            {Testemunhos.map((testemunho) => {
              return (
                <>
                  <TestemunhoCard
                    testimonial={testemunho.description}
                    img={testemunho.image}
                    name={testemunho.host}
                    desc={testemunho.job}
                  />
                </>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
