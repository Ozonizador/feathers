import Link from "next/link";
import React from "react";
import { SiFacebook, SiGmail } from "react-icons/si";

const Login = () => {
  return (
    <div className="my-10 flex justify-center">
      <div className="my-5 w-6/12 rounded-lg border border-neutral-100">
        <div className="grid grid-cols-2 justify-around border-b border-neutral-100">
          <div className="p-3 text-center text-primary-500">Iniciar sessão</div>

          <Link href="/auth/register">
            <a className="border-l border-neutral-100 p-3 text-center">Register</a>
          </Link>
        </div>
        <div className="p-3">
          <div className="font-bold">Bem-vindo de novo!</div>
          <div className="mt-3">
            <div>Email</div>
            <div className="mt-2">
              <input className="w-full rounded-sm border border-neutral-300 py-1"></input>
            </div>
          </div>
          <div className="mt-3">
            <div>Palavra-passe</div>
            <div className="mt-2">
              <input className="w-full rounded-sm border border-neutral-300 py-1"></input>
            </div>
          </div>
          <div className="mt-3 text-center text-primary-500">Esqueci-me da palavra-passe</div>
          <div className="my-5">
            <button className="w-full rounded-lg bg-primary-500 py-2">Iniciar sessão</button>
          </div>
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink text-gray-400">ou</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex flex-1 justify-around gap-5">
            <button className="h-16 bg-socials-facebook px-8 text-center">
              <SiFacebook className="inline" color="blue" />
              <span className="my-auto ml-3 inline">Facebook</span>
            </button>
            <button className="h-16 bg-socials-gmail px-8 text-center">
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
