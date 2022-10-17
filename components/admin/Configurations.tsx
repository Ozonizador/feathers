import Link from "next/link";
import { TextInput } from "flowbite-react/lib/esm/components";
import { Label } from "flowbite-react/lib/esm/components";
import FeathersCheckbox from "../common/FeathersCheckbox";
import useUserService from "../../services/userService";
import { useState } from "react";
import { toast } from "react-toastify";
// PÁGINA 36

const Configurations = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { updateUserPassword } = useUserService();
  const updatePassword = () => {
    if (password !== confirmPassword) {
      return toast("Palavras passe não coincidem.");
    }
    updateUserPassword(password);
  };

  return (
    <>
      <div className="container mx-auto mb-20 lg:w-10/12 ">
        <div className="font-b my-10 text-xl">
          <Link href="/admin">Conta</Link>
          {" > Configurações"}
        </div>

        <div className="flex flex-1 justify-center">
          <div className="w-full rounded-2xl border border-terciary-700 bg-terciary-300 p-10 px-0 lg:px-32">
            <div className="mx-auto w-full px-5 lg:w-full">
              <div className="text-3xl font-bold">Configurações</div>
              {/* password */}
              <div>
                <div className="mt-4  mb-8 text-2xl font-bold">Alterar password</div>
                <div>
                  <div className="mb-2 block">
                    <div className="my-3">
                      <Label htmlFor="Palavra passe nova" value="Palavra passe nova" />
                      <TextInput
                        id="passwordNew"
                        type="password"
                        required={true}
                        shadow={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Label htmlFor="Repita palavra passe nova" value="Repita palavra passe nova" />
                    <TextInput
                      id="passwordRepeat"
                      type="password"
                      required={true}
                      shadow={true}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-1">
                  <button
                    className="my-10 flex w-full items-center justify-center rounded-md bg-primary-500 py-4 px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-56"
                    onClick={updatePassword}
                  >
                    Alterar password
                  </button>
                </div>
              </div>

              {/* Notificações */}
              <div className="mt-10">
                <div className="my-4 text-2xl font-bold">Notificações</div>
                <h6>Receber notificações de Unihosts</h6>
                <div className="my-3 flex flex-1 flex-col">
                  <div className="my-2 flex flex-col lg:flex-row lg:items-center">
                    <div className="flex items-center">
                      <p className="w-32 text-base font-bold">Por email</p>
                      <div className="flex flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:my-0 lg:ml-6">
                        <div>
                          <div className="flex h-5 items-center">
                            <FeathersCheckbox selected={true} onChangeFn={() => {}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="my-2 flex flex-col lg:flex-row lg:items-center">
                    <div className="flex items-center">
                      <p className="w-32 text-base font-bold">Por mensagem</p>
                      <div className="flex flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:my-0 lg:ml-6">
                        <div>
                          <div className="flex h-5 items-center">
                            <FeathersCheckbox selected={true} onChangeFn={() => {}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Configurations;
