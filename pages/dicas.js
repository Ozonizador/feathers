import React from "react";

import DicasConsumoHero from "../components/dicas consumo/DicasConsumoHero/DicasConsumoHero";
import DicasConsumoCards from "../components/dicas consumo/DicasConsumoCards/DicasConsumoCards";

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
