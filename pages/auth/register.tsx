import Link from "next/link";
import { useRouter } from "next/router";
import React, { Suspense, useState } from "react";
import { SiFacebook, SiGmail } from "react-icons/si";
import { toast } from "react-toastify";
import Input from "../../components/utils/Input";
import { HOME_URL, LOGIN_URL, GENERAL_ADMIN_URL } from "../../models/paths";
import useUserService from "../../hooks/userService";
import Button from "../../components/utils/Button";
import { Trans, useTranslation } from "next-i18next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, loginWithFacebook, loginWithGoogle } = useUserService();

  /** registar com google */
  const registerWithGoogle = async (event: React.MouseEvent) => {
    event.preventDefault();
    await loginWithGoogle();
  };

  const registerWithFacebook = async (event: React.MouseEvent) => {
    event.preventDefault();
    await loginWithFacebook();
  };

  const normalRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const { error } = await register(email, password);

    if (error) {
      toast.error(error.message);
      return;
    } else {
      toast.success(t("messages:success.register_done"));
      router.push(HOME_URL);
    }
  };

  return (
    <div className="max-width my-10 flex justify-center">
      <div className="my-5 w-11/12 rounded-lg border border-terciary-100 lg:w-7/12">
        <div className="grid grid-cols-2 justify-around border-b border-terciary-100">
          <Link href={LOGIN_URL} className="p-3 text-center">
            {t("login")}
          </Link>
          <div className="border-l border-terciary-100 p-3 text-center text-primary-500"> {t("register")}</div>
        </div>
        <div className="mt-9 px-10 py-5">
          <div className="mb-9 text-xl font-bold">
            {t("welcome_to")} <span className="text-primary-500">Unihosts.pt</span>
          </div>
          <form onSubmit={normalRegister}>
            <div className="mt-3">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} name="email" labelText="Email:"></Input>
            </div>
            <div className="mt-3">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                labelText={t("password")}
              ></Input>
            </div>
            <div className="my-5 w-full">
              <Button type="submit">{t("register")}</Button>
            </div>
          </form>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink text-2xl font-bold text-black">{t("or")}</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div className="mb-3 flex flex-col justify-around gap-5 xl:flex-row">
            <Button variant="facebook" onClick={(event) => registerWithFacebook(event)} type={"button"}>
              <SiFacebook className="inline " color="blue" />
              <span className="my-auto ml-3 inline"> Facebook</span>
            </Button>
            <Button variant="gmail" onClick={(event) => registerWithGoogle(event)} type={"button"}>
              <FcGoogle color="red" className="inline" />
              <span className="my-auto ml-3 inline"> Google</span>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm italic">
            <Trans
              t={t}
              i18nKey="admin:agree_terms"
              values={{ terms: t("terms_and_conditions"), privacy: t("privacy_policy") }}
              components={{
                lnk1: (
                  <Link href="/terms_and_conditions.pdf" target="_blank" className="italic text-primary-500"></Link>
                ),
                lnk2: <Link href="/gdpr_unihosts.pdf" target="_blank" className="italic text-primary-500"></Link>,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
}
