import React from "react";
import Image from "next/image";

import headerImage from "../public/images/sobre_nos.jpg";
import ownerImage from "../public/images/sobre_nos_owner.jpg";
import missionImage from "../public/images/sobre_nos_mission.jpg";
import valoresImage from "../public/images/sobre_nos_valores.jpg";

const AboutUs = () => {
  return (
    <>
      <div className="w-full">
        <Image layout="intrinsic" src={headerImage} alt="Sobre Nos"></Image>
      </div>
      <div className="mt-10 px-8 lg:px-60">
        <h4 className="mb-3 text-4xl font-bold">Sobre Nós</h4>
        <h6>Uma plataforma que facilita o aluguer à velocidade do agora!</h6>
        <p>
          Fomos estudantes que ainda hoje relembram memórias, pessoas e experiências que marcaram o
          nosso percurso. Somos gratos por esses momentos. O nosso propósito serve para inspirar e
          contribuir para que essa jornada académica seja rotulada pelo alojamento ideal.
        </p>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2">
          <div className="rounded-lg p-5">
            <Image layout="intrinsic" src={ownerImage} alt="Sobre Nos"></Image>
          </div>
          <div>
            <h6 className="text-3xl font-bold">A nossa história</h6>
            <p>
              A Unihosts nasce em Setembro de 2020, em plena pandemia, no quarto do João, no Baleal.
              Um dos grandes desafios que na altura existia era encontrar de forma simples um quarto
              na Universidade. Através das Associações de estudantes locais percebemos que existia
              uma necessidade de descomplicar este processo. Depois de alguns testes resolvemos
              fazer acontecer. Contamos contigo para divulgar e exponenciar este movimento!
              OBRIGADO!!
            </p>
          </div>
        </div>
        <div className="flex flex-1">
          <div>
            <h6 className="text-3xl font-bold">Missão</h6>
            <p>
              Queremos que o estudante encontre o seu quarto ideal de forma prática, eficaz e
              segura! Pretendemos clarificar a oferta digital de alojamentos disponíveis de forma a
              consolidar uma harmonia funcional entre os proprietários e os estudantes.
            </p>
          </div>
          <div className="rounded-lg p-5">
            <Image layout="intrinsic" src={missionImage} alt="Sobre Nos"></Image>
          </div>
        </div>
        <div className="flex flex-1">
          <div>
            <Image layout="intrinsic" src={valoresImage} alt="Sobre Nos"></Image>
          </div>
          <div className="rounded-lg p-5">
            <h6 className="text-3xl font-bold">Valores</h6>
            <p>
              Acreditamos que o alojamento e todos os intervenientes do capítulo universitário são
              marcantes nas nossas vidas. Em comunidade queremos explorar continuamente novas
              ideias, processos e soluções. Valorizamos a simplicidade, transparência e compromisso
              de forma a aproximar as pessoas.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
