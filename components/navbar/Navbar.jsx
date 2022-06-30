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

export const Navbar = () => {
  const [enabled, setEnabled] = useState(false);
  const { user, error } = useUser();

  return (
    <header>
      <div className="mx-32 mb-5">
        <div>
          <div className="flex flex-wrap py-2">
            <div className="flex">
              <div className="flex">
                <ImPhone className="my-auto mr-1" />
                <p className="mr-3">+351 914 626 616</p>
              </div>
              <div className="flex">
                <GrMail className="my-auto mr-1" />
                <p>info@unihost.pt</p>
              </div>
            </div>

            <div className="flex lg:ml-auto">
              <Socials type="primary" />
              <div className="right-dropdown flex">
                <Image src="/images/icon-uk.jpg" height={16} width={32} alt="" />
                <select name="" id="">
                  <option value="" disabled>
                    EN
                  </option>
                  <option value="">PT</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-5 lg:flex lg:flex-1 lg:justify-between lg:align-middle">
            <div className="hidden lg:block">
              <Link href="/">
                <a>
                  <Image
                    src="/images/logo1.png"
                    alt=""
                    className="logo cursor-pointer"
                    height={55}
                    width={208}
                  ></Image>
                </a>
              </Link>
            </div>
            <nav className="mx-10 my-auto">
              <ul className=" flex flex-wrap">
                <li className="px-5">
                  <Link href="/">Home</Link>
                </li>
                <div className="relative w-72">
                  <Menu as="div" className="absolute ml-5 w-full">
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
                      <Menu.Items className="flex w-3/4 flex-col bg-white p-2 shadow-md">
                        <Menu.Item>
                          <MyLink customClass="py-1" href="/funciona">
                            Como funciona?
                          </MyLink>
                        </Menu.Item>
                        <Menu.Item>
                          <MyLink customClass="py-1" href="/estadia">
                            Anunciar!
                          </MyLink>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <li className="px-5">
                  <Link href="/8">Blog</Link>
                </li>
                <li className="px-5">
                  <Link href="/contactos">Contactos</Link>
                </li>
              </ul>
            </nav>

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
              <div className="my-auto flex">
                <div>
                  <span className="mr-2 text-lg">Estudante</span>
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500"
                  >
                    <span
                      className={`${
                        enabled ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white`}
                    />
                  </Switch>
                  <span className="ml-2 text-lg">Senhorio</span>
                </div>
                <div className="relative w-56">
                  <Menu as="div" className="absolute ml-5 w-56">
                    <Menu.Button className="flex flex-1">
                      <Image
                        unoptimized={true}
                        src={user.user_metadata.avatar_url}
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
                      <Menu.Items className="flex w-3/4 flex-col bg-white p-2 shadow-md">
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
    </header>
  );
};

export default Navbar;
