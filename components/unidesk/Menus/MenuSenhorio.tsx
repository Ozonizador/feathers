import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TiLockClosed } from "react-icons/ti";
import classNames from "classnames";
import { useSelectedAnuncioMenuSenhorio } from "../../../context/MenuSenhorioAnuncioProvider";
import { useRouter } from "next/router";

interface MenuSenhorioProps {
  activeLink?: string;
}

const MenuSenhorio = ({ activeLink }: MenuSenhorioProps) => {
  const router = useRouter();
  const [summary2, setSummary2] = useState(true);
  const currentAdvertisement = useSelectedAnuncioMenuSenhorio();

  const moveToMenuLink = (href: string) => {
    href && router.push(href);
  };

  return (
    <>
      <div className="h-fit w-80 rounded-2xl bg-terciary-600 p-2">
        <div>
          <div className="flex justify-start border border-b-primary-500 px-2 align-middle">
            <h1 className="py-1 text-xl font-bold">Anúncios</h1>
          </div>
          <div className="flex flex-col justify-start px-2">
            <div className="cursor-pointer" onClick={() => moveToMenuLink("/unidesk/senhorio/advertisements")}>
              <div
                className={classNames("mt-4 cursor-pointer text-base", {
                  "rounded bg-primary-500 text-white": activeLink === "advertisements",
                })}
              >
                Painel
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {currentAdvertisement && (
                <>
                  <div className="mt-2 flex flex-1 items-center justify-between">
                    Anúncio - {currentAdvertisement.title}
                  </div>
                  <div className="flex">
                    <div
                      className="cursor-pointer"
                      onClick={() => moveToMenuLink(`/unidesk/senhorio/${currentAdvertisement.id}/details`)}
                    >
                      <a>
                        <span className="ml-2">Detalhes do anúncio</span>
                      </a>
                    </div>
                  </div>
                  <div className="flex">
                    <div
                      className="cursor-pointer"
                      onClick={() => moveToMenuLink(`/unidesk/senhorio/${currentAdvertisement.id}/photos`)}
                    >
                      <a>
                        <span className="ml-2">Fotos</span>
                      </a>
                    </div>
                  </div>
                  <div className="flex">
                    <div
                      className="cursor-pointer"
                      onClick={() => moveToMenuLink(`/unidesk/senhorio/${currentAdvertisement.id}/conditions`)}
                    >
                      <a>
                        <span className="ml-2">Condições e regras</span>
                      </a>
                    </div>
                  </div>
                  <div className="flex">
                    <div
                      className="cursor-pointer"
                      onClick={() => moveToMenuLink(`/unidesk/senhorio/${currentAdvertisement.id}/prices`)}
                    >
                      <a>
                        <span className="ml-2">Preços</span>
                      </a>
                    </div>
                  </div>
                  <div className="flex">
                    <div onClick={() => moveToMenuLink("/")}>
                      <a className=" mb-4 flex flex-row items-center">
                        <TiLockClosed className="my-auto" />
                        Informações contratuais
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 px-2">
          <div className="cursor-pointer" onClick={() => moveToMenuLink("/unidesk/inbox")}>
            Caixa de entrada
          </div>
        </div>
        <div className="mt-2 px-2">
          <div
            className="flex flex-1 items-center justify-between"
            onClick={() => {
              setSummary2(!summary2);
            }}
          >
            <div>
              <p>Uni-controlo</p>
            </div>
            <Image
              src={summary2 ? "/images/icons8-sort-down-30.png" : "/images/icons8-sort-up-30.png"}
              height={32}
              width={32}
              alt=""
            />
          </div>
          {summary2 && (
            <div className="mt-2 flex items-center justify-start align-middle">
              <>
                <div className="ml-5 flex flex-col gap-2 text-base">
                  <div>
                    <div className="cursor-pointer" onClick={() => moveToMenuLink("/unidesk/unicontrolo/guests")}>
                      Hóspedes
                    </div>
                  </div>
                  <div className="flex">
                    <TiLockClosed className="my-auto" /> <span className="ml-2">Transações</span>
                  </div>
                  <div className="flex">
                    <TiLockClosed className="my-auto" /> <span className="ml-2">Despesas</span>
                  </div>
                  <div className="flex">
                    <TiLockClosed className="my-auto" />
                    <span className="ml-2">Reparações</span>
                  </div>
                </div>
              </>
            </div>
          )}
        </div>

        <div className="mt-2 px-2">
          <div className="flex items-center justify-start align-middle">
            <Link href="/unidesk/notifications">Notificações</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuSenhorio;
