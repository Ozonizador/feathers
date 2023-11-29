import React from "react";
import TestemunhoCard from "../TestemunhoCard/TestemunhoCard";
import { Carousel } from "flowbite-react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

import { IoArrowBackOutline } from "react-icons/io5";

import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { TestemunhoInfo, Testemunhos } from "../../../models/static";
import { group } from "../../../utils/utils";
import { useTranslation } from "next-i18next";

const TestemunhosComponent = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-terciary-300">
      <div className="max-width">
        <div className="w-full">
          <h6 className="py-8 text-center text-3xl font-black">{t("index:section.testemonials.title")}</h6>
          <div className="testimonial-block hidden h-96 lg:flex">
            <Carousel
              leftControl={<BsArrowLeft className="h-[20px] w-[20px]" />}
              rightControl={<BsArrowRight className="h-[20px] w-[20px]" />}
              indicators={true}
            >
              {group(Testemunhos, 3).map((children: TestemunhoInfo[], index: number) => {
                return (
                  <div key={index} className="flex gap-6 px-6 lg:justify-center">
                    {children.map((testemunho: TestemunhoInfo, index: number) => {
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
              indicators={true}
            >
              {Testemunhos.map((testemunho, index) => {
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
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestemunhosComponent;
