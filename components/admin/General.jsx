import React from "react";
import Link from "next/link";
import Input from "../utils/Input";

/*
    pagina 32 do XD
*/

const MainMenu = () => {
  return (
    <div className="px-36">
      <div className="mb-10">
        <Link href="/admin">Conta</Link>
        {" > Informações pessoais"}
      </div>
      <div className="flex flex-1 justify-center">
        <div className="w-9/12 bg-terciary-300 p-10">
          <div>Informações pessoais</div>
          <div>Avatar</div>
          {/* Primeiros dois */}
          <div className="flex flex-1">
            <div className="mr-3 w-1/2">
              <Input onChange={() => {}} label="nome" labelText="Nome" />
            </div>
            <div className="ml-3 w-1/2">
              <Input onChange={() => {}} label="apelido" labelText="Apelido" />
            </div>
          </div>
          {/* segunda linha */}
          <div className="flex flex-1">
            <div className="w-1/2">
              <span>Data de nascimento</span>
              <div className="flex flex-1 justify-around">
                <Input onChange={() => {}} label="apelido" />
                <Input onChange={() => {}} label="apelido" />
                <Input onChange={() => {}} label="apelido" />
              </div>
            </div>
            <div>
              <label>Género</label>
              <input></input>
            </div>
          </div>
          <div className="flex flex-1">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
