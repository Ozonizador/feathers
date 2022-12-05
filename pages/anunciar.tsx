import React from "react";

import FormPasso0 from "../components/anunciar/FormPasso0";
import FormPasso1 from "../components/anunciar/FormPasso1";
import FormPasso2 from "../components/anunciar/FormPasso2";
import FormAnunciarPhotos from "../components/anunciar/FormAnunciarPhotos";
import FormPasso4 from "../components/anunciar/FormPasso4";
import FormPasso5 from "../components/anunciar/FormPasso5";
import FormPasso6 from "../components/anunciar/FormPasso6";
import FormPasso7 from "../components/anunciar/FormPasso7";
import FormPasso8 from "../components/anunciar/FormPasso8";

import Stepper from "../components/anunciar/Stepper";
import { AnunciarProvider, useCurrentStep } from "../context/AnunciarProvider";
import { AdvertisementController } from "../context/AdvertisementController";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

export default function Anunciar() {
  return (
    <>
      <AnunciarProvider>
        <AdvertisementController>
          <div className="mx-auto my-20  w-11/12 rounded-2xl border border-terciary-700 py-6 px-6  lg:container lg:my-20 lg:w-full lg:px-10 ">
            <h1 className="text-center text-2xl  font-bold leading-snug lg:text-6xl">
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
      {currentStep === 0 && <FormPasso0 />}
      {currentStep === 1 && <FormPasso1 />}
      {currentStep === 2 && <FormPasso2 />}
      {currentStep === 3 && <FormAnunciarPhotos />}
      {currentStep === 4 && <FormPasso4 />}
      {currentStep === 5 && <FormPasso5 />}
      {currentStep === 6 && <FormPasso6 />}
      {currentStep === 7 && <FormPasso7 />}
      {currentStep === 8 && <FormPasso8 />}
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
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
