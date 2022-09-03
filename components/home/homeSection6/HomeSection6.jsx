import React from "react";
import HomeSection6Cards from "../homeSection6Cards/HomeSection6Cards";
import { Carousel } from "flowbite-react";
import { BsFillArrowRightCircleFill } from "react-icons/bs"
import { BsFillArrowLeftCircleFill } from "react-icons/bs"

// ATENÇÃO - FALTA carousel

export default function HomeSection6() {
  return (
    <section>

      <div className="w-full bg-terciary-300">
        <div className=" mx-auto pt-20 pb-6 text-center">
          <h2 className="mb-20 text-5xl font-bold">Testemunhos</h2>
          {/* <div className="grid gap-8 lg:grid-cols-3">
            <HomeSection6Cards
              testimonial="Com a UniHosts foi tudo mais fácil! Sempre tive alguma dificuldade para encontrar inquilinos para o respetivo Ano Lectivo, contudo com este serviço digital especializado consigo de forma eficiente e eficaz encher a minha casa!"
              img="/images/sec6-person1.jpg"
              name="John Doe"
              desc="Proprietário UniHosts"
            />
            <HomeSection6Cards
              testimonial="Enquanto Senhorio foi muito prático para comunicar o meu alojamento! Intuitivo e a funcionalidade de saber quem vai ficar na minha casa ajuda muito! A política de proteção de proprietários é algo que me faz querer repetir a experiência sem medo."
              img="/images/sec6-person2.jpg"
              name="John Doe"
              desc="Proprietário UniHosts"
            />
            <HomeSection6Cards
              testimonial="Tinha o objetivo de apenas alugar os quartos que tinha disponíveis e foi muito simples. Consegui alugar mesmo a meio do ano letivo e correu tudo muito bem! Recomendo a novos proprietários que procuram encontrar estudantes por uma fee bem razoável!"
              img="/images/sec6-person3.jpg"
              name="John Doe"
              desc="Proprietário UniHosts"
            />
          </div> */}
        </div>


        <div className="h-96 flex">
          <Carousel
            leftControl=<BsFillArrowLeftCircleFill className="text-5xl text-white drop-shadow-xl" />
          rightControl=<BsFillArrowRightCircleFill className="text-5xl text-white drop-shadow-xl" />
          >
          <div className="flex gap-6 w-5/6 lg:justify-center">
            <HomeSection6Cards
              testimonial="Com a UniHosts foi tudo mais fácil! Sempre tive alguma dificuldade para encontrar inquilinos para o respetivo Ano Lectivo, contudo com este serviço digital especializado consigo de forma eficiente e eficaz encher a minha casa!"
              img="/images/sec6-person1.jpg"
              name="John Doe"
              desc="Proprietário UniHosts"

            />
            <HomeSection6Cards
              testimonial="Enquanto Senhorio foi muito prático para comunicar o meu alojamento! Intuitivo e a funcionalidade de saber quem vai ficar na minha casa ajuda muito! A política de proteção de proprietários é algo que me faz querer repetir a experiência sem medo."
              img="/images/sec6-person2.jpg"
              name="John Doe"
              desc="Proprietário UniHosts"
            />
            <HomeSection6Cards
              testimonial="Tinha o objetivo de apenas alugar os quartos que tinha disponíveis e foi muito simples. Consegui alugar mesmo a meio do ano letivo e correu tudo muito bem! Recomendo a novos proprietários que procuram encontrar estudantes por uma fee bem razoável!"
              img="/images/sec6-person3.jpg"
              name="John Doe"
              desc="Proprietário UniHosts"
            />
          </div>


        </Carousel>
      </div>
    </div>
    </section >
  );
}
