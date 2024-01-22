import React from "react";

import FuncionaSection3Card from "./FuncionaSection3Card";
import { useTranslation } from "next-i18next";

const FuncionaUniPackages = () => {
  const { t } = useTranslation("funciona");
  return (
    <section className="mx-5 lg:mx-0">
      <div className="bg-terciary-300 pb-10 pt-10">
        <div className="container mx-auto mt-14 text-center">
          <p className="mb-10 text-primary-500 underline underline-offset-1">{t("uni_packages_title")}</p>
          <h1 className="text-5xl font-bold lg:text-6xl">{t("uni_packages")}</h1>

          <div className="mb-5 mt-16 grid grid-cols-1 flex-row gap-10 lg:grid-cols-3">
            <FuncionaSection3Card
              img="/images/image1.png"
              heading={t("uni_packages_advantage_title_1")}
              text={t("uni_packages_advantage_description_1")}
            />

            <FuncionaSection3Card
              img="/images/image2.png"
              heading={t("uni_packages_advantage_title_2")}
              text={t("uni_packages_advantage_description_2")}
            />

            <FuncionaSection3Card
              img="/images/image3.png"
              heading={t("uni_packages_advantage_title_3")}
              text={t("uni_packages_advantage_description_3")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuncionaUniPackages;
