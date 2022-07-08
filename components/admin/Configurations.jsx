import Link from "next/link";
import Button from "../utils/Button";
import Input from "../utils/Input";
import { TextInput } from "flowbite-react/lib/esm/components";
import { Label } from "flowbite-react/lib/esm/components";
// PÁGINA 36


const Configurations = () => {
  return (
    <>

      <div className=" w-10/12 mx-auto mb-20 ">
        <div className="my-10 text-xl font-b">
          <Link href="/admin">Conta</Link>
          {" > Configurações"}
        </div>

        <div className="flex flex-1 justify-center">
          <div className="w-full bg-terciary-300 p-10 border border-terciary-700 rounded-2xl px-32">
            <div className="mx-auto w-1/3">
              <div className="text-3xl font-bold">Configurações</div>
              {/* password */}
              <div>
                <div className="mt-4  mb-8 text-2xl font-bold">Alterar password</div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Palavra passe atual" value="Palavra passe atual" />
                    <TextInput id="password" type="password" required={true} shadow={true}
                    />

                    <div className="my-3">
                      <Label htmlFor="Palavra passe nova" value="Palavra passe nova" />
                      <TextInput id="passwordNew" type="password" required={true} shadow={true}
                      />
                    </div>
                    <Label htmlFor="Repita palavra passe nova" value="Repita palavra passe nova" />
                    <TextInput id="passwordRepeat" type="password" required={true} shadow={true}
                    />
                  </div>


                  {/* INPUTS PAULO */}

                  {/* <Input onChange={() => { }} label="oldpassword" labelText="Palavra passe atual" />
                  <Input onChange={() => { }} label="newpassword" labelText="Palavra passe nova" />
                  <Input
                    onChange={() => { }}
                    label="confirmpassword"
                    labelText="Repita palavra passe nova"
                  /> */}
                </div>
                <div className="mt-8 flex flex-1 ">
                  <Button text="Alterar password" onClick={() => { }}></Button>
                </div>
              </div>

              {/* Notificações */}
              <div className="mt-10">
                <div className="my-4 text-2xl font-bold">Notificações</div>
                <h6>Receber notificações de unihosts</h6>
                <div className="my-3 flex flex-col flex-1">

                  <div className="flex items-center my-2">
                    <div className="flex items-center">
                      <p className="font-bold text-base w-32">Por email</p>
                    </div>

                    <div className="w-40 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                      <div className="text-base mr-16">
                        Sim
                      </div>
                      <div>
                        <div className="flex items-center h-5">
                          <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                        </div>
                      </div>
                    </div>

                    <div className="w-40 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                      <div className="text-base mr-16">
                        Não
                      </div>
                      <div>
                        <div className="flex items-center h-5">
                          <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center my-8">
                    <div className="flex items-center">
                      <p className="font-bold text-base w-32">Por mensagem</p>
                    </div>

                    <div className="w-40 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                      <div className="text-base mr-16">
                        Sim
                      </div>
                      <div>
                        <div className="flex items-center h-5">
                          <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                        </div>
                      </div>
                    </div>

                    <div className="w-40 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                      <div className="text-base mr-16">
                        Não
                      </div>
                      <div>
                        <div className="flex items-center h-5">
                          <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Localização */}
              <div className="mt-10">
                <div className="my-4 text-2xl font-bold">Localização</div>
                <h6 className="my-6">Permitir que unihosts rastreie a minha localização ao usar</h6>
                <div className="flex items-center h-5">
                  <select className="rounded-md border  border-solid border-terciary-500 bg-white py-2 px-3 w-60 ">
                    <option>Idioma</option>
                    <option>Casa</option>
                    <option>Apartamento</option>
                  </select>
                </div>


                <div className="flex items-center h-5 my-8">
                  <select className="rounded-md border  border-solid border-terciary-500 bg-white py-2 px-3 w-60 ">
                    <option>Moeda</option>
                    <option>Casa</option>
                    <option>Apartamento</option>
                  </select>
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
