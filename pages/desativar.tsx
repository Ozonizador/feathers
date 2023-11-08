import React, { useState } from "react";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { DesativarProvider, useCurrentStep } from "../context/DesativarProvider";
import DesativarContaForm from "../components/desativar/desativar";
import DesativarContaPoliciesForm from "../components/desativar/policies";

const DesativarConta = () => {
  const { t } = useTranslation();
  const currentStep = useCurrentStep();

  return (
    <section className="max-width mt-10 px-5">
      <div className="flex flex-col items-center align-middle lg:flex-row lg:justify-between">
        <div className="text-center text-3xl font-black lg:text-left lg:text-5xl">{currentStep == 0 ? t("account:subtitle") : t("account:title")}</div>
      </div>
      <div className="text-md lg:text-md mt-4 text-center font-black lg:text-left"></div>
      <DesativarProvider>
          <ZonaFormulario></ZonaFormulario>
      </DesativarProvider>
    </section>
  );
};
const ZonaFormulario = () => {
  const currentStep = useCurrentStep();
  return (
    <>
      {currentStep === 0 && <DesativarContaForm/>}
      {currentStep === 1 && <DesativarContaPoliciesForm/>}
    </>
  );
};

export default DesativarConta;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
}
