import Link from "next/link";
import React, { useState } from "react";
import { SiFacebook, SiGmail } from "react-icons/si";
import Input from "../../components/utils/Input";
import { login, loginWithFacebook, loginWithGoogle } from "../../services/userService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFacebook = async (event) => {
    event.preventDefault();
    await loginWithFacebook();
  };

  /** registar com google */
  const loginGoogle = async (event) => {
    event.preventDefault();
    await loginWithGoogle();
  };

  const normalLogin = async () => {
    await login(email, password);
  };

  return (
    <div className="my-10 flex justify-center">
      <div className="my-5 w-6/12 rounded-lg border border-terciary-100">
        <div className="grid grid-cols-2 justify-around border-b border-terciary-100">
          <div className="p-3 text-center text-primary-500">Iniciar sessão</div>

          <Link href="/auth/register">
            <a className="border-l border-terciary-100 p-3 text-center">Registar</a>
          </Link>
        </div>
        <div className="p-3">
          <div className="font-bold">Bem-vindo de novo!</div>
          <form onSubmit={normalLogin}>
            <div className="mt-3">
              <div>Email</div>
              <div className="mt-2">
                <Input value={email} onChange={(e) => setEmail(e.target.value)}></Input>
              </div>
            </div>
            <div className="mt-3">
              <div>Palavra-passe</div>
              <div className="mt-2">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                ></Input>
              </div>
            </div>
            <div className="my-5">
              <button className="w-full rounded-lg bg-primary-500 py-2">Iniciar sessão</button>
            </div>
          </form>
          <Link href="/auth/recover">
            <a>
              <div className="mt-3 text-center text-primary-500">Esqueci-me da palavra-passe</div>
            </a>
          </Link>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink text-gray-400">ou</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex flex-1 justify-around gap-5">
            <button
              className="h-16 w-full bg-socials-facebook px-8 text-center"
              onClick={loginFacebook}
            >
              <SiFacebook className="inline" color="blue" />
              <span className="my-auto ml-3 inline">Facebook</span>
            </button>
            <button className="h-16 w-full bg-socials-gmail px-8 text-center" onClick={loginGoogle}>
              <SiGmail color="red" className="inline" />
              <span className="my-auto ml-3 inline">Gmail</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;