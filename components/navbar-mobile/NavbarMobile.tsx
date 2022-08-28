import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@supabase/auth-helpers-react";

/* import person image */
import { useGetUserType, useToggleUserType } from "../../context/MainProvider";
import { useRouter } from "next/router";
import { Switch } from "@headlessui/react";
import classNames from "classnames";

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

    if (toggleUserType === "estudante") {
      toggleUserTypeContext("senhorio");
    } else {
      toggleUserTypeContext("estudante");
    }
  };

  const [summary2, setSummary2] = useState(false);

  return (
    <>
      <div className={classNames("flex w-full flex-col px-5 transition-all ease-in-out", { hidden: !open })}>
        <div className="mt-8 flex flex-col">
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
          <div className="mt-7 flex justify-center rounded-lg bg-gray-100 py-4">
            <div className="flex flex-1">
              <div>
                {/* <button className="mx-3 rounded border border-primary-500 p-2" onClick={setModoSenhorio}>
                          Modo Senhorio
                        </button> */}
                <span className="mr-2">Estudante</span>
                <Switch
                  checked={true}
                  onChange={toggleSenhorioEstudante}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500"
                >
                  <span
                    className={`${
                      toggleUserType === "senhorio" ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white`}
                  />
                </Switch>
                <span className="ml-2">Senhorio</span>
              </div>
            </div>
          </div>
        </div>
        <button className="bg-primary-500 p-2" onClick={() => setOpenMobile()}>
          Close Mobile Navbar - Apagar depois
        </button>
      </div>
    </>
  );
};

export default NavbarMobile;
