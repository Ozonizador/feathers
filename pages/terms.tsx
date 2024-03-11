import React, { useState } from "react";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Terms = () => {
  const { t } = useTranslation(["contacts", "common"]);

  return (
    <section className="max-width mt-36 px-5">
      <div className="flex flex-col items-center align-middle lg:flex-row lg:justify-between">
        <div className="text-center text-3xl font-black lg:text-left lg:text-5xl">{t("terms:title")}</div>
      </div>
      <div className="mx-auto py-6">
        <section className="rounded-md border border-gray-200 p-4">
          <div className="mb-2 text-justify">{t("terms:number_1")}</div>
          <div className="mb-2 text-justify">{t("terms:number_2")}</div>
          <div className="mb-2 text-justify">{t("terms:number_3")}</div>
          <div className="mb-2 text-justify">
            {t("terms:number_4:title")}
            <p className="ml-4 text-justify">{t("terms:number_4:part_1")}</p>
            <p className="ml-4 text-justify">{t("terms:number_4:part_2")}</p>
            <p className="ml-4 text-justify">{t("terms:number_4:part_3")}</p>
          </div>
          <div className="mb-2 text-justify">{t("terms:number_5")}</div>
          <div className="mb-2 text-justify">
            {t("terms:number_6:title")}
            <p className="ml-4 text-justify">{t("terms:number_6:part_1")}</p>
            <p className="ml-4 text-justify">{t("terms:number_6:part_2")}</p>
            <p className="ml-4 text-justify">{t("terms:number_6:part_3")}</p>
          </div>
          <div className="mb-2 text-justify">{t("terms:number_7")}</div>
          <div className="mb-2 text-justify">{t("terms:number_8")}</div>
          <div className="mb-2 text-justify">{t("terms:number_9")}</div>
          <div className="mb-2 text-justify">{t("terms:number_10")}</div>
          <div className="mb-2 text-justify">{t("terms:number_11")}</div>
          <div className="mb-2 text-justify">{t("terms:number_12")}</div>
          <div className="mb-2 text-justify">{t("terms:number_13")}</div>
          <div className="mb-2 text-justify">{t("terms:number_14")}</div>
          <div className="mb-2 text-justify">{t("terms:number_15")}</div>
          <div className="mb-2 text-justify">{t("terms:number_16")}</div>
          <div className="mb-2 text-justify">{t("terms:number_17")}</div>
          <div className="mb-2 text-justify">{t("terms:number_18")}</div>
          <div className="mb-2 text-justify">{t("terms:number_19")}</div>
          <div className="mb-2 text-justify">{t("terms:number_20")}</div>
          <div className="mb-2 text-justify">{t("terms:number_21")}</div>
          <div className="mb-2 text-justify">{t("terms:number_22")}</div>
          <div className="mb-2 text-justify">{t("terms:number_23")}</div>
          <div className="mb-2 text-justify">{t("terms:number_24")}</div>
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
