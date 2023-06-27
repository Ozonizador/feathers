import React from "react";

import FormInicio from "../components/anunciar/FormInicio";
import FormCapacidade from "../components/anunciar/FormCapacidade";
import FormSobreCasa from "../components/anunciar/FormSobreCasa";
import FormAnunciarPhotos from "../components/anunciar/FormAnunciarPhotos";
import FormHouseRules from "../components/anunciar/FormHouseRules";
import FormAboutHouse from "../components/anunciar/FormAboutHouse";
import FormPrices from "../components/anunciar/FormPrices";
import FormTipoHost from "../components/anunciar/FormTipoHost";
import FormTermos from "../components/anunciar/FormTermos";

import Stepper from "../components/anunciar/Stepper";
import { AnunciarProvider, useCurrentStep } from "../context/AnunciarProvider";
import { AdvertisementController } from "../context/AdvertisementController";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

export default function Anunciar() {
  return (
    <div className="max-width flex justify-center px-5">
      <AnunciarProvider>
        <AdvertisementController>
          <div className="my-5 rounded-xl border border-terciary-700 px-2 pt-8 lg:my-20 lg:w-3/4 ">
            <h1 className="text-center text-2xl font-black leading-snug lg:text-4xl">
              Anunciar a sua propriedade é rápido e fácil!
            </h1>
            <Stepper />
            <div>
              <ZonaFormulario></ZonaFormulario>
            </div>
          </div>
        </AdvertisementController>
      </AnunciarProvider>
    </div>
  );
}

const ZonaFormulario = () => {
  const currentStep = useCurrentStep();
  return (
    <>
      {currentStep === 0 && <FormInicio />}
      {currentStep === 1 && <FormCapacidade />}
      {currentStep === 2 && <FormSobreCasa />}
      {currentStep === 3 && <FormAnunciarPhotos />}
      {currentStep === 4 && <FormHouseRules />}
      {currentStep === 5 && <FormAboutHouse />}
      {currentStep === 6 && <FormPrices />}
      {currentStep === 7 && <FormTipoHost />}
      {currentStep === 8 && <FormTermos />}
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
