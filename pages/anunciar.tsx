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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Anunciar() {
  const { t } = useTranslation();
  return (
    <div className="max-width flex justify-center px-5">
      <AnunciarProvider>
        <AdvertisementController>
          <div className="my-5 w-full rounded-xl border border-terciary-700 px-2 pb-4 pt-8 lg:my-20 lg:w-3/4">
            <h1 className="text-center text-3xl font-black leading-snug lg:text-4xl">
              {t("advertisements:add_advert.title_start")}
            </h1>
            <Stepper />
            <div className="pt-4">
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
  const locale = ctx.locale;
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
