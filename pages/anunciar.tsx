import React from "react";

import FormPasso1 from "../components/anunciar/FormPasso1";
import FormPasso2 from "../components/anunciar/FormPasso2";
import FormPasso3 from "../components/anunciar/FormPasso3";
import FormPasso4 from "../components/anunciar/FormPasso4";
import FormPasso5 from "../components/anunciar/FormPasso5";
import FormPasso6 from "../components/anunciar/FormPasso6";
import FormPasso7 from "../components/anunciar/FormPasso7";
import FormPasso8 from "../components/anunciar/FormPasso8";
import FormPasso9 from "../components/anunciar/FormPasso9";
import FormPasso10 from "../components/anunciar/FormPasso10";

import Stepper from "../components/anunciar/Stepper";
import { AnunciarProvider, useCurrentStep } from "../context/AnunciarProvider";
import { AdvertisementController } from "../context/AdvertisementController";

export default function Anunciar() {
  return (
    <>
      <AnunciarProvider>
        <AdvertisementController>
          <div className="container mx-auto my-20 rounded-2xl border border-terciary-700 py-20">
            <h1 className="text-center  text-6xl font-bold leading-snug ">
              Anunciar a sua propriedade é rápido e fácil!
            </h1>
            <Stepper />
            <div>
              <ZonaFormulario></ZonaFormulario>
            </div>
          </div>
        </AdvertisementController>
      </AnunciarProvider>
    </>
  );
}

const ZonaFormulario = () => {
  const currentStep = useCurrentStep();
  return (
    <>
      {currentStep === 0 && <FormPasso1 />}
      {currentStep === 1 && <FormPasso2 />}
      {currentStep === 2 && <FormPasso3 />}
      {currentStep === 3 && <FormPasso4 />}
      {currentStep === 4 && <FormPasso5 />}
      {currentStep === 5 && <FormPasso6 />}
      {currentStep === 6 && <FormPasso7 />}
      {currentStep === 7 && <FormPasso8 />}
      {currentStep === 8 && <FormPasso9 />}
      {currentStep === 9 && <FormPasso10 />}
    </>
  );
};
