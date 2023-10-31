import React, { useState } from "react";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Terms = () => {
  const { t } = useTranslation(["contacts", "common"]);

  return (
    <section className="max-width mt-36 px-5">
      <div className="flex flex-col items-center align-middle lg:flex-row lg:justify-between">
        <div className="text-center text-3xl font-black lg:text-left lg:text-5xl">{t("policies:title")}</div>
      </div>
      <div className="mt-4 text-md text-center font-black lg:text-left lg:text-md">{t("policies:description_title")}</div>
      <div className="mb-4 text-md text-center font-black lg:text-left lg:text-md">{t("policies:description_subtitle")}</div>
      <div className="mx-auto py-6">
        <section className="rounded-md border border-gray-200 p-4">
          <div className="mb-2">{t("policies:point_A")}</div>
          <div className="mb-2">{t("policies:point_B")}</div>
          <div className="mb-2">{t("policies:point_C")}</div>
          <div className="mb-2">{t("policies:point_D")}</div>
          <div className="mb-2">{t("policies:point_E")}</div>
        </section>
      </div>
    </section>
  );
};

export default Terms;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
}
