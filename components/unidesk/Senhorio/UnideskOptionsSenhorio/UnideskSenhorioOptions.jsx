import React from "react";
import Image from "next/image"
import Link from "next/link"





const UnideskOptions = () => {
  return (
    <section className="container mx-auto flex gap-7 my-32">


      {/* OPTION1*/}
      <div className="flex flex-col rounded-2xl bg-white p-5 drop-shadow-2xl pb-10 lg:w-2/6">
        <div className="pt-12 flex flex-col justify-center">
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
          <p className="text-xl font-bold mb-5">Painel</p>
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
        <p className="text-xl font-bold my-5">Calendário</p>
        <p className="text-xl font-bold">Reviews</p>

      </div>



      {/* OPTION2 */}
      <div className="flex flex-col rounded-2xl bg-white p-5 drop-shadow-2xl pb-10 lg:w-2/6">
        <div className="pt-12 flex flex-col justify-center">
          <Image
            src="/images/icon-pg14-3.svg"
            alt=""
            height="80"
            width="80"
          ></Image>
          <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">Caixa de entrada</h1>
        </div>

        <div className="flex flex-col justify-start">
          <p className="text-xl font-bold mb-5">Pedidos de reserva</p>
          <p className="text-xl font-bold">Mensagens</p>
        </div>
      </div>



      {/* OPTION3 */}
      <div className="flex flex-col rounded-2xl bg-white p-5 drop-shadow-2xl pb-10 lg:w-2/6">
        <div className="pt-12 flex flex-col justify-center">
          <Image
            src="/images/icon-pg37-2.svg"
            alt=""
            height="80"
            width="80"
          ></Image>
          <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">Uni-controlo</h1>
        </div>

        <div className="flex flex-col justify-start">
          <p className="text-xl font-bold mb-5">Hóspedes</p>
          <p className="text-xl font-bold mb-5">Transações</p>
          <p className="text-xl font-bold mb-5">Despesas</p>
          <p className="text-xl font-bold mb-20">Reparações</p>
        </div>

        <Image
          src="/images/icon-pg37-3.svg"
          alt=""
          height="80"
          width="80"
        ></Image>
      </div>




      {/* OPTION4 */}
      <div className="flex flex-col rounded-2xl bg-white p-5 drop-shadow-2xl pb-10 lg:w-2/6">
        <div>
          <div className="flex flex-1 flex-col items-center align-middle pt-12">
            <Image
              src="/images/icon-pg14-4.svg"
              alt=""
              height="80"
              width="80"
            ></Image>
            <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">Notificações</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnideskOptions;

import { Menu } from '@headlessui/react'

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
              <p className="my-auto ml-2 py-2 text-xl"><span className="text-primary-500 text-2xl">&#8226;</span> Detalhes dos anúncios</p>
            </a>
          )}
        </Menu.Item>

        <Menu.Item>

          <a className="" href="">
            <p className="my-auto ml-2 py-2 text-xl"><span className="text-primary-500 text-2xl">&#8226;</span> Fotos</p>
          </a>

        </Menu.Item>

        <Menu.Item>
          {({ active }) => (
            <a // className={`${active && 'bg-blue-500'}`}
              href="/account-settings">
              <p className="my-auto ml-2 py-2 text-xl"><span className="text-primary-500 text-2xl">&#8226;</span> Condições e regras</p>
            </a>
          )}
        </Menu.Item>

        <Menu.Item>
          {({ active }) => (
            <a // className={`${active && 'bg-blue-500'}`}
              href="/account-settings">
              <p className="my-auto ml-2 py-2 text-xl"><span className="text-primary-500 text-2xl">&#8226;</span> Preços</p>
            </a>
          )}
        </Menu.Item>



      </Menu.Items>
    </Menu>
  )
}