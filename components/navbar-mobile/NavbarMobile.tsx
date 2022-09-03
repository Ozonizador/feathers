import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@supabase/auth-helpers-react";
import person from "../../public/images/person.png";
/* import person image */
import { useGetUserType, useToggleUserType } from "../../context/MainProvider";
import { Switch } from "@headlessui/react";
import classNames from "classnames";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
interface NavbarMobileProps {
  open: boolean;
  setOpenMobile: () => void;
}

export const NavbarMobile = ({ open, setOpenMobile }) => {
  const { user } = useUser();

  const { toggleUserType } = useGetUserType();
  const toggleUserTypeContext = useToggleUserType();

  const toggleSenhorioEstudante = () => {
    if (!user) {
      return;
    }

    if (toggleUserType === "TENANT") {
      toggleUserTypeContext("TENANT");
    } else {
      toggleUserTypeContext("LANDLORD");
    }
  };

  const [summary2, setSummary2] = useState(false);
  const [menuaberto, setMenuaberto] = useState(false);

  return (
    <>
      <div
        className={classNames("flex w-full transform flex-col px-5 transition-[display] lg:hidden", {
          hidden: !open,
          block: open,
        })}
      >
        <div className="mt-8 flex flex-col">
          <div className="mt-3">
            <Link href="/">
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
                      <Link href="/funciona">Como funciona?</Link>
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
          <div className="mt-7  rounded-3xl bg-gray-100 py-4 px-8">
            <div className="align-center flex flex-1 justify-center">
              <div>
                {/* <button className="mx-3 rounded border border-primary-500 p-2" onClick={setModoSenhorio}>
                          Modo Senhorio
                        </button> */}
                <span className="mr-2">Estudante</span>
                <Switch
                  checked={true}
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
              <div className=" flex">
                {user?.user_metadata?.avatar_url && (
                  <Image
                    unoptimized={true}
                    src={user?.user_metadata?.avatar_url || person}
                    height={32}
                    width={36}
                    alt=""
                    className="rounded-full"
                  />
                )}
                <div className="my-auto ml-2">{user?.user_metadata.name}</div>
              </div>
              <div className="ml-auto" onClick={() => setMenuaberto(!menuaberto)}>
                <Image
                  src={!menuaberto ? "/images/down-arrow.png" : "/images/up-arrow.png"}
                  height={22}
                  width={22}
                  alt=""
                />
              </div>
            </div>

            <div className={classNames("mb-3 w-full  rounded-md bg-gray-200 p-2", { hidden: !menuaberto })}>
              {toggleUserType == "TENANT" && (
                <>
                  <div className="mt-3 py-1 px-2">
                    <Link className="py-1 " href="/unidesk">
                      Uni-desk
                    </Link>
                  </div>
                  <div className="flex items-center py-1 px-2 align-middle">
                    <div>
                      <Link className="py-1" href="/unidesk/estudante/stay">
                        Minha Estadia
                      </Link>
                    </div>
                    <div className="ml-3 flex h-4 w-4 items-center justify-center rounded-full border border-black p-2 align-middle text-sm font-semibold">
                      5
                    </div>
                  </div>
                  <div className="py-1 px-2">
                    <Link className="py-1" href="/unidesk/estudante/favourites">
                      Favoritos
                    </Link>
                  </div>
                  <div className="py-1 px-2">
                    <Link className="py-1" href="/unidesk/inbox">
                      Caixa de Entrada
                    </Link>
                  </div>
                  <div className="py-1 px-2">
                    <Link className="py-1" href="/unidesk/notifications">
                      Notificações
                    </Link>
                  </div>
                  <div className="my-3 mx-auto h-[1px] w-11/12 bg-neutral-600 px-3"></div>
                  <div className="py-1 px-2 text-gray-500">
                    <Link className="py-1" href="/admin">
                      Conta
                    </Link>
                  </div>
                  <div className="py-1 px-2 text-gray-500">
                    <Link className="py-1" href="/faqs">
                      Ajuda
                    </Link>
                  </div>
                  <div className="py-1 px-2 text-gray-500">
                    <div className="py-1" onClick={() => supabaseClient.auth.signOut()}>
                      Sair
                    </div>
                  </div>
                </>
              )}
              {toggleUserType == "LANDLORD" && (
                <>
                  <div className="mt-3 py-1 px-2">
                    <Link className="py-1 " href="/unidesk">
                      Uni-desk
                    </Link>
                  </div>
                  <div className="py-1 px-2">
                    <Link className="py-1" href="/unidesk/inbox">
                      Caixa de Entrada
                    </Link>
                  </div>
                  <div className="py-1 px-2">
                    <Link className="py-1" href="/unidesk/senhorio/advertisements">
                      Anúncios
                    </Link>
                  </div>
                  <div className="py-1 px-2">
                    <Link className="py-1" href="/unidesk/unicontrolo/guests">
                      Uni-controlo
                    </Link>
                  </div>
                  <div className="py-1 px-2">
                    <Link className="py-1 " href="/unidesk/notifications">
                      Notificações
                    </Link>
                  </div>
                  <div className="my-3 mx-auto h-[1px] w-11/12 bg-neutral-600 px-1"></div>
                  <div className="py-1 px-2">
                    <Link className="py-1 text-gray-500" href="/admin">
                      Conta
                    </Link>
                  </div>
                  <div className="py-1 px-2">
                    <Link className="py-1 text-gray-500" href="/notifications">
                      Ajuda
                    </Link>
                  </div>
                  <div className="py-1 px-2">
                    <div className="py-1 text-gray-500" onClick={() => supabaseClient.auth.signOut()}>
                      Sair
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
