import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SiFacebook, SiGmail } from "react-icons/si";
import { toast } from "react-toastify";
import Input from "../../components/utils/Input";
import { HOME_URL, LOGIN_URL } from "../../models/paths";
import useUserService from "../../hooks/userService";
import Button from "../../components/utils/Button";

const Register = () => {
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
      toast.success("Register successfully");
      router.push(HOME_URL);
    }
  };

  return (
    <div className="max-width my-10 flex justify-center">
      <div className="my-5 w-11/12 rounded-lg border border-terciary-100 lg:w-7/12">
        <div className="grid grid-cols-2 justify-around border-b border-terciary-100">
          <Link href={LOGIN_URL}>
            <a className="p-3 text-center">Iniciar Sessão</a>
          </Link>
          <div className="border-l border-terciary-100 p-3 text-center text-primary-500">Registar</div>
        </div>
        <div className="mt-9 px-10 py-5">
          <div className="mb-9 text-xl font-bold">
            Bem-vindo à <span className="text-primary-500">Unihosts.pt</span>
          </div>
          <form onSubmit={normalRegister}>
            <div className="mt-3">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} label="email" labelText="Email:"></Input>
            </div>
            <div className="mt-3">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="password"
                labelText="Palavra-passe:"
              ></Input>
            </div>
            <div className="my-5 w-full">
              <Button type="submit">Registar</Button>
            </div>
          </form>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink text-2xl font-bold text-black">ou</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div className="flex flex-1 flex-col justify-around gap-5">
            <Button variant="facebook" onClick={(event) => registerWithFacebook(event)} type={"button"}>
              <SiFacebook className="inline " color="blue" size={36} />
              <span className="my-auto ml-3 inline">Continuar com o Facebook</span>
            </Button>
            <Button variant="gmail" onClick={(event) => registerWithGoogle(event)} type={"button"}>
              <SiGmail color="red" className="inline" size={36} />
              <span className="my-auto ml-3 inline">Continuar com o Google</span>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm italic">
            {`Ao registar-se está a concordar com os nossos `}
            <Link href="#">
              <a>
                <span className="italic text-primary-500">termos e condições</span>
                {` e `}
              </a>
            </Link>
            <Link href="#">
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
