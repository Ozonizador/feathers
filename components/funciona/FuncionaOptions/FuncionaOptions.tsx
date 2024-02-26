import React from "react";
import { optionsCard1 } from "./Section4.config";
import { optionsCard2 } from "./FuncionaCard2.config";
import Link from "next/link";

import Image from "next/image";
import { useTranslation } from "next-i18next";

const FuncionaOptions = () => {
  const { t } = useTranslation();
  return (
    <section className="mx-5 lg:mx-0">
      <div className="max-width mx-5 my-20 flex flex-col justify-center gap-5 lg:flex-row lg:gap-12">
        <div className="flex flex-col rounded-2xl bg-white py-5 px-10 drop-shadow-2xl lg:w-[30%]">
          <div>
            <h1 className="mb-9 mt-4 text-center text-2xl font-bold">{t("funciona:type_management")}</h1>
            {optionsCard1.map((option, index) => {
              return (
                <div key={index} className="my-5 flex flex-row gap-1">
                  <div className="mb-auto mt-1 flex w-1/12">
                    <Image className="object-scale-down" src="/images/tick.png" alt="" height="25" width="25"></Image>
                  </div>
                  <p className="my-auto w-9/12 text-md lg:text-md">{t(option.text)}</p>
                </div>
              );
            })}
          </div>
          <hr className="my-6" />
          <div className="mt-auto">
            <h1 className="mb-8 text-center text-xl font-bold">{t("funciona:price_under_review")}</h1>

            <div className="flex flex-1 justify-center">
              <Link href="/contactos" className="w-full rounded-md bg-primary-500 px-7 py-2 text-center text-white">
                {t("index:know_more")}
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl bg-white p-5 drop-shadow-2xl lg:w-[30%]">
          <div>
            <h1 className="mb-9 mt-4 text-center text-2xl font-bold">{t("funciona:type_management_premium")}</h1>
            <div className="flex flex-1 flex-col items-center align-middle">
              <h2 className="text-xl font-bold">{t("funciona:type_management")}</h2>
              <div className="text-xl font-bold">+</div>
            </div>
            {optionsCard2.map((option, index) => {
              return (
                <div key={index} className="my-5 flex flex-row gap-1 px-3">
                  <div className="mb-auto mt-1 flex w-1/12">
                    <Image className="object-scale-down" src="/images/tick.png" alt="" height="25" width="25"></Image>
                  </div>
                  <p className="my-auto w-11/12 break-words text-md lg:text-md">{t(option.text)}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-auto">
            <hr className="my-6" />
            <h1 className="mb-8 text-center text-xl font-bold">{t("funciona:price_under_review")}</h1>

            <div className="flex flex-1 justify-center">
              <Link href="/contactos" className="w-full rounded-md bg-primary-500 px-7 py-2 text-center text-white">
                {t("index:know_more")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuncionaOptions;
