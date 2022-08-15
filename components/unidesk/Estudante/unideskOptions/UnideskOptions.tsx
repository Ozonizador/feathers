import React from "react";
import Image from "next/image";
import Link from "next/link";

const UnideskOptions = () => {
  return (
    <section className="container mx-auto my-32 flex flex-col gap-7 lg:flex-row">
      {/* OPTION1 */}
      <div className="flex flex-col gap-1 rounded-2xl bg-white p-5 pb-10 drop-shadow-2xl lg:w-2/6">
        <div className="flex flex-1 flex-col items-center pt-12 align-middle">
          <Image src="/images/icon-pg14-1.svg" alt="" height="80" width="80"></Image>
          <h1 className="my-4 text-center text-2xl font-bold text-primary-500">Minha estadia</h1>
        </div>
        <Link href="/unidesk/estudante/stay">
          <a className="text-xl">Informações gerais</a>
        </Link>
        <div className="flex flex-row">
          <Image className="object-scale-down" src="/images/icon-pg14-5.svg" alt="" height="25" width="25"></Image>
          <p className="my-auto ml-2 py-2 text-xl">Renda</p>
        </div>

        <div className="flex flex-row">
          <Image className="object-scale-down" src="/images/icon-pg14-5.svg" alt="" height="25" width="25"></Image>
          <p className="my-auto ml-2 py-2 text-xl">Reparações</p>
        </div>

        <div className="flex flex-row">
          <Image className="object-scale-down" src="/images/icon-pg14-5.svg" alt="" height="25" width="25"></Image>
          <p className="my-auto ml-2 py-2 text-xl">Despesas</p>
        </div>

        <div className="flex flex-row">
          <Image className="object-scale-down" src="/images/icon-pg14-5.svg" alt="" height="25" width="25"></Image>
          <p className="my-auto ml-2 py-2 text-xl">Informações contratuais</p>
        </div>

        <div></div>
      </div>

      {/* Favourites */}
      <div className="flex cursor-pointer flex-col rounded-2xl bg-white p-5 pb-10 drop-shadow-2xl lg:w-2/6">
        <Link href="/unidesk/estudante/favourites">
          <a>
            <div className="flex flex-1 flex-col items-center pt-12 align-middle">
              <Image src="/images/icon-pg14-2.svg" alt="" height="80" width="80"></Image>
              <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">Favoritos</h1>
            </div>
          </a>
        </Link>
      </div>

      {/* Inbox */}
      <div className="flex cursor-pointer flex-col rounded-2xl bg-white p-5 pb-10 drop-shadow-2xl lg:w-2/6">
        <Link href="/unidesk/inbox">
          <div className="flex flex-col justify-center pt-12">
            <Image src="/images/icon-pg14-3.svg" alt="" height="80" width="80"></Image>
            <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">Caixa de Entrada</h1>
          </div>
        </Link>
      </div>
      <div className="flex cursor-pointer flex-col rounded-2xl bg-white p-5 pb-10 drop-shadow-2xl lg:w-2/6">
        <Link href="/unidesk/notifications">
          {/* Notifications */}
          <div>
            <div className="flex flex-1 flex-col items-center pt-12 align-middle">
              <Image src="/images/icon-pg14-4.svg" alt="" height="80" width="80"></Image>
              <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">Notificações</h1>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default UnideskOptions;
