import React from "react";
import Link from "next/link";
import Input from "../utils/Input";

/*
    pagina 32 do XD
*/

const MainMenu = () => {
  return (
    <div className=" w-10/12 mx-auto mb-20 ">
      <div className="my-10 text-xl font-b">
        <Link href="/admin">Conta</Link>
        {" > Informações pessoais"}
      </div>


      <div className="flex flex-1 justify-center">
        <div className="w-full bg-terciary-300 p-10 border border-terciary-700 rounded-2xl px-32">
          <div className="font-bold text-3xl">Informações pessoais</div>
          <div className="mb-20">Avatar</div>
          {/* Primeiros dois */}

          <div className="flex flex-row justify-between gap-12">

            <div className="w-1/2">
              <Input onChange={() => { }} label="nome" labelText="Nome" />


            </div>



            <div className="w-1/2">
              <Input onChange={() => { }} label="apelido" labelText="Apelido" />
            </div>


          </div>
        </div>
      </div>
    </div>

  );
};

export default MainMenu;
