import React, { Fragment, useState } from "react";
import { ImPhone } from "react-icons/im";
import { GrMail } from "react-icons/gr";
import { VscTriangleDown } from "react-icons/vsc";
import Socials from "../socials/Socials";
import Link from "next/link";
import Image from "next/image";
import { Menu, Switch, Transition } from "@headlessui/react";
import MyLink from "../utils/MyLink";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

/* import person image */
import person from "../../public/images/person.png";
import ukFlag from "../../public/images/icon-uk.jpg";
import { useGetUserType, useToggleUserType } from "../../context/MainProvider";

export const Navbar = () => {
  const { user } = useUser();

  const { toggleUserType } = useGetUserType();
  const toggleUserTypeContext = useToggleUserType();

  /* Changing the toggle senhorio estudante */
  const toggleSenhorioEstudante = () => {
    if (!user) {
      return;
    }

    if (toggleUserType === "ESTUDANTE") {
      toggleUserTypeContext("SENHORIO");
    } else {
      toggleUserTypeContext("ESTUDANTE");
    }
  };

  return (
    <header>
      <nav className="mx-28 mb-5">
        <div>
          <div className="hidden flex-wrap border-b border-terciary-700 py-2 lg:flex">
            {/* CONTACTS */}
            <div className="flex">
              <div className="my-auto mr-3 flex">
                <ImPhone className="mr-1 self-center" />
                <p>+351 914 626 616</p>
              </div>
              <div className="my-auto flex">
                <GrMail className="mr-1 self-center" />
                <p>info@unihost.pt</p>
              </div>
            </div>

            {/* SOCIAL MEDIA + FLAG */}
            <div className="flex lg:ml-auto">
              <div className="my-auto">
                <Socials type="primary" />
              </div>
              <div className="flex h-10">
                <Image src={ukFlag} alt="" />
                <select className="ml-2 border-none">
                  <option value="eng" disabled>
                    EN
                  </option>
                  <option value="pt">PT</option>
                </select>
              </div>
            </div>
          </div>
          <div className="my-5 lg:flex lg:flex-1 lg:gap-5">
            <div className="lg:block">
              <Link href="/">
                <a>
                  <Image
                    src="/images/logo1.png"
                    alt=""
                    className="cursor-pointer"
                    height={55}
                    width={208}
                  ></Image>
                </a>
              </Link>
            </div>

            <div className="mx-auto my-auto hidden lg:block">
              <div className="flex">
                <div className="w-fit">
                  <Menu as="div" className="z-50 ml-5 w-full">
                    <Menu.Button className="flex flex-1">
                      <div>Anuncie a sua propriedade</div>
                      <div className="my-auto ml-auto">
                        <VscTriangleDown className="w-8 text-[#2C3E50]" />
                      </div>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute z-50 flex w-52 flex-col bg-white p-2 shadow-md">
                        <Menu.Item>
                          <MyLink customClass="py-1 w-full" href="/funciona">
                            Como funciona?
                          </MyLink>
                        </Menu.Item>
                        <Menu.Item>
                          <MyLink customClass="py-1 w-full" href="/anunciar">
                            Anunciar!
                          </MyLink>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="px-5">
                  <Link href="/blog">Blog</Link>
                </div>
                <div className="px-5">
                  <Link href="/contactos">Contactos</Link>
                </div>
              </div>
            </div>
            <div className="my-auto ml-auto hidden lg:block ">
              <div>
                {!user && (
                  <div className="my-auto flex">
                    <Link href="/auth/register">
                      <a className="p-0">
                        <div className="mr-2 rounded border-2 border-primary-500 px-6 py-3 text-center text-sm text-primary-500 duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl">
                          Registar
                        </div>
                      </a>
                    </Link>

                    <Link href="/auth/login">
                      <a className="p-0">
                        <div className="mr-2 rounded border-2 border-primary-500 bg-primary-500 px-6 py-3 text-center text-sm text-white duration-200 ease-in hover:drop-shadow-xl">
                          Iniciar sessão
                        </div>
                      </a>
                    </Link>
                  </div>
                )}
                {user && (
                  <div className="flex flex-1">
                    <div>
                      <span className="mr-2">Estudante</span>
                      <Switch
                        checked={true}
                        onChange={toggleSenhorioEstudante}
                        className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500"
                      >
                        <span
                          className={`${
                            toggleUserType === "SENHORIO" ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white`}
                        />
                      </Switch>
                      <span className="ml-2">Senhorio</span>
                    </div>
                    <div>
                      <Menu as="div" className="ml-5">
                        <Menu.Button className="flex flex-1">
                          <Image
                            unoptimized={true}
                            src={user.user_metadata.avatar_url || person}
                            height={32}
                            width={32}
                            alt=""
                            className="rounded-lg"
                          />
                          <p className="my-auto ml-2">{user.user_metadata.name}</p>
                          <div className="my-auto ml-auto">
                            <VscTriangleDown className="w-8 text-[#2C3E50]" />
                          </div>
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute z-50 flex flex-col bg-white p-2 px-4 shadow-md">
                            <Menu.Item>
                              <MyLink customClass="py-1" href="/unidesk">
                                Uni-desk
                              </MyLink>
                            </Menu.Item>
                            <Menu.Item>
                              <MyLink customClass="py-1" href="/estadia">
                                Minha Estadia
                              </MyLink>
                            </Menu.Item>
                            <Menu.Item>
                              <MyLink customClass="py-1" href="/favorites">
                                Favoritos
                              </MyLink>
                            </Menu.Item>
                            <Menu.Item>
                              <MyLink customClass="py-1" href="/caixa_entrada">
                                Caixa de Entrada
                              </MyLink>
                            </Menu.Item>
                            <Menu.Item>
                              <MyLink customClass="py-1" href="/notifications">
                                Notificações
                              </MyLink>
                            </Menu.Item>
                            <div className="h-[1px] w-full bg-neutral-600 px-1"></div>
                            <Menu.Item>
                              <MyLink customClass="py-1" href="/admin">
                                Conta
                              </MyLink>
                            </Menu.Item>
                            <Menu.Item>
                              <MyLink customClass="py-1" href="/notifications">
                                Ajuda
                              </MyLink>
                            </Menu.Item>
                            <Menu.Item>
                              <div className="py-1" onClick={() => supabaseClient.auth.signOut()}>
                                Sair
                              </div>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
