import Link from "next/link";
import Button from "../utils/Button";
import Input from "../utils/Input";
import { TextInput } from "flowbite-react/lib/esm/components";
import { Label } from "flowbite-react/lib/esm/components";
// PÁGINA 36

const Configurations = () => {
  return (
    <>
      <div className="container mx-auto mb-20 lg:w-10/12 ">
        <div className="font-b my-10 text-xl">
          <Link href="/admin">Conta</Link>
          {" > Configurações"}
        </div>

        <div className="flex flex-1 justify-center">
          <div className="w-full rounded-2xl border border-terciary-700 bg-terciary-300 p-10 px-0 lg:px-32">
            <div className="mx-auto w-full px-5 lg:w-1/3">
              <div className="text-3xl font-bold">Configurações</div>
              {/* password */}
              <div>
                <div className="mt-4  mb-8 text-2xl font-bold">Alterar password</div>
                <div>
                  <div className="mb-2 block">
                    {/* <Label htmlFor="Palavra passe atual" value="Palavra passe atual" />
                    <TextInput id="password" type="password" required={true} shadow={true} /> */}

                    <div className="my-3">
                      <Label htmlFor="Palavra passe nova" value="Palavra passe nova" />
                      <TextInput id="passwordNew" type="password" required={true} shadow={true} />
                    </div>
                    <Label htmlFor="Repita palavra passe nova" value="Repita palavra passe nova" />
                    <TextInput id="passwordRepeat" type="password" required={true} shadow={true} />
                  </div>
                </div>
                <div className=" flex flex-1 ">
                  {/* <Button text="Alterar password" onClick={() => { }} ></Button> */}

                  <button
                    className="my-10 flex w-full items-center justify-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-56"
                    // onClick={saveChanges}
                  >
                    Alterar password
                  </button>
                </div>
              </div>

              {/* Notificações */}
              <div className="mt-10">
                <div className="my-4 text-2xl font-bold">Notificações</div>
                <h6>Receber notificações de unihosts</h6>
                <div className="my-3 flex flex-1 flex-col">
                  <div className="my-2 flex flex-col lg:flex-row lg:items-center">
                    <div className="flex items-center">
                      <p className="w-32 text-base font-bold">Por email</p>
                    </div>

                    <div className="my-4 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:my-0 lg:ml-6">
                      <div className="mr-16 text-base">Sim</div>
                      <div>
                        <div className="flex h-5 items-center">
                          <input type="checkbox" className=" h-4 w-4 rounded border border-terciary-500" />
                        </div>
                      </div>
                    </div>

                    <div className="flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:ml-6">
                      <div className="mr-16 text-base">Não</div>
                      <div>
                        <div className="flex h-5 items-center">
                          <input type="checkbox" className=" h-4 w-4 rounded border border-terciary-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="my-2 flex flex-col lg:flex-row lg:items-center">
                    <div className="flex items-center">
                      <p className="w-32 text-base font-bold">Por mensagem</p>
                    </div>

                    <div className="my-4 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:my-0 lg:ml-6">
                      <div className="mr-16 text-base">Sim</div>
                      <div>
                        <div className="flex h-5 items-center">
                          <input type="checkbox" className=" h-4 w-4 rounded border border-terciary-500" />
                        </div>
                      </div>
                    </div>

                    <div className="flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:ml-6">
                      <div className="mr-16 text-base">Não</div>
                      <div>
                        <div className="flex h-5 items-center">
                          <input type="checkbox" className=" h-4 w-4 rounded border border-terciary-500" />
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
