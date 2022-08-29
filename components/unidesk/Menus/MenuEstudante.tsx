import React from "react";
import Link from "next/link";
import { TiLockClosed } from "react-icons/ti";

const MenuEstudante = () => {
  return (
    <div className=" w-80 rounded-2xl bg-terciary-600 p-2">
      <div className="flex justify-start border-b border-b-primary-500 px-2 align-middle">
        <Link href="/unidesk/estudante/stay">
          <h1 className="pt-7 pb-4 pl-1 text-xl font-bold">Minha estadia</h1>
        </Link>
      </div>
      <div className="flex flex-col justify-start px-2">
        <div className="flex flex-col gap-2">
          <>
            <div className="mt-7 mb-4 flex rounded-lg bg-primary-500 py-4">
              <Link href="/unidesk/estudante/stay">
                <a>
                  <span className="ml-2">Informações gerais</span>
                </a>
              </Link>
            </div>
            <div className="flex">
              <Link href="/">
                <a className=" mb-4 flex flex-row items-center">
                  <TiLockClosed className="my-auto" />
                  Renda
                </a>
              </Link>
            </div>
            <div className="flex">
              <Link href="/">
                <a className=" mb-4 flex flex-row items-center">
                  <TiLockClosed className="my-auto" />
                  Reparações
                </a>
              </Link>
            </div>
            <div className="flex">
              <Link href="/">
                <a className=" mb-4 flex flex-row items-center">
                  <TiLockClosed className="my-auto" />
                  Despesas
                </a>
              </Link>
            </div>
            <div className="flex">
              <Link href="/">
                <a className=" mb-4 flex flex-row items-center">
                  <TiLockClosed className="my-auto" />
                  Informações contratuais
                </a>
              </Link>
            </div>
          </>
        </div>
      </div>

      <div className="my-4 ml-2 flex flex-col  gap-4 text-xl">
        <Link href="/unidesk/estudante/favourites">Favoritos</Link>
      </div>
      <div className="my-4 ml-2 flex flex-col  gap-4 text-xl">
        <Link href="/unidesk/inbox">Caixa de Entrada</Link>
      </div>
      <div className="my-4  ml-2 flex flex-col  gap-4 text-xl">
        <Link href="/unidesk/notifications">Notificações</Link>
      </div>
      <div className="h-2"></div>
    </div>
  );
};

export default MenuEstudante;
