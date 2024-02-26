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
import Link from "next/link";
import { Form } from "react-hook-form";
import { toast } from "react-toastify";

const Contactos = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { t } = useTranslation(["contacts", "common"]);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();
    console.log(responseData["message"]);
    try {
      if (!response.ok) {
        console.log(response);
        console.log("falling over");
        throw new Error(`response status: ${response.status}`);
      }
      toast.success("Message successfully sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Error, please try resubmitting the form");
    }
  }

  return (
    <div className="max-width !px-12">
      <div className="my-24 lg:my-20 xl:my-10">
        <div className="flex flex-col lg:flex-row ">
          <div className="flex w-full lg:w-1/3">
            <div className="flex flex-col gap-3 xl:mt-20">
              <Link href="/faqs?TENANT" className="cursor-pointer py-3">
                <CgFileDocument className="inline text-xl" />
                <div className="my-auto ml-3 inline">{t("help_student")}</div>
              </Link>
              <Link href="/faqs?LANDLORD" className="cursor-pointer">
                <CgFileDocument className="inline text-xl" />
                <div className="my-auto ml-3 inline">{t("help_landlord")}</div>
              </Link>

              <div className="mt-20">
                <div className="text-2xl font-bold">{t("contacts")}</div>
                <div className="mt-5 flex items-center align-middle">
                  <FaPhoneAlt className="mr-2" /> +351 914 626 616
                </div>
                <div className="mb-3 mt-5 flex items-center align-middle">
                  <MdEmail className="mr-2" /> info@unihosts.pt
                </div>
              </div>

              <div className="-ml-3">
                <Socials type="primary" size="sm" />
              </div>
            </div>
          </div>

          <form className="mt-10 w-full lg:mt-0 lg:w-2/3" onSubmit={handleSubmit}>
            <div className="mb-10 text-2xl font-bold">{t("leave_us_message")}</div>
            <div className="w-90">
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                labelText={t("name")}
                name="name"
              />
            </div>

            <div className="w-90 my-10">
              <Input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                labelText={"Email"}
                name="email"
              />
            </div>

            <div>
              <label htmlFor="about" className=" text-gray-700">
                {t("message")}
              </label>
              <div className="mt-2">
                <textarea
                  required
                  rows={5}
                  className="mb-6 mt-1 block w-full rounded-md border border-solid border-terciary-500 bg-white px-2 py-3 shadow-sm  focus:border-primary-500 focus:outline-none  focus:ring-0"
                  placeholder={t("your_message")}
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <div className="w-32">
              <Button type="submit" padding="md" rounded="medium">
                {t("common:send")}
              </Button>
            </div>
          </form>
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
