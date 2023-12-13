import React from "react";
import HomeSection5Cards from "../homeSection5Cards/HomeSection5Cards";
import Link from "next/link";

import { CgHome } from "react-icons/cg";
import { PROCURAR_ADVERT_URL } from "../../../models/paths";
import { Trans, useTranslation } from "next-i18next";

const HomeSection5 = () => {
  const { t } = useTranslation("index");
  return (
    <section className="max-width" id="howTo">
      <div className="pt-24 lg:pb-20 xl:pb-36">
        <h2 className="mb-12 text-3xl font-black lg:text-5xl">{t("section.how_it_works.title")}</h2>
        <div className="mb-24 grid gap-10 lg:grid-cols-3">
          <HomeSection5Cards
            img="/images/homeSection2-3.svg"
            heading={t("section.how_it_works.search.title")}
            text={t("section.how_it_works.search.description")}
          />
          <HomeSection5Cards
            img="/images/homeSection5-2.svg"
            heading={t("section.how_it_works.reservation.title")}
            text={t("section.how_it_works.reservation.description")}
          />
          <HomeSection5Cards
            img="/images/homeSection5-3.svg"
            heading={t("section.how_it_works.change.title")}
            text={t("section.how_it_works.change.description")}
          />
        </div>
        <span className="hidden justify-center lg:flex">
          <Link
            href={PROCURAR_ADVERT_URL}
            className="flex items-center justify-center rounded-xl bg-primary-500 p-5 text-white duration-200 ease-in hover:flex hover:text-white hover:drop-shadow-xl"
          >
            {t("section.how_it_works.find")}{" "}
            <span className="px-1">
              <CgHome />
            </span>
            {t("section.how_it_works.at")}
          </Link>
        </span>
      </div>
    </section>
  );
};

export default HomeSection5;
