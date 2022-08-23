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

import { TiLockClosed } from "react-icons/ti";
import classNames from "classnames";
/* import person image */
import person from "../../public/images/person.png";
import ukFlag from "../../public/images/icon-uk.jpg";
import { useGetUserType, useToggleUserType } from "../../context/MainProvider";
import { useRouter } from "next/router";
import { CgMenuLeft } from "react-icons/cg";

export const NavbarMobile = () => {
  const { user } = useUser();
  const router = useRouter();

  const { toggleUserType } = useGetUserType();
  const toggleUserTypeContext = useToggleUserType();

  const setModoSenhorio = () => {
    toggleUserTypeContext("SENHORIO");
    router.push("/unidesk");
  };

  const openMobileMenu = () => {};
  const [summary2, setSummary2] = useState(false);

  return (
    <>
      <div className="flex h-screen w-full flex-col  px-5">
        <div className="my-5 flex justify-between">
          <div>
            <Link href="/">
              <a>
                <Image src="/images/logo1.png" alt="" className="cursor-pointer" height={35} width={108}></Image>
              </a>
            </Link>
          </div>
          <div className=" rounded-full border border-black p-2  lg:hidden" onClick={openMobileMenu}>
            <CgMenuLeft size={22} />
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="text-xl font-semibold">
            <Link href="/">Home</Link>
          </div>

          <div className="mt-3">
            <div
              className="flex flex-1 items-center "
              onClick={() => {
                setSummary2(!summary2);
              }}
            >
              <div>
                <p className="">Anuncie a sua propriedade</p>
              </div>

              <Image
                src={summary2 ? "/images/icons8-sort-down-30.png" : "/images/icons8-sort-up-30.png"}
                height={32}
                width={32}
                alt=""
              />
            </div>
            {summary2 && (
              <div className="flex ">
                <>
                  <div className="flex flex-col gap-2 text-base">
                    <div className="mt-2">
                      <Link href="/unidesk/unicontrolo/guests">Como funciona?</Link>
                    </div>
                    <div>
                      <Link href="/unidesk/unicontrolo/guests">Anunciar!</Link>
                    </div>
                  </div>
                </>
              </div>
            )}

            <div className="mt-3">
              <Link href="/blog">Blog</Link>
            </div>

            <div className="mt-3">
              <Link href="/contactos">Contactos</Link>
            </div>
          </div>

          {/* <Menu as="div" className="z-50 ml-5 w-full">
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
          </Menu> */}

          <div className="mt-7 flex justify-center rounded-lg bg-gray-100 py-4">
            <span className="mr-2">Estudante</span>
            <Switch
              checked={true}
              // onChange={toggleSenhorioEstudante}
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-primary-500"
            >
              <span
                className={`${
                  toggleUserType === "SENHORIO" ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
            <span className="ml-2">Senhorio</span>
          </div>
        </div>
      </div>
    </>

    // <header>
    //   <nav className="mx-6 mb-5 lg:mx-28">
    //     <div>
    //       <div className="hidden flex-wrap border-b border-terciary-700 py-2 lg:flex">{/* SOCIAL MEDIA + FLAG */}</div>
    //       <div className="my-5 flex lg:gap-5">
    //         <div className="lg:block">
    //           <Link href="/">
    //             <a>
    //               <Image src="/images/logo1.png" alt="" className="cursor-pointer" height={55} width={208}></Image>
    //             </a>
    //           </Link>
    //         </div>
    //         <div className="my-auto ml-auto rounded-full border border-black p-2 lg:hidden" onClick={openMobileMenu}>
    //           <CgMenuLeft size={28} />
    //         </div>

    //         <div className="mx-auto my-auto hidden lg:block">
    //           <div className="flex">
    //             <div className="w-fit">
    //               <Menu as="div" className="z-50 ml-5 w-full">
    //                 <Menu.Button className="flex flex-1">
    //                   <div>Anuncie a sua propriedade</div>
    //                   <div className="my-auto ml-auto">
    //                     <VscTriangleDown className="w-8 text-[#2C3E50]" />
    //                   </div>
    //                 </Menu.Button>
    //                 <Transition
    //                   as={Fragment}
    //                   enter="transition ease-out duration-100"
    //                   enterFrom="transform opacity-0 scale-95"
    //                   enterTo="transform opacity-100 scale-100"
    //                   leave="transition ease-in duration-75"
    //                   leaveFrom="transform opacity-100 scale-100"
    //                   leaveTo="transform opacity-0 scale-95"
    //                 >
    //                   <Menu.Items className="absolute z-50 flex w-52 flex-col bg-white p-2 shadow-md">
    //                     <Menu.Item>
    //                       <MyLink customClass="py-1 w-full" href="/funciona">
    //                         Como funciona?
    //                       </MyLink>
    //                     </Menu.Item>
    //                     <Menu.Item>
    //                       <MyLink customClass="py-1 w-full" href="/anunciar">
    //                         Anunciar!
    //                       </MyLink>
    //                     </Menu.Item>
    //                   </Menu.Items>
    //                 </Transition>
    //               </Menu>
    //             </div>
    //             <div className="px-5">
    //               <Link href="/blog">Blog</Link>
    //             </div>
    //             <div className="px-5">
    //               <Link href="/contactos">Contactos</Link>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="my-auto ml-auto hidden lg:block ">
    //           <div>
    //             {!user && (
    //               <div className="my-auto flex">
    //                 {/* <Link href="/auth/register">
    //                   <a className="p-0">
    //                     <div className="mr-2 rounded border-2 border-primary-500 px-6 py-3 text-center text-sm text-primary-500 duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl">
    //                       Registar
    //                     </div>
    //                   </a>
    //                 </Link> */}

    //                 {/* <Link href="/auth/login">
    //                   <a className="p-0">
    //                     <div className="mr-2 rounded border-2 border-primary-500 bg-primary-500 px-6 py-3 text-center text-sm text-white duration-200 ease-in hover:drop-shadow-xl">
    //                       Iniciar sessão
    //                     </div>
    //                   </a>
    //                 </Link> */}
    //               </div>
    //             )}
    //             {user && (
    //               <div className="flex flex-1">
    //                 <div>
    //                   <button className="mx-3 rounded border border-primary-500 p-2" onClick={setModoSenhorio}>
    //                     Modo Senhorio
    //                   </button>
    //                 </div>
    //                 <div>
    //                   <Menu as="div" className="ml-5">
    //                     <Menu.Button className="flex flex-1">
    //                       <Image
    //                         unoptimized={true}
    //                         src={user.user_metadata.avatar_url || person}
    //                         height={32}
    //                         width={32}
    //                         alt=""
    //                         className="rounded-lg"
    //                       />
    //                       <p className="my-auto ml-2">{user.user_metadata.name}</p>
    //                       <div className="my-auto ml-auto">
    //                         <VscTriangleDown className="w-8 text-[#2C3E50]" />
    //                       </div>
    //                     </Menu.Button>
    //                     <Transition
    //                       as={Fragment}
    //                       enter="transition ease-out duration-100"
    //                       enterFrom="transform opacity-0 scale-95"
    //                       enterTo="transform opacity-100 scale-100"
    //                       leave="transition ease-in duration-75"
    //                       leaveFrom="transform opacity-100 scale-100"
    //                       leaveTo="transform opacity-0 scale-95"
    //                     >
    //                       <Menu.Items className="absolute z-50 flex flex-col bg-white p-2 px-4 shadow-md">
    //                         {toggleUserType == "ESTUDANTE" && (
    //                           <>
    //                             <Menu.Item>
    //                               <MyLink customClass="py-1" href="/unidesk">
    //                                 Uni-desk
    //                               </MyLink>
    //                             </Menu.Item>
    //                             <Menu.Item>
    //                               <MyLink customClass="py-1" href="/unidesk/estudante/stay">
    //                                 Minha Estadia
    //                               </MyLink>
    //                             </Menu.Item>
    //                             <Menu.Item>
    //                               <MyLink customClass="py-1" href="/unidesk/estudante/favourites">
    //                                 Favoritos
    //                               </MyLink>
    //                             </Menu.Item>
    //                             <Menu.Item>
    //                               <MyLink customClass="py-1" href="/unidesk/inbox">
    //                                 Caixa de Entrada
    //                               </MyLink>
    //                             </Menu.Item>
    //                             <Menu.Item>
    //                               <MyLink customClass="py-1" href="/unidesk/notifications">
    //                                 Notificações
    //                               </MyLink>
    //                             </Menu.Item>
    //                             <div className="h-[1px] w-full bg-neutral-600 px-1"></div>
    //                             {/* <Menu.Item>
    //                               <MyLink customClass="py-1" href="/admin">
    //                                 Conta
    //                               </MyLink>
    //                             </Menu.Item> */}
    //                             {/* <Menu.Item>
    //                               <MyLink customClass="py-1" href="/unidesk/help">
    //                                 Ajuda
    //                               </MyLink>
    //                             </Menu.Item> */}
    //                             {/* <Menu.Item>
    //                               <div className="py-1" onClick={() => supabaseClient.auth.signOut()}>
    //                                 Sair
    //                               </div>
    //                             </Menu.Item> */}
    //                           </>
    //                         )}
    //                         {toggleUserType == "SENHORIO" && (
    //                           <>
    //                             <Menu.Item>
    //                               <MyLink customClass="py-1" href="/unidesk">
    //                                 Uni-desk
    //                               </MyLink>
    //                             </Menu.Item>
    //                             <Menu.Item>
    //                               <MyLink customClass="py-1" href="/unidesk/inbox">
    //                                 Caixa de Entrada
    //                               </MyLink>
    //                             </Menu.Item>
    //                             <Menu.Item>
    //                               <MyLink customClass="py-1" href="/unidesk/senhorio/advertisements">
    //                                 Anúncios
    //                               </MyLink>
    //                             </Menu.Item>
    //                             <Menu.Item>
    //                               <MyLink customClass="py-1" href="/unidesk/unicontrolo/guests">
    //                                 Uni-controlo
    //                               </MyLink>
    //                             </Menu.Item>
    //                             <Menu.Item>
    //                               <MyLink customClass="py-1" href="/unidesk/notifications">
    //                                 Notificações
    //                               </MyLink>
    //                             </Menu.Item>
    //                             <div className="h-[1px] w-full bg-neutral-600 px-1"></div>
    //                             <Menu.Item>
    //                               <MyLink customClass="py-1" href="/admin">
    //                                 Conta
    //                               </MyLink>
    //                             </Menu.Item>
    //                             <Menu.Item>
    //                               <MyLink customClass="py-1" href="/notifications">
    //                                 Ajuda
    //                               </MyLink>
    //                             </Menu.Item>
    //                             <Menu.Item>
    //                               <div className="py-1" onClick={() => supabaseClient.auth.signOut()}>
    //                                 Sair
    //                               </div>
    //                             </Menu.Item>
    //                           </>
    //                         )}
    //                       </Menu.Items>
    //                     </Transition>
    //                   </Menu>
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>
    // </header>
  );
};

export default NavbarMobile;
