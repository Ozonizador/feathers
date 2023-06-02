import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SiFacebook, SiGmail } from "react-icons/si";
import { toast } from "react-toastify";
import Input from "../../components/utils/Input";
import { RECOVER_URL, REGISTER_URL, TYPE_PROFILE_CHOICE_URL } from "../../models/paths";
import useUserService from "../../hooks/userService";
import Button from "../../components/utils/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { login, loginWithFacebook, loginWithGoogle } = useUserService();

  const loginFacebook = async (event: React.MouseEvent) => {
    event.preventDefault();
    await loginWithFacebook();
  };

  /** registar com google */
  const loginGoogle = async (event: React.MouseEvent) => {
    event.preventDefault();
    await loginWithGoogle();
  };

  const normalLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const { error } = await login(email, password);
    if (error) {
      toast.error(error.message);
      return;
    } else {
      router.push(TYPE_PROFILE_CHOICE_URL);
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
              <Button type="submit">Iniciar Sessão</Button>
            </div>
          </form>
          <Link href={RECOVER_URL}>
            <a aria-label="recover_password">
              <div className="mt-3 text-center italic text-primary-500">Esqueci-me da palavra-passe</div>
            </a>
          </Link>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink text-lg font-bold text-gray-400">ou</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="mb-3 flex justify-around gap-5">
            <Button onClick={loginFacebook} type="button" variant="facebook">
              <SiFacebook className="inline" color="blue" />
              <span className="my-auto ml-3 inline">Facebook</span>
            </Button>
            <Button onClick={loginGoogle} type="button" variant="gmail">
              <SiGmail color="red" className="inline" />
              <span className="my-auto ml-3 inline">Gmail</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
