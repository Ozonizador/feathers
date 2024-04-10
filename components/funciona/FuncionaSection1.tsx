import React from "react";
import { Trans, useTranslation } from "next-i18next";

export default function FuncionaSection1() {
  const { t } = useTranslation("funciona");
  return (
    <section>
      <div className="container-fluid flex justify-center   bg-[url('/images/back.png')] bg-cover py-24 lg:py-52 ">
        <div className="md:containerflex-row flex flex-col gap-10 px-5 text-center align-middle">
          <h1 className="text-6xl font-black text-white">{t("title")}</h1>
          <p className="text-xl text-white">
            <Trans>
              {t("description_first_phrase")}
              
              {` ${t("description_second_phrase")}`}
            </Trans>
          </p>
        </div>
      </div>
    </section>
  );
}
