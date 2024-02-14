import React, { useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import Input from "../components/utils/Input";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Socials from "../components/socials/Socials";
import Button from "../components/utils/Button";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Contactos = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { t } = useTranslation(["contacts", "common"]);

  const sendToEmail = () => {
    window.location.href = `mailto:info@unihosts.pt?subject=Contacto-${name}&body=${message}`;
  };

  return (
    <div className="max-width !px-12">
      <div className="my-24 lg:my-20 xl:my-10">
        <div className="flex flex-col lg:flex-row ">
          <div className="flex w-full lg:w-1/3">
            <div className="flex flex-col gap-3 xl:mt-20">
              <a href="/faqs?TENANT" className="py-3 cursor-pointer">
                <CgFileDocument className="inline text-xl" />
                <div className="my-auto ml-3 inline">{t("help_student")}</div>
              </a>
              <a href="/faqs?LANDLORD" className="cursor-pointer"> 
                <CgFileDocument className="inline text-xl" />
                <div className="my-auto ml-3 inline">{t("help_landlord")}</div>
              </a>

              <div className="mt-20">
                <div className="text-2xl font-bold">{t("contacts")}</div>
                <div className="mt-5 flex items-center align-middle">
                  <FaPhoneAlt className="mr-2" /> +351 914 626 616
                </div>
                <div className="mb-3 mt-5 flex items-center align-middle">
                  <MdEmail className="mr-2"/> info@unihosts.pt
                </div>
              </div>

              <div className="-ml-3">
                <Socials type="primary" size="sm" />
              </div>
            </div>
          </div>

          <div className="mt-10 w-full lg:mt-0 lg:w-2/3">
            <div className="mb-10 text-2xl font-bold">{t("leave_us_message")}</div>
            <div className="w-90">
              <Input value={name} onChange={(e) => setName(e.target.value)} labelText={t("name")} name="name" />
            </div>

            <div className="w-90 my-10">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} labelText="Email" name="email" />
            </div>

            <div>
              <label htmlFor="about" className=" text-gray-700">
                {t("message")}
              </label>
              <div className="mt-2">
                <textarea
                  rows={5}
                  className="mb-6 mt-1 block w-full rounded-md border border-solid border-terciary-500 bg-white focus:border-primary-500 focus:outline-none focus:ring-0  px-2 py-3  shadow-sm"
                  placeholder={t("your_message")}
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <div className="w-32">
              <Button onClick={() => sendToEmail()} type="button" padding="md" rounded="medium">
                {t("common:send")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactos;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
}
