import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Input from "../../components/utils/Input";
import { Spinner } from "../../components/utils/Spinner";
import { recoverPasswordViaEmail } from "../../services/userService";

const Recover = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const recoverPassword = async () => {
    setLoading(true);
    const { data, error } = await recoverPasswordViaEmail(email);
    setLoading(false);
    if (!error) {
      router.push("/");
    }
  };

  return (
    <div className="my-10 flex justify-center">
      <div className="my-5 w-6/12 rounded-lg border border-terciary-100">
        <div className="grid grid-cols-2 justify-around border-b border-terciary-100">
          <div className="p-3 text-center">Iniciar sessão</div>

          <Link href="/auth/register">
            <a className="border-l border-terciary-100 p-3 text-center">Registar</a>
          </Link>
        </div>
        <div className="p-3">
          <div className="font-bold">Introduza o email.</div>
          <div className="mt-3">
            <div>Email</div>
            <div className="mt-2">
              <Input
                customCss="w-full rounded-sm border border-terciary-100 py-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </div>
          </div>

          <div className="my-5">
            <button
              onClick={recoverPassword}
              className="w-full rounded-lg bg-primary-500 py-2 text-white"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Recuperar password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recover;
