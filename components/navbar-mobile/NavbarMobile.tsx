import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
/* import person image */
import { useGetUserType, useCurrentUser, useToggleUserType } from "../../context/MainProvider";
import { Switch } from "@headlessui/react";
import classNames from "classnames";
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
  REGISTER_URL,
  UNICONTROLO_GUESTS_URL,
  UNIDESK_SENHORIO_PAINEL_URL,
  UNIDESK_STAY_URL,
  UNIDESK_STUDENT_FAVOURITES_URL,
  UNIDESK_URL,
} from "../../models/paths";
import { BsPerson } from "react-icons/bs";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useRouter } from "next/router";

interface NavbarMobileProps {
  open: boolean;
  setOpenMobile: () => void;
}

export const NavbarMobile = ({ open, setOpenMobile }: NavbarMobileProps) => {
  const user = useUser();
  const profile = useCurrentUser();
  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter();

  const { toggleUserType } = useGetUserType();
  const toggleUserTypeContext = useToggleUserType();

  const toggleSenhorioEstudante = () => {
    if (!user) {
      return;
    }

    if (toggleUserType !== "TENANT") {
      toggleUserTypeContext("TENANT");
    } else {
      toggleUserTypeContext("LANDLORD");
    }
  };

  const [summary2, setSummary2] = useState(false);
  const [menuaberto, setMenuaberto] = useState(false);

  const selectMenuButton = (href: string) => {
    href && router.push(href);
    setMenuaberto(false);
  };

  return (
    <>
      <div
        className={classNames("mb-3 flex w-full transform flex-col px-5 transition-[display] lg:hidden", {
          hidden: !open,
          block: open,
        })}
      >
        <div className="mt-8 flex flex-col">
          <div className="mt-3">
            <Link href={HOME_URL}>
              <div className="mb-3 font-bold">Home</div>
            </Link>
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
                      <Link href={COMO_FUNCIONA_URL}>Como funciona?</Link>
                    </div>
                    <div>
                      <Link href={ANUNCIAR_PROP_URL}>Anunciar!</Link>
                    </div>
                  </div>
                </>
              </div>
            )}
            <div className="mt-3">
              <Link href={BLOG_URL}>Blog</Link>
            </div>
            <div className="mt-3">
              <Link href={CONTACTOS_URL}>Contactos</Link>
            </div>
          </div>
          <div className="mt-7  rounded-3xl bg-gray-100 py-4 px-8">
            <div className="align-center flex flex-1 justify-center">
              <div>
                <span className="mr-2">Estudante</span>
                <Switch
                  checked={false}
                  onChange={toggleSenhorioEstudante}
                  className="relative mx-5 mt-2 inline-flex h-8 w-16 items-center rounded-full bg-primary-500"
                >
                  <span
                    className={`${
                      toggleUserType === "LANDLORD" ? "translate-x-11" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white`}
                  />
                </Switch>
                <span className="ml-2">Senhorio</span>
              </div>
            </div>
            <div className="my-10 flex">
              {user && (
                <>
                  <div className="flex">
                    {profile?.avatar_url ? (
                      <Image
                        unoptimized={true}
                        src={profile?.avatar_url}
                        height={36}
                        width={36}
                        alt="profile-avatar"
                        className="rounded-full"
                      />
                    ) : (
                      <BsPerson size={32} />
                    )}

                    <div className="my-auto ml-2">{profile?.name}</div>
                  </div>

                  <div className="ml-auto" onClick={() => setMenuaberto(!menuaberto)}>
                    {!menuaberto ? <AiOutlineDown size={24} /> : <AiOutlineUp size={24} />}
                  </div>
                </>
              )}
              {!user && (
                <div className="my-auto flex w-full  justify-center gap-2">
                  <Link href={REGISTER_URL}>
                    <a className="p-0">
                      <div className="flex h-full flex-col justify-center rounded border-2 border-primary-500 px-6  text-center text-sm text-primary-500 duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl">
                        Registar
                      </div>
                    </a>
                  </Link>

                  <Link href={LOGIN_URL}>
                    <a className="p-0">
                      <div className="mr-2 rounded border-2 border-primary-500 bg-primary-500 px-6 py-3 text-center text-sm text-white duration-200 ease-in hover:drop-shadow-xl">
                        Iniciar sessão
                      </div>
                    </a>
                  </Link>
                </div>
              )}
            </div>

            <div className={classNames("mb-3 w-full rounded-md bg-gray-200 p-2", { hidden: !menuaberto })}>
              {toggleUserType == "TENANT" && (
                <div className="flex flex-col gap-2 py-3 px-5">
                  <div onClick={() => selectMenuButton(UNIDESK_URL)}>Uni-desk</div>
                  <div onClick={() => selectMenuButton(UNIDESK_STAY_URL)}>Minha Estadia</div>
                  <div onClick={() => selectMenuButton(UNIDESK_STUDENT_FAVOURITES_URL)}>Favoritos</div>
                  <div onClick={() => selectMenuButton(INBOX_URL)}>Caixa de Entrada</div>
                  <div onClick={() => selectMenuButton(NOTIFICATIONS_URL)}>Notificações</div>
                  <div className="my-3 mx-auto h-[1px] w-full bg-neutral-600"></div>
                  <div onClick={() => selectMenuButton(ADMIN_URL)} className="text-gray-500">
                    Conta
                  </div>
                  <div onClick={() => selectMenuButton(FAQS_URL)} className="text-gray-500">
                    Ajuda
                  </div>
                  <div onClick={() => supabaseClient.auth.signOut()} className="text-gray-500">
                    Sair
                  </div>
                </div>
              )}
              {toggleUserType == "LANDLORD" && (
                <div className="flex flex-col gap-2 py-3 px-5">
                  <div onClick={() => selectMenuButton(UNIDESK_URL)}>Uni-desk</div>
                  <div onClick={() => selectMenuButton(INBOX_URL)}>Caixa de Entrada</div>
                  <div onClick={() => selectMenuButton(UNIDESK_SENHORIO_PAINEL_URL)}>Anúncios</div>
                  <div onClick={() => selectMenuButton(UNICONTROLO_GUESTS_URL)}>Uni-controlo</div>
                  <div onClick={() => selectMenuButton(NOTIFICATIONS_URL)}>Notificações</div>
                  <div className="my-3 mx-auto h-[1px] w-full bg-neutral-600"></div>
                  <div onClick={() => selectMenuButton(ADMIN_URL)} className="text-gray-500">
                    Conta
                  </div>
                  <div onClick={() => selectMenuButton(FAQS_URL)} className="text-gray-500">
                    Ajuda
                  </div>
                  <div onClick={() => supabaseClient.auth.signOut()} className="text-gray-500">
                    Sair
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
