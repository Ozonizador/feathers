import Link from "next/link";
import React, { useState } from "react";
import { SiFacebook, SiGmail } from "react-icons/si";
import Input from "../../components/utils/Input";
import useUserService from "../../services/userService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, loginWithFacebook, loginWithGoogle } = useUserService();

  /** registar com google */
  const registerWithGoogle = async (event) => {
    event.preventDefault();
    await loginWithGoogle();
  };

  const registerWithFacebook = async (event) => {
    event.preventDefault();
    await loginWithFacebook();
  };

  const normalRegister = async (event) => {
    event.preventDefault();

    const { error } = await register(email, password);
  };

  return (
    <div className="my-10 flex justify-center">
      <div className="my-5 w-11/12 rounded-lg border border-terciary-100 lg:w-5/12">
        <div className="grid grid-cols-2 justify-around border-b border-terciary-100">
          <Link href="/auth/login">
            <a className="p-3 text-center">Iniciar Sessão</a>
          </Link>
          <div className="border-l border-terciary-100 p-3 text-center text-primary-500">Registar</div>
        </div>
        <div className="mt-9  p-3">
          <div className="mb-9 text-xl font-bold">
            Bem-vindo à <span className="text-primary-500">Unihosts.pt</span>
          </div>
          <form onSubmit={normalRegister}>
            <div className="mt-3">
              <div>Email</div>
              <div className="mt-2">
                <Input value={email} onChange={(e) => setEmail(e.target.value)}></Input>
              </div>
            </div>
            <div className="mt-3">
              <div>Palavra-passe</div>
              <div className="mt-2">
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password"></Input>
              </div>
            </div>
            <div className="my-5">
              <button type="submit" className="w-full rounded-lg bg-primary-500 py-2 text-white">
                Registar
              </button>
            </div>
          </form>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink text-2xl font-bold text-black">ou</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div className="flex flex-1 flex-col justify-around gap-5">
            <div className="my-3 flex flex-1">
              <button
                className="h-16 w-full rounded-lg bg-socials-facebook px-8 text-center"
                onClick={(event) => registerWithFacebook(event)}
              >
                <SiFacebook className="inline " color="blue" />
                <span className="my-auto ml-3 inline">Continuar com o Facebook</span>
              </button>
            </div>
            <div>
              <button
                className="h-16 w-full rounded-lg bg-socials-gmail px-8 text-center"
                onClick={(event) => registerWithGoogle(event)}
              >
                <SiGmail color="red" className="inline" />
                <span className="my-auto ml-3 inline">Continuar com o Google</span>
              </button>
            </div>
          </div>
          <div className="mt-4 text-center">
            Ao registar-se está a concordar com os nossos {/* mudar link */}
            <Link href="/auth/recover">
              <a>
                <span className="italic text-primary-500">termos e condições</span> e{" "}
              </a>
            </Link>
            {/* mudar link */}
            <Link href="/auth/recover">
              <a>
                <span className="italic text-primary-500">política de privacidade.</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
