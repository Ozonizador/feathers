import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Input from "../../components/utils/Input";
import { REGISTER_URL } from "../../models/paths";
import useUserService from "../../hooks/userService";
import Button from "../../components/utils/Button";

const Recover = () => {
  const router = useRouter();
  const { recoverPasswordViaEmail } = useUserService();
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

          <Link href={REGISTER_URL}>
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
            <Button type="button" onClick={recoverPassword} loading={loading}>
              Recuperar password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recover;
