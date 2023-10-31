import React from "react";
import Socials from "../socials/Socials";
import Image from "next/image";
import Link from "next/link";
import {
  ABOUT_US_URL,
  ANUNCIAR_PROP_URL,
  BLOG_URL,
  COMO_FUNCIONA_URL,
  CONTACTOS_URL,
  FAQS_URL,
  HOME_URL,
  LOGIN_URL,
  POLICIES,
  TERMS,
} from "../../models/paths";
import { useTranslation } from "next-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div>
        <div className="grid grid-cols-1 gap-1 bg-secondary-300 px-12 py-4 lg:grid-cols-5 lg:gap-5 lg:pt-20">
          <div className="relative mb-auto flex pt-5 lg:mx-auto">
            <Image src="/images/logo2.svg" alt="unihosts" height="200" width="200"></Image>
          </div>
          <div className="ml-0 py-5 text-left text-terciary-100 lg:ml-5 lg:text-left">
            <h3 className="mb-3 text-lg font-bold">Unihosts</h3>
            <div className="py-1">
              <Link href={ABOUT_US_URL} className="fs-300 clr-white">
                {t("footer:about")}
              </Link>
            </div>
            <div className="py-1">
              <Link href={BLOG_URL} className="fs-300 clr-white">
                {t("footer:blog")}
              </Link>
            </div>
            <div className="py-1">
              <Link href={CONTACTOS_URL} className="fs-300 clr-white">
                {t("footer:be_partner")}
              </Link>
            </div>
            <div className="py-1">
              <Link href={TERMS} className="fs-300 clr-white">
                {t("footer:terms")}
              </Link>
            </div>
            <div className="py-1">
              <Link href={POLICIES} className="fs-300 clr-white">
                {t("footer:cookie_policy")}
              </Link>
            </div>
            <div className="py-1">
              <Link href={CONTACTOS_URL} className="fs-300 clr-white">
                {t("footer:talk_with_us")}
              </Link>
            </div>
          </div>
          <div className="py-5 text-left text-terciary-100 lg:text-left">
            <h3 className="mb-3 text-lg font-bold">{t("student", { count: 3 })}</h3>
            <div className="py-1">
              <Link href={HOME_URL + "#howTo"} className="fs-300 clr-white">
                {t("footer:student.how_to_rent")}
              </Link>
            </div>

            <div className="py-1">
              <Link href={FAQS_URL + "?TENANT"} className="fs-300 clr-white">
                {t("footer:student.help")}
              </Link>
            </div>

            <div className="py-1">
              <Link href={LOGIN_URL} className="fs-300 clr-white">
                {t("login")}
              </Link>
            </div>
          </div>
          <div className="py-5 text-left text-terciary-100 lg:text-left">
            <h3 className="mb-3 text-lg font-bold">{t("landlord", { count: 2 })}</h3>

            <div className="py-1">
              <Link href={COMO_FUNCIONA_URL}>{t("footer:landlord.how_to")}</Link>
            </div>
            <div className="py-1">
              <Link href={FAQS_URL + "?LANDLORD"} className="fs-300 clr-white">
                {t("footer:landlord.help")}
              </Link>
            </div>

            <div className="py-1">
              <Link href={LOGIN_URL} className="fs-300 clr-white">
                {t("login")}
              </Link>
            </div>
            <Link href={ANUNCIAR_PROP_URL} className="transition">
              <div className="my-3 mt-7 flex w-fit rounded-full bg-primary-500 p-3 text-center">
                {t("footer:announce")}!
              </div>
            </Link>
          </div>
          <div className="flex flex-1 justify-start py-5 lg:justify-center">
            <Socials type="secondary" size="md" />
          </div>
        </div>
        <div className="bg-secondary-300 px-10 lg:px-20">
          <p className="border-t border-terciary-100 pb-7 pt-8 text-center text-terciary-100">Unihosts</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
