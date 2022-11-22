import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SiFacebook, SiGmail } from "react-icons/si";
import { toast } from "react-toastify";
import Input from "../../components/utils/Input";
import { RECOVER_URL, REGISTER_URL } from "../../models/paths";
import useUserService from "../../hooks/userService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { login, loginWithFacebook, loginWithGoogle } = useUserService();

  const loginFacebook = async (event) => {
    event.preventDefault();
    await loginWithFacebook();
  };

  /** registar com google */
  const loginGoogle = async (event) => {
    event.preventDefault();
    await loginWithGoogle();
  };

  const normalLogin = async (event) => {
    event.preventDefault();
    const { error } = await login(email, password);
    if (error) {
      toast.error(error.message);
      return;
    } else {
      router.push("/");
    }
  };

  return (
    <div className="my-10 flex justify-center">
      <div className="my-5 w-11/12 rounded-lg border border-terciary-100 lg:w-5/12">
        <div className="grid grid-cols-2 justify-around border-b border-terciary-100">
          <div className="p-3 text-center text-primary-500">Iniciar sessão</div>
          <Link href={REGISTER_URL}>
            <a aria-label="register_password" className="border-l border-terciary-100 p-3 text-center">
              Registar
            </a>
          </Link>
        </div>
        <div className="mt-9 p-3">
          <div className="mb-9 text-xl font-bold">
            Bem-vindo à <span className="text-primary-500">Unihosts.pt</span>
          </div>
          <form onSubmit={(e) => normalLogin(e)}>
            <div className="mt-3">
              <div className="mt-2">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="email_input"
                  labelText="Email"
                ></Input>
              </div>
            </div>
            <div className="mt-3">
              <div className="mt-2">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="on"
                  label="password_input"
                  labelText="Palavra-passe"
                ></Input>
              </div>
            </div>
            <div className="my-5">
              <button className="w-full rounded-lg bg-primary-500 py-2 text-white">Iniciar Sessão</button>
            </div>
          </form>
          <Link href={RECOVER_URL}>
            <a aria-label="recover_password">
              <div className="mt-3 text-center text-primary-500">Esqueci-me da palavra-passe</div>
            </a>
          </Link>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink text-gray-400">ou</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex flex-1 flex-col justify-around gap-5">
            <button className="h-16 w-full rounded-lg bg-socials-facebook px-8 text-center" onClick={loginFacebook}>
              <SiFacebook className="inline" color="blue" />
              <span className="my-auto ml-3 inline">Entrar com Facebook</span>
            </button>
            <button className="h-16 w-full rounded-lg bg-socials-gmail px-8 text-center" onClick={loginGoogle}>
              <SiGmail color="red" className="inline" />
              <span className="my-auto ml-3 inline">Entrar com Gmail</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
