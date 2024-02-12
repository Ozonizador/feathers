import React from "react";
import Image from "next/image";

import headerImage from "../public/images/sobre_nos.jpg";
import ownerImage from "../public/images/sobre_nos_owner.jpg";
import missionImage from "../public/images/sobre_nos_mission.jpg";
import valoresImage from "../public/images/sobre_nos_valores.jpg";
import { useTranslation } from "next-i18next";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const AboutUs = () => {
  const { t } = useTranslation("aboutus");
  return (
    <>
      <div className="hidden w-full bg-black lg:block">
        <Image layout="intrinsic" src={headerImage} alt="Sobre Nos" className=" opacity-60"></Image>
      </div>
      <div className="max-width">
        <div className="block w-full bg-black lg:hidden">
          <Image
            width={100}
            height={100}
            layout="responsive"
            src="/images/sobre_nos.jpg"
            alt="sobre nos image"
            style={{ objectFit: "cover" }}
            className="opacity-60"
          ></Image>
        </div>

        <div className="mt-10 px-3">
          <div className="mb-5 px-4">
            <h4 className="text-left text-4xl font-bold">{t("about_us")}</h4>
            <h6 className="mb-10 mt-2 text-2xl lg:mb-11">{t("title")}</h6>
            <p className="mb-12 mt-3 text-justify">{t("about_us_description")}</p>
          </div>
          <div className="my-5 grid grid-cols-1 gap-2 px-4 lg:grid-cols-2">
            <div className="order-first rounded-lg p-5 lg:order-first">
              <Image layout="intrinsic" src={ownerImage} alt="Sobre Nos" className=" rounded-xl"></Image>
            </div>
            <div className=" rounded-lg flex flex-col content-center p-5">
              <h6 className="ml-2 mt-0 text-left text-4xl font-bold lg:ml-0">{t("our_history")}</h6>
              <p className="mt-5 mr-10 text-justify text-lg tracking-wide font-normal">{t("our_history_description")}</p>
            </div>
          </div>

          <div className="my-5 grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="order-last p-5 lg:order-first flex flex-col content-center ml-5">
              <div className="">
                <h6 className="text-left text-4xl font-bold">{t("mission")}</h6>
                <p className="mt-5 text-justify text-lg tracking-wide font-normal">{t("mission_decription")}</p>
              </div>
            </div>
            <div className="rounded-lg p-5 ">
              <Image layout="intrinsic" src={missionImage} alt="Sobre Nos" className="rounded-xl"></Image>
            </div>
          </div>

          <div className="my-5 grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="order-first p-5 lg:order-first">
              <Image layout="intrinsic" src={valoresImage} alt="Valores"></Image>
            </div>
            <div className="rounded-lg flex flex-col content-center p-5">
              <h6 className="text-left text-4xl font-bold">{t("values")}</h6>
              <p className="mt-5 mr-10 text-justify text-lg tracking-wide font-normal">{t("values_description")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const locale = ctx.locale;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
