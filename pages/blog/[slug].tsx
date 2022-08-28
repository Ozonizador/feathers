import React from "react";
import DicasConsumoCards from "../../components/dicas consumo/DicasConsumoCards/DicasConsumoCards";
import DicasConsumoHero from "../../components/dicas consumo/DicasConsumoHero/DicasConsumoHero";

const Dicas = () => {
  return (
    <>
      <div className="flex flex-1 justify-start lg:justify-center">
        <DicasConsumoHero />
      </div>
      <DicasConsumoCards />
    </>
  );
};

export default Dicas;

// meter ficheiros do blog
