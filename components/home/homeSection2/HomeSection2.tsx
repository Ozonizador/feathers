import React from "react";
import HomeSection2Cards from "../homeSection2Cards/HomeSection2Cards";
import { useTranslation } from "next-i18next";

export default function HomeSection2() {
  const { t } = useTranslation();
  return (
    <section className="max-width">
      <div className="mx-auto flex w-full flex-col gap-8 py-20 lg:flex-row lg:gap-4 xl:w-10/12">
        <HomeSection2Cards
          img="/images/homeSection new-1.png"
          heading={t("index:section.values.first_title")}
          text={t("index:section.values.first_description")}
        />
        <HomeSection2Cards
          img="/images/homeSection new-2.png"
          heading={t("index:section.values.second_title")}
          text={t("index:section.values.second_description")}
        />
        <HomeSection2Cards
          img="/images/homeSection new-3.png"
          heading={t("index:section.values.third_title")}
          text={t("index:section.values.third_description")}
        />
      </div>
    </section>
  );
}
