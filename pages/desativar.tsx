import React, { useState } from "react";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { DesativarProvider, useCurrentStep } from "../context/DesativarProvider";
import DesativarContaForm from "../components/desativar/desativar";
import DesativarContaPoliciesForm from "../components/desativar/policies";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useCurrentUser } from "../context/MainProvider";

const DesativarConta = () => {
  const { t } = useTranslation();
  const currentStep = useCurrentStep();

  return (
    <section className="max-width mt-10 px-5">
      <div className="flex flex-col items-center align-middle lg:flex-row lg:justify-between">
        <div className="text-center text-3xl font-black lg:text-left lg:text-5xl">{t("account:title")}</div>
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
  const profile = useCurrentUser();
  return (
    <>
      {currentStep === 0 && <DesativarContaForm/>}
      {currentStep === 1 && <DesativarContaPoliciesForm profile={profile}/>}
    </>
  );
};

export default DesativarConta;

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
        destination: "/",
        permanent: false,
      },
    };

  const user = session.user;
  return {
    props: {
      user: user,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
}
