import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TiLockClosed } from "react-icons/ti";

const MenuEstudante = () => {
  return (
    <div>
      <div className="w-64">
        <div className="flex justify-start border-b border-b-primary-500 px-2 align-middle">
          <h1 className="text-xl font-bold ">Minha estadia</h1>
        </div>
        <div className="flex flex-col justify-start px-2">
          <div className="flex flex-col gap-2">
            <>
              <div className="flex">
                <Link href="">
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
      </div>
      <div className="my-4 flex flex-col  gap-4 text-xl">
        <Link href="/unidesk/estudante/favourites">Favoritos</Link>
      </div>
      <div className="my-4 flex flex-col  gap-4 text-xl">
        <Link href="/unidesk/inbox">Caixa de Entrada</Link>
      </div>
      <div className="my-4 flex flex-col  gap-4 text-xl">
        <Link href="/unidesk/notifications">Notificações</Link>
      </div>
      <div className="h-2"></div>
    </div>
  );
};

export default MenuEstudante;
