import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SiFacebook } from "react-icons/si";
import { toast } from "react-toastify";
import Input from "../../components/utils/Input";
import { HOME_URL, RECOVER_URL, REGISTER_URL, TYPE_PROFILE_CHOICE_URL } from "../../models/paths";
import useUserService from "../../hooks/userService";
import Button from "../../components/utils/Button";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "next-i18next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FaEye} from "react-icons/fa"
import InputPassword from "../../components/utils/InputPassword";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { login, loginWithFacebook, loginWithGoogle } = useUserService();

  const loginFacebook = async (event: React.MouseEvent) => {
    event.preventDefault();
    await loginWithFacebook();
    router.push(TYPE_PROFILE_CHOICE_URL);
  };

  /** registar com google */
  const loginGoogle = async (event: React.MouseEvent) => {
    event.preventDefault();
    await loginWithGoogle();
    router.push(HOME_URL);
  };

  const normalLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const { error } = await login(email, password);
    if (error) {
      toast.error(t("messages:errors.user_pass_incorrect"));
      return;
    } else {
      router.push(HOME_URL);
    }
  };

  return (
    <div className="max-width my-10 flex justify-center">
      <div className="my-5 w-11/12 rounded-lg border border-terciary-100 lg:w-7/12">
        <div className="grid grid-cols-2 justify-around border-b border-terciary-100">
          <div className="p-3 text-center text-primary-500">{t("login")}</div>
          <Link
            href={REGISTER_URL}
            aria-label="register_password"
            className="border-l border-terciary-100 p-3 text-center"
          >
            {t("register")}
          </Link>
        </div>
        <div className="mt-9 px-10 py-5">
          <div className="mb-9 text-xl font-bold">
            {t("welcome_to")} <span className="text-primary-500">Unihosts.pt</span>
          </div>
          <form onSubmit={(e) => normalLogin(e)}>
            <div className="mt-3">
              <div className="mt-2">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email_input"
                  labelText="Email"
                ></Input>
              </div>
            </div>
            <div className="mt-3">
              <div className="mt-2">
                <InputPassword
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="on"
                  name="password_input"
                  labelText={t("password")}
                ></InputPassword>
              </div>
            </div>
            <div className="my-5">
              <Button type="submit">{t("login")}</Button>
            </div>
          </form>
          <Link href={RECOVER_URL} aria-label="recover_password">
            <div className="mt-3 text-center italic text-primary-500">{t("forgot_pw")}</div>
          </Link>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink text-lg font-bold text-gray-400">{t("or")}</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="mb-3 flex justify-around gap-5">
            <Button onClick={loginFacebook} type="button" variant="facebook">
              <SiFacebook className="inline" color="blue" />
              <span className="my-auto ml-3 inline">Facebook</span>
            </Button>
            <Button onClick={loginGoogle} type="button" variant="gmail">
              <FcGoogle color="red" className="inline" />
              <span className="my-auto ml-3 inline">Gmail</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
}
