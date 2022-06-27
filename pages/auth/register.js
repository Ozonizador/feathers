import Link from "next/link";
import React from "react";
import { SiFacebook, SiGmail } from "react-icons/si";
import { loginWithFacebook, loginWithGoogle, loginWithMagicLink } from "../../services/userService";

const Register = () => {
  /** registar com google */
  const registerWithGoogle = async (event) => {
    event.preventDefault();
    await loginWithGoogle();
  };

  /** registar com magic link */
  const registerMagicLink = async (event) => {
    event.preventDefault();
    await loginWithMagicLink("pcardoso.lei@gmail.com");
  };

  const registerWithFacebook = async (event) => {
    event.preventDefault();
    await loginWithFacebook();
  };

  return (
    <div className="my-10 flex justify-center">
      <div className="my-5 w-6/12 rounded-lg border border-terciary-100">
        <div className="grid grid-cols-2 justify-around border-b border-terciary-100">
          <Link href="/auth/login">
            <a className="p-3 text-center">Iniciar Sessão</a>
          </Link>
          <div className="border-l border-terciary-100 p-3 text-center text-primary-500">
            Register
          </div>
        </div>
        <div className="p-3">
          <div className="text-xl font-bold">
            Bem-vindo à <span className="text-primary-500">Unihosts.pt</span>
          </div>
          <div className="mt-6">
            <div
              className="cursor-pointer border border-primary-500 p-5 text-center text-primary-500"
              onClick={(event) => registerMagicLink(event)}
            >
              Registar com e-mail
            </div>
          </div>
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink text-2xl font-bold text-black">ou</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="my-3 flex flex-1">
            <button
              className="h-16 w-full bg-socials-facebook px-8 text-center"
              onClick={(event) => registerWithFacebook(event)}
            >
              <SiFacebook className="inline" color="blue" />
              <span className="my-auto ml-3 inline">Continuar com o Facebook</span>
            </button>
          </div>
          <div>
            <button
              className="h-16 w-full bg-socials-gmail px-8 text-center"
              onClick={(event) => registerWithGoogle(event)}
            >
              <SiGmail color="red" className="inline" />
              <span className="my-auto ml-3 inline">Continuar com o Google</span>
            </button>
          </div>
          <div className="mt-4">
            Ao registar-se está a concordar com os nossos termos e condições e política de
            privacidade.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
