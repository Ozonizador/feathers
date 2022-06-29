import React from "react";
import HomeSection2Cards from "../homeSection2Cards/HomeSection2Cards";

export default function HomeSection2() {
  return (
    <section>
      <div className="mx-auto flex flex-col justify-between px-32 py-20 lg:flex-row">
        <HomeSection2Cards
          img="/images/homeSection2-1.svg"
          heading="Seguro e Verificado"
          text="Valorizamos e protegemos a integridade das listas"
        />
        <HomeSection2Cards
          img="/images/homeSection2-2.svg"
          heading="Proteção dos inquilinos"
          text="Tens 24h após a entrada para confirmar se a casa que reservaste corresponde."
        />
        <HomeSection2Cards
          img="/images/homeSection2-3.svg"
          heading="Procura rápida e inteligente"
          text="De forma simplificada encontra o teu espaço ideal."
        />
      </div>
    </section>
  );
}
