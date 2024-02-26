import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const FuncionaOndeEstamos = () => {
  const { t } = useTranslation();
  return (
    <section className="mx-4 lg:mx-0">
      <div className="max-width my-10 flex rounded-2xl bg-terciary-600 px-10 py-12 xl:my-60 xl:py-20">
        <div className="flex flex-1 flex-col justify-center align-middle">
          <div className="w-full">
            <div className="flex flex-col gap-14 lg:flex-row">
              <div className="lg:min-h-96 relative h-96 w-full lg:w-1/3">
                <Image
                  src="/images/mapa_unihosts_funciona.jpeg"
                  fill
                  alt=""
                  className="rounded-lg"
                  style={{ objectFit: "initial" }}
                />
              </div>
              <div className="flex flex-col gap-3 sm:w-full lg:w-3/5">
                <h1 className="mb-4 text-center text-xl font-bold lg:text-left lg:text-3xl">
                  {t("funciona:where_are_we")}
                </h1>
                <div className="flex w-fit pr-6 items-center rounded-full bg-white p-4 align-middle drop-shadow-md">
                  <div className="">
                    <Image
                      className="flex object-scale-down "
                      src="/images/location.png"
                      alt=""
                      height="25"
                      width="25"
                    ></Image>
                  </div>
                  <div className="ml-2 text-base lg:text-md">{t("funciona:portugal_islands")}</div>
                </div>

                <div className="mb-5 w-10/12 text-justify text-lg">
                  {t("funciona:last_section_description")}
                  <br />
                  <br />
                  {t("funciona:unipackages_zones_available")}
                </div>

                <Link
                  href="/contactos"
                  className="w-fit rounded-md bg-primary-500 px-11 py-3 text-center text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl"
                >
                  {t("index:know_more")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuncionaOndeEstamos;
