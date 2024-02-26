import React, { useState } from "react";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Policies = () => {
  const { t } = useTranslation(["contacts", "common"]);

  const CustomStrong = ({ children }: any) => (
    <strong className="text-lg font-bold mb-4">{children}</strong>
  );

  return (
    <section className="max-width mt-36 px-5">
      <div className="flex flex-col items-center align-middle lg:flex-row lg:justify-between">
        <div className="text-center text-3xl font-black lg:text-left lg:text-5xl">{t("policies:title")}</div>
      </div>
      <div className="text-md lg:text-md mt-4 text-center font-black lg:text-left">
        {t("policies:description_title")}
      </div>
      <div className="text-md lg:text-md mb-4 text-center font-black lg:text-left">
        {t("policies:description_subtitle")}
      </div>
      <div className="mx-auto py-6">
        <section className="rounded-md border border-gray-200 p-4">
          <div className="mb-2">
            <ReactMarkdown components={{strong: CustomStrong}}>{t("policies:point_A")}</ReactMarkdown>
          </div>
          <div className="mb-2">
            <ReactMarkdown components={{strong: CustomStrong}}>{t("policies:point_B")}</ReactMarkdown>
          </div>
          <div className="mb-2">
            <ReactMarkdown components={{strong: CustomStrong}}>{t("policies:point_C")}</ReactMarkdown>
          </div>
          <div className="mb-2">
            <ReactMarkdown components={{strong: CustomStrong}}>{t("policies:point_D")}</ReactMarkdown>
          </div>
          <div className="mb-2">
            <ReactMarkdown components={{strong: CustomStrong}}>{t("policies:point_E")}</ReactMarkdown>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Policies;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
}
