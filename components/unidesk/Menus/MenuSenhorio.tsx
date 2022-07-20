import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TiLockClosed } from "react-icons/ti";
import classNames from "classnames";
import { useRouter } from "next/router";

const MenuSenhorio = () => {
  const router = useRouter();
  const [summary2, setSummary2] = useState(true);
  const [summary3, setSummary3] = useState(true);

  return (
    <div className="rounded-2xl bg-terciary-600 p-2">
      <div className="w-64">
        <div className="flex justify-start border border-b-primary-500 px-2 align-middle">
          <h1 className="text-xl font-bold ">Anúncios</h1>
        </div>
        <div className="flex flex-col justify-start px-2">
          <div
            className={classNames("ml-1 mt-4 text-base font-bold", {
              "rounded bg-primary-500 p-2 text-white":
                router.asPath.includes("senhorio/advertisements"),
            })}
          >
            Painel
          </div>
          <div className="flex flex-col gap-2">
            <div
              className="mt-2 flex flex-1 items-center justify-between px-2"
              onClick={() => {
                setSummary3(!summary3);
              }}
            >
              <div>
                <p className="">Anúncios</p>
              </div>
              <Image
                src={summary3 ? "/images/icons8-sort-down-30.png" : "/images/icons8-sort-up-30.png"}
                height={32}
                width={32}
                alt=""
              />
            </div>
            {summary3 && (
              <>
                <div className="flex">
                  <Link href="">
                    <a>
                      <span className="ml-2">Detalhes dos anúncios</span>
                    </a>
                  </Link>
                </div>
                <div className="flex">
                  <Link href="">
                    <a>
                      <span className="ml-2">Fotos</span>
                    </a>
                  </Link>
                </div>
                <div className="flex">
                  <Link href="">
                    <a>
                      <span className="ml-2">Condições e regras</span>
                    </a>
                  </Link>
                </div>
                <div className="flex">
                  <Link href="">
                    <a>
                      <span className="ml-2">Preços</span>
                    </a>
                  </Link>
                </div>
                <div className="flex">
                  <Link href="/">
                    <a className=" mb-4 flex flex-row items-center">
                      <TiLockClosed className="my-auto" />
                      Informações contratuais
                    </a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 px-2">
        <Link href="/unidesk/notifications">Caixa de entrada</Link>
      </div>
      <div className="mt-2 px-2">
        <div
          className="flex flex-1 items-center justify-between"
          onClick={() => {
            setSummary2(!summary2);
          }}
        >
          <div>
            <p className="">Uni-controlo</p>
          </div>
          <Image
            src={summary2 ? "/images/icons8-sort-down-30.png" : "/images/icons8-sort-up-30.png"}
            height={32}
            width={32}
            alt=""
          />
        </div>
        {summary2 && (
          <div className="flex items-center justify-start align-middle">
            <>
              <div className=" ml-5 flex flex-col gap-2 text-base">
                <div>
                  <Link href="/unidesk/unicontrolo/hospedes">Hóspedes</Link>
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
        <div className="flex items-center justify-start align-middle">Notificações</div>
      </div>
    </div>
  );
};

export default MenuSenhorio;
