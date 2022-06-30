import Link from "next/link";
import Button from "../utils/Button";
import Input from "../utils/Input";

const Configurations = () => {
  return (
    <>
      <div className="mb-10 px-36">
        <Link href="/admin">Conta</Link>
        {" > Configurações"}
      </div>
      <div className="mb-20 flex flex-1 justify-center">
        <div className="w-9/12 rounded-lg bg-terciary-300 px-10  py-10 lg:px-36">
          <div className="text-3xl font-bold">Configurações</div>
          {/* password */}
          <div>
            <div className="my-4 text-2xl font-bold">Alterar password</div>
            <div>
              <Input onChange={() => {}} label="oldpassword" labelText="Palavra passe atual" />
              <Input onChange={() => {}} label="newpassword" labelText="Palavra passe nova" />
              <Input
                onChange={() => {}}
                label="confirmpassword"
                labelText="Repita palavra passe nova"
              />
            </div>
            <div className="mt-3 flex flex-1 justify-center">
              <Button text="Alterar password" onClick={() => {}}></Button>
            </div>
          </div>

          {/* Notificações */}
          <div className="mt-10">
            <div className="my-4 text-2xl font-bold">Notificações</div>
            <h6>Receber notificações de unihosts</h6>
            <div className="my-3 flex flex-1">
              <div>Por e-mail</div>
              <div className="mx-auto">
                <input type="checkbox"></input>
                <label className="ml-2">sim</label>
              </div>
              <div className="ml-auto">
                <input type="checkbox"></input>
                <label className="ml-2">não</label>
              </div>
            </div>
            <div className="my-3 flex flex-1">
              <div>Por mensagem</div>
              <div className="mx-auto">
                <input type="checkbox"></input>
                <label className="ml-2">sim</label>
              </div>
              <div className="ml-auto">
                <input type="checkbox"></input>
                <label className="ml-2">não</label>
              </div>
            </div>
          </div>
          {/* Localização */}
          <div className="mt-10">
            <div className="my-4 text-2xl font-bold">Localização</div>
            <h6>Permitir que unihosts rastreie a minha localização ao usar</h6>
            <div>SELECT MISSING HERE</div>
            <div>SELECT MISSING HERE</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Configurations;
