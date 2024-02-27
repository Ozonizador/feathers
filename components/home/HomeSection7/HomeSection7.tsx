import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ANUNCIAR_PROP_URL, COMO_FUNCIONA_URL } from "../../../models/paths";
import { Trans, useTranslation } from "next-i18next";

const HomeSection7 = () => {
  const { t } = useTranslation();
  return (
    <section className="max-width">
      <div className="my-24 rounded-3xl bg-terciary-300 lg:w-full">
        <div className="flex flex-col-reverse lg:h-96 lg:flex-row">
          <div className="flex flex-col items-start justify-center p-0 text-center align-middle lg:ml-12 lg:basis-2/4 lg:p-0 lg:text-left">
            <h2 className="mt-8 py-8 text-2xl font-bold text-secondary-500 lg:ml-6 lg:mt-8 lg:text-4xl">
              {t("index:section.have_property.title")}
            </h2>
            <div className="text-md -mb-6 text-secondary-600 lg:pb-0">
              <div className="mb-20 block max-sm:mx-3 lg:mb-0 lg:ml-6 lg:mt-2 lg:block">
                {t("index:section.have_property.description")}
              </div>
            </div>
            <div className="mb-14 mt-8 lg:mb-20 lg:mt-0 lg:pt-16">
              <Link
                href={ANUNCIAR_PROP_URL}
                className="rounded-full bg-primary-500 px-16 py-3 text-white  duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl lg:ml-6 lg:px-8"
              >
                {t("announce")}
              </Link>
            </div>
          </div>
          <div className="lg:min-h-96 h-full w-full rounded-3xl lg:h-96 lg:basis-2/4">
            <div className="relative h-full w-full">
              <div className="h-full w-full">
                <Image
                  src="/images/house-key.jpg"
                  fill
                  alt=""
                  className="home_img h-full rounded-3xl object-cover"
                ></Image>
              </div>
              <div className="absolute bottom-10 right-0 mb-6 w-full text-center lg:bottom-6 lg:right-5 lg:w-fit lg:text-right ">
                <Link
                  href={COMO_FUNCIONA_URL}
                  className=" mb-9 rounded-full  border-2 border-solid border-white bg-black/30 px-8 py-3 text-white duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl"
                >
                  {t("index:section.have_property.know_more")}...
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection7;
