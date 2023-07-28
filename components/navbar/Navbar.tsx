import React, { Fragment, useState } from "react";
import { ImPhone } from "react-icons/im";
import { GrMail } from "react-icons/gr";
import { VscTriangleDown } from "react-icons/vsc";
import Socials from "../socials/Socials";
import Link from "next/link";
import Image from "next/image";
import { Menu, Switch, Transition } from "@headlessui/react";
import MyLink from "../utils/MyLink";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";

/* import person image */
import ukFlag from "../../public/images/icon-uk.jpg";
import { useGetUserType, useCurrentUser, useToggleAppUserMode } from "../../context/MainProvider";
import { useRouter } from "next/router";
import { CgMenuLeft } from "react-icons/cg";
import NavbarMobile from "../navbar-mobile/NavbarMobile";
import { Database } from "../../database.types";
import {
  ADMIN_URL,
  ANUNCIAR_PROP_URL,
  BLOG_URL,
  COMO_FUNCIONA_URL,
  CONTACTOS_URL,
  FAQS_URL,
  HOME_URL,
  INBOX_URL,
  LOGIN_URL,
  NOTIFICATIONS_URL,
  PROCURAR_ADVERT_URL,
  REGISTER_URL,
  UNICONTROLO_GUESTS_URL,
  UNIDESK_SENHORIO_PAINEL_URL,
  UNIDESK_STAY_URL,
  UNIDESK_STUDENT_FAVOURITES_URL,
  UNIDESK_URL,
} from "../../models/paths";
import { BsPerson } from "react-icons/bs";
import classNames from "classnames";

export const Navbar = () => {
  const { t } = useTranslation("navbar");
  const user = useUser();
  const profile = useCurrentUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient<Database>();

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const { userAppMode, messagesNumber, notificationNumber } = useGetUserType();
  const setWebUserMode = useToggleAppUserMode();

  const logout = () => {
    supabaseClient.auth.signOut();
    router.push(HOME_URL);
  };

  const checkIfUrlActive = (urls: string[]) => {
    const path = router.asPath;
    return urls.includes(path);
  };

  const toggleUserMode = () => {
    user && setWebUserMode(userAppMode !== "TENANT" ? "TENANT" : "LANDLORD");
  };

  return (
    <header className="px-5 lg:px-0">
      {/* DESKTOP */}
      <nav>
        <div>
          <div className="border-terciary-400 hidden flex-wrap border-b py-2 lg:flex lg:px-28">
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
              <div className="my-auto border-r">
                <Socials type="primary" />
              </div>
              <div className="flex pl-2">
                <div className="my-auto mt-3 h-7 w-7">
                  <Image src={ukFlag} alt="" />
                </div>
                <select
                  className="ml-2 border-none"
                  onChange={(event) => router.push(router.asPath, undefined, { locale: event.target.value })}
                >
                  <option value="en">EN</option>
                  <option value="pt">PT</option>
                </select>
              </div>
            </div>
          </div>
          <div className="border-terciary-400 mt-5 flex h-20 border-b lg:gap-5 lg:px-28">
            <div className="lg:block">
              <Link href={HOME_URL}>
                <div className="relative h-full w-52">
                  <Image
                    src="/images/logo1.png"
                    alt=""
                    className="cursor-pointer"
                    objectFit="contain"
                    layout="fill"
                  ></Image>
                </div>
              </Link>
            </div>
            <div
              className="my-auto ml-auto cursor-pointer rounded-full border border-black p-2 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <CgMenuLeft size={28} />
            </div>

            <div className="mx-auto my-auto hidden lg:block">
              <div className="flex gap-1">
                <div
                  className={classNames({
                    "border-b-4 border-primary-500 font-black":
                      checkIfUrlActive([userAppMode === "TENANT" ? HOME_URL : UNIDESK_URL]) == true,
                  })}
                >
                  {userAppMode === "TENANT" ? (
                    <Link href="/">{t("home")}</Link>
                  ) : (
                    <Link href={UNIDESK_URL}>{t("unidesk")}</Link>
                  )}
                </div>
                {(!user || userAppMode === "LANDLORD") && (
                  <div className="z-700 w-fit">
                    <Menu as="div" className={classNames("ml-5 w-full")}>
                      <Menu.Button>
                        <div
                          className={classNames("flex", {
                            "border-b-4 border-primary-500 font-black":
                              checkIfUrlActive([COMO_FUNCIONA_URL, ANUNCIAR_PROP_URL]) == true,
                          })}
                        >
                          <h6>Anuncie a sua propriedade</h6>
                          <div className="my-auto">
                            <VscTriangleDown className="w-8 text-[#2C3E50]" />
                          </div>
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
                        <Menu.Items className="absolute z-50 flex w-52 flex-col rounded-lg bg-white p-2 shadow-md">
                          <Menu.Item>
                            <MyLink customClass="py-1 mt-2 w-full" href={COMO_FUNCIONA_URL}>
                              Como funciona?
                            </MyLink>
                          </Menu.Item>
                          <Menu.Item>
                            <MyLink customClass="py-2 w-full" href={ANUNCIAR_PROP_URL}>
                              Anunciar!
                            </MyLink>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
                {userAppMode == "TENANT" && (
                  <div className="my-auto px-5">
                    <Link
                      href={PROCURAR_ADVERT_URL}
                      className={classNames({
                        "border-b-4 border-primary-500 pb-2 font-black":
                          checkIfUrlActive([PROCURAR_ADVERT_URL]) == true,
                      })}
                    >
                      Encontrar Espaço
                    </Link>
                  </div>
                )}
                <div className="my-auto px-5">
                  <Link
                    href={BLOG_URL}
                    className={classNames({
                      "border-b-4 border-primary-500 pb-2 font-black": checkIfUrlActive([BLOG_URL]) == true,
                    })}
                  >
                    Blog
                  </Link>
                </div>
                <div className="my-auto px-5">
                  <Link
                    href={CONTACTOS_URL}
                    className={classNames({
                      "border-b-4 border-primary-500 pb-2 font-black": checkIfUrlActive([CONTACTOS_URL]) == true,
                    })}
                  >
                    Contactos
                  </Link>
                </div>
              </div>
            </div>
            <div className="my-auto ml-auto hidden lg:block ">
              <div>
                {!user && (
                  <div className="my-auto flex gap-2">
                    <Link href={REGISTER_URL} className="p-0">
                      <div className="flex flex-col justify-center rounded border-2 border-primary-500 px-6 py-2  text-center text-sm text-primary-500 duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl">
                        Registar
                      </div>
                    </Link>

                    <Link href={LOGIN_URL} className="p-0">
                      <div className="mr-2 rounded border-2 border-primary-500 bg-primary-500 px-6 text-center text-sm text-white duration-200 ease-in hover:drop-shadow-xl lg:py-2">
                        Iniciar sessão
                      </div>
                    </Link>
                  </div>
                )}
                {user && (
                  <div className="flex flex-1">
                    <div className="my-auto flex">
                      <span className="mr-2">Estudante</span>
                      <Switch
                        checked={true}
                        className={classNames("relative inline-flex h-6 w-11 cursor-default rounded-full", {
                          "bg-primary-500": profile && profile.type === userAppMode,
                          "bg-secondary-300": !profile || profile.type !== userAppMode,
                        })}
                        onClick={() => toggleUserMode()}
                      >
                        <span
                          className={classNames("absolute top-1 inline-block h-4 w-4 transform rounded-full bg-white", {
                            "translate-x-6": userAppMode === "LANDLORD",
                            "translate-x-1": userAppMode !== "LANDLORD",
                          })}
                        />
                      </Switch>
                      <span className="ml-2">Senhorio</span>
                    </div>
                    <div>
                      <Menu as="div" className="ml-5">
                        <Menu.Button className="flex flex-1">
                          {profile?.avatar_url ? (
                            <Image
                              unoptimized={true}
                              src={profile?.avatar_url}
                              height={32}
                              width={32}
                              alt="profile-avatar"
                              className="rounded-full"
                            />
                          ) : (
                            <BsPerson size={28} />
                          )}
                          <p className="my-auto ml-2">{profile?.name}</p>
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
                          <Menu.Items className="absolute z-50 flex flex-col rounded-lg bg-white p-2 px-4 shadow-md">
                            {userAppMode == "TENANT" && (
                              <>
                                <Menu.Item>
                                  <MyLink customClass="py-1 font-bold" href={UNIDESK_URL}>
                                    Uni-desk
                                  </MyLink>
                                </Menu.Item>
                                <Menu.Item>
                                  <MyLink customClass="py-1 font-bold" href={UNIDESK_STAY_URL}>
                                    Minha Estadia
                                  </MyLink>
                                </Menu.Item>
                                <Menu.Item>
                                  <MyLink customClass="py-1 font-bold" href={UNIDESK_STUDENT_FAVOURITES_URL}>
                                    Favoritos
                                  </MyLink>
                                </Menu.Item>
                                <Menu.Item>
                                  <MyLink customClass="py-1 font-bold flex gap-2" href={INBOX_URL}>
                                    <p>Caixa de Entrada</p>
                                    {messagesNumber > 0 && (
                                      <h6 className="border-1 my-auto rounded-full border border-black px-[4px] py-[0.5px] text-xs">
                                        {messagesNumber}
                                      </h6>
                                    )}
                                  </MyLink>
                                </Menu.Item>
                                <Menu.Item>
                                  <MyLink customClass="py-1 font-bold flex gap-2" href={NOTIFICATIONS_URL}>
                                    <p>Notificações</p>
                                    {notificationNumber > 0 && (
                                      <h6 className="border-1 my-auto rounded-full border border-black px-[4px] py-[0.5px] text-xs">
                                        {notificationNumber}
                                      </h6>
                                    )}
                                  </MyLink>
                                </Menu.Item>
                                <div className="h-[1px] w-full bg-neutral-600 px-1"></div>
                                <Menu.Item>
                                  <MyLink customClass="py-1 text-[#8A8A8A]" href={ADMIN_URL}>
                                    Conta
                                  </MyLink>
                                </Menu.Item>
                                <Menu.Item>
                                  <MyLink customClass="py-1 text-[#8A8A8A]" href={FAQS_URL}>
                                    Ajuda
                                  </MyLink>
                                </Menu.Item>
                                <Menu.Item>
                                  <div className="py-1 text-[#8A8A8A]" onClick={() => logout()}>
                                    Sair
                                  </div>
                                </Menu.Item>
                              </>
                            )}
                            {userAppMode == "LANDLORD" && (
                              <>
                                <Menu.Item>
                                  <MyLink customClass="py-1 font-bold" href={UNIDESK_URL}>
                                    Uni-desk
                                  </MyLink>
                                </Menu.Item>
                                <Menu.Item>
                                  <MyLink customClass="py-1 font-bold flex gap-2" href={INBOX_URL}>
                                    <p>Caixa de Entrada</p>
                                    {messagesNumber > 0 && (
                                      <h6 className="border-1 my-auto rounded-full border border-black px-[4px] py-[0.5px] text-xs">
                                        {messagesNumber}
                                      </h6>
                                    )}
                                  </MyLink>
                                </Menu.Item>
                                <Menu.Item>
                                  <MyLink customClass="py-1 font-bold" href={UNIDESK_SENHORIO_PAINEL_URL}>
                                    Anúncios
                                  </MyLink>
                                </Menu.Item>
                                <Menu.Item>
                                  <MyLink customClass="py-1 font-bold" href={UNICONTROLO_GUESTS_URL}>
                                    Uni-controlo
                                  </MyLink>
                                </Menu.Item>
                                <Menu.Item>
                                  <MyLink customClass="py-1 font-bold flex gap-2" href={NOTIFICATIONS_URL}>
                                    <p>Notificações</p>
                                    {notificationNumber > 0 && (
                                      <h6 className="border-1 my-auto rounded-full border border-black px-[4px] py-[0.5px] text-xs">
                                        {notificationNumber}
                                      </h6>
                                    )}
                                  </MyLink>
                                </Menu.Item>
                                <div className="h-[1px] w-full bg-neutral-600 px-1"></div>
                                <Menu.Item>
                                  <MyLink customClass="py-1 text-[#8A8A8A]" href={ADMIN_URL}>
                                    Conta
                                  </MyLink>
                                </Menu.Item>
                                <Menu.Item>
                                  <MyLink customClass="py-1 text-[#8A8A8A]" href={FAQS_URL}>
                                    Ajuda
                                  </MyLink>
                                </Menu.Item>
                                <Menu.Item>
                                  <div className="py-1 text-[#8A8A8A]" onClick={() => logout()}>
                                    Sair
                                  </div>
                                </Menu.Item>
                              </>
                            )}
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
      {/* MOBILE */}
      <NavbarMobile open={mobileOpen} setOpenMobile={() => setMobileOpen(false)} />
    </header>
  );
};

export default Navbar;
