import React from "react";
import Image from "next/image";
import Link from "next/link";

const UnideskOptions = () => {
  return (
    <section className="container mx-auto my-32 flex gap-7">
      {/* OPTION1*/}
      <div className="flex flex-col rounded-2xl bg-white p-5 pb-10 drop-shadow-2xl lg:w-2/6">
        <div className="flex flex-col justify-center pt-12">
          <Image
            //   className="object-scale-down"
            src="/images/icon-pg37-1.svg"
            alt=""
            height="80"
            width="80"
          ></Image>
          <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">Anúncios</h1>
        </div>

        <div className="flex flex-col justify-start">
          <Link href="unidesk/senhorio/advertisements">
            <a className="mb-5 text-xl font-bold">Painel</a>
          </Link>
          <MyDropdown />
        </div>
        <div className="flex flex-row">
          <Image
            className="object-scale-down"
            src="/images/icon-pg14-5.svg"
            alt=""
            height="25"
            width="25"
          ></Image>
          <p className="my-auto ml-2 py-2 text-xl">Informações contratuais</p>
        </div>
        <Link href="unidesk/senhorio/calendar">
          <a className="my-5 text-xl font-bold">Calendário</a>
        </Link>
        <Link href="unidesk/senhorio/reviews">
          <a className="text-xl font-bold">Reviews</a>
        </Link>
      </div>

      {/* OPTION2 */}
      <div className="flex cursor-pointer flex-col rounded-2xl bg-white p-5 pb-10 drop-shadow-2xl lg:w-2/6">
        <Link href="/unidesk/estudante/favourites">
          <div className="flex flex-col justify-center pt-12">
            <Image src="/images/icon-pg14-3.svg" alt="" height="80" width="80"></Image>
            <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">
              Caixa de entrada
            </h1>
          </div>
        </Link>
      </div>

      {/* OPTION3 */}
      <div className="flex flex-col rounded-2xl bg-white p-5 pb-10 drop-shadow-2xl lg:w-2/6">
        <div className="flex flex-col justify-center pt-12">
          <Image src="/images/icon-pg37-2.svg" alt="" height="80" width="80"></Image>
          <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">Uni-controlo</h1>
        </div>

        <div className="mt-2 flex flex-col justify-start gap-2">
          <Link href="/unidesk/unicontrolo/hospedes">
            <a className="text-xl font-bold">Hóspedes</a>
          </Link>
          <div className="flex flex-1 items-center">
            <Image src="/images/icon-pg37-3.svg" alt="" height={24} width={24}></Image>
            <p className="ml-3 text-xl font-bold">Transações</p>
          </div>
          <div className="flex flex-1 items-center">
            <Image src="/images/icon-pg37-3.svg" alt="" height={24} width={24}></Image>
            <p className="ml-3 text-xl font-bold">Despesas</p>
          </div>
          <div className="flex flex-1 items-center ">
            <Image src="/images/icon-pg37-3.svg" alt="" height={24} width={24}></Image>
            <p className="ml-3 text-xl font-bold">Reparações</p>
          </div>
        </div>
      </div>

      {/* OPTION4 */}
      <div className="flex cursor-pointer flex-col rounded-2xl bg-white p-5 pb-10 drop-shadow-2xl lg:w-2/6">
        <Link href="/unidesk/notifications">
          <div className="flex flex-1 flex-col items-center pt-12 align-middle">
            <Image src="/images/icon-pg14-4.svg" alt="" height="80" width="80"></Image>
            <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">Notificações</h1>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default UnideskOptions;

import { Menu } from "@headlessui/react";

function MyDropdown() {
  return (
    <Menu>
      <div className="flex justify-between">
        <Menu.Button className="text-left text-xl font-bold">Anúncios</Menu.Button>
        <div className="">&#9660;</div>
      </div>
      <Menu.Items className="flex flex-col justify-start">
        <Menu.Item>
          {({ active }) => (
            <a className="" href="">
              <p className="my-auto ml-2 py-2 text-xl">
                <span className="text-2xl text-primary-500">&#8226;</span> Detalhes dos anúncios
              </p>
            </a>
          )}
        </Menu.Item>

        <Menu.Item>
          <a className="" href="">
            <p className="my-auto ml-2 py-2 text-xl">
              <span className="text-2xl text-primary-500">&#8226;</span> Fotos
            </p>
          </a>
        </Menu.Item>

        <Menu.Item>
          {({ active }) => (
            <a // className={`${active && 'bg-blue-500'}`}
              href="/account-settings"
            >
              <p className="my-auto ml-2 py-2 text-xl">
                <span className="text-2xl text-primary-500">&#8226;</span> Condições e regras
              </p>
            </a>
          )}
        </Menu.Item>

        <Menu.Item>
          {({ active }) => (
            <a // className={`${active && 'bg-blue-500'}`}
              href="/account-settings"
            >
              <p className="my-auto ml-2 py-2 text-xl">
                <span className="text-2xl text-primary-500">&#8226;</span> Preços
              </p>
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
