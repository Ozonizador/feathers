import React from "react";
import HomeSection2Cards from "../homeSection2Cards/HomeSection2Cards";

export default function HomeSection2() {
  return (
    <section>
      <div className="mx-auto flex flex-col justify-between gap-5 py-20 lg:flex-row lg:gap-2">
        <HomeSection2Cards
          img="/images/homeSection new-1.png"
          heading="Seguro e Verificado"
          text="Valorizamos e protegemos a integridade das listas"
        />
        <HomeSection2Cards
          img="/images/homeSection new-2.png"
          heading="Proteção dos inquilinos"
          text="Tens 24h após a entrada para confirmar se a casa que reservaste corresponde."
        />
        <HomeSection2Cards
          img="/images/homeSection new-3.png"
          heading="Procura rápida e inteligente"
          text="De forma simplificada encontra o teu espaço ideal."
        />
      </div>
    </section>
  );
}
