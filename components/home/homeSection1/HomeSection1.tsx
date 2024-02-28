import React from "react";
import Image from "next/image";
import SearchInputField from "../../search/SearchInputField";
import { Trans, useTranslation } from "next-i18next";

const HomeSection1 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <div className="flex justify-center bg-[url('/images/furniture5.jpg')] bg-cover px-1 py-32 max-sm:py-16  min-w-[1660px]:py-40">
        <div className="lg:px-15 flex flex-col  px-4 align-middle md:container">
          <h1 className="mb-5 ml-2 text-4xl font-bold leading-snug  text-white lg:mx-0 lg:mb-0 lg:text-5xl">
            {t("index:yours")}{" "}
            <Image
              className="display: top-40; relative left-0 inline-block"
              src="/images/icon-home.svg"
              alt=""
              height={64}
              width={64}
            />{" "}
            <Trans i18nKey="index:home_title" components={{ 1: <br className="hidden lg:block " /> }} />
            <span className="top-5 lg:relative">click!</span>
          </h1>
          <div className="flex flex-col gap-2 lg:flex-row">
            <SearchInputField />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection1;
