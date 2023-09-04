import React from "react";

import Link from "next/link";
import FuncionaSection2Card from "./FuncionaSection2Card";
import { ANUNCIAR_PROP_URL } from "../../../models/paths";
import { useTranslation } from "next-i18next";

const FuncionaSection2 = () => {
  const { t } = useTranslation("funciona");
  return (
    <section className="max-width my-20">
      <div className="container mx-auto flex flex-row justify-between  ">
        <FuncionaSection2Card
          img="/images/img1.png"
          icon="/icons/1.png"
          heading={t("step_title_one")}
          text={t("step_description_1")}
        />
      </div>

      <div className="container mx-auto flex flex-row  justify-between  ">
        <FuncionaSection2Card
          img="/images/22.png"
          icon="/icons/2.png"
          heading={t("step_title_second")}
          text={t("step_description_2")}
        />
      </div>

      <div className="container mx-auto flex flex-row  justify-between  ">
        <FuncionaSection2Card
          img="/images/33.png"
          icon="/icons/3.png"
          heading={t("step_title_third")}
          text={t("step_description_3")}
        />
      </div>

      <div className="container mx-auto flex flex-row  justify-between  ">
        <FuncionaSection2Card
          img="/images/44.png"
          icon="/icons/4.png"
          heading={t("step_title_fourth")}
          text={t("step_description_4")}
        />
      </div>

      <div className="container mx-auto flex w-full flex-row justify-between">
        <FuncionaSection2Card
          img="/images/55.png"
          icon="/icons/5.png"
          heading={t("step_title_fifth")}
          text={t("step_description_5")}
        />
      </div>

      <div className="container mx-auto flex flex-row  justify-between  ">
        <FuncionaSection2Card
          img="/images/66.png"
          icon="/icons/6.png"
          heading={t("step_title_sixth")}
          text={t("step_description_6")}
        />
      </div>

      <div className="container mx-auto flex flex-row  justify-between  ">
        <FuncionaSection2Card
          img="/images/77.png"
          icon="/icons/7.png"
          heading={t("step_title_seven")}
          text={t("step_description_7")}
        />
      </div>
      <Link
        href={ANUNCIAR_PROP_URL}
        className="mx-auto mb-24 flex w-fit justify-center rounded-md bg-primary-500 px-5 py-3 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl lg:w-52"
      >
        {t("create_advert")}
      </Link>
    </section>
  );
};

export default FuncionaSection2;
