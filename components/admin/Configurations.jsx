import Button from "../utils/Button";
import Input from "../utils/Input";

const Configurations = () => {
  return (
    <>
      <div className="flex flex-1 justify-center">
        <div className="lg:px-30 w-9/12 bg-terciary-300 py-10">
          <div className="text-3xl font-bold">Configurações</div>
          {/* Primeiros dois */}
          <div>
            <div className="text-2xl font-bold">Alterar password</div>
            <div>
              <Input onChange={() => {}} label="oldpassword" labelText="Palavra passe atual" />
              <Input onChange={() => {}} label="newpassword" labelText="Palavra passe nova" />
              <Input
                onChange={() => {}}
                label="confirmpassword"
                labelText="Repita palavra passe nova"
              />
              <Button text="Alterar password" onClick={() => {}}></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Configurations;
