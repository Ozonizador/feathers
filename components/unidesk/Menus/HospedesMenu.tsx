import React from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { AiFillLock } from "react-icons/ai";

interface HospedesMenuProps {
  activeLink: "guests" | "transactions" | "expenses" | "repairs";
}

/* MENU HOSPEDES - PAGINA 60 XD */

const HospedesMenu = ({ activeLink }: HospedesMenuProps) => {
  return (
    <div className="w-80 rounded-2xl bg-terciary-600 py-8 px-6">
      <Link href="/unidesk/unicontrolo/guests">
        <div
          className={classNames("flex cursor-pointer rounded-2xl py-5 px-4", {
            "bg-primary-300": activeLink == "guests",
          })}
        >
          <Image src="/images/icons8_male_user_2.svg" height={46} width={46} alt="" />
          <span className="ml-2 self-center text-xl font-semibold">Hóspedes</span>
        </div>
      </Link>
      {/* <Link href="/unidesk/unicontrolo/transactions"> */}
      <div
        className={classNames("flex rounded-2xl py-5 px-4", {
          "bg-primary-300": activeLink == "transactions",
        })}
      >
        <Image src="/images/icons8_card_exchange_1.svg" height={46} width={46} alt="" />
        <div className="my-auto ml-2 inline">
          <AiFillLock className="my-auto inline h-6 w-6" height={32} width={32} />
          <span className="ml-2 self-center text-xl font-semibold">Transações</span>
        </div>
      </div>
      {/* </Link> */}
      {/* <Link href="/unidesk/unicontrolo/expenses"> */}
      <div
        className={classNames("flex rounded-2xl py-5 px-4", {
          "bg-primary-300": activeLink == "expenses",
        })}
      >
        <Image src="/images/icons8_paycheque.svg" height={46} width={46} alt="" />
        <div className="my-auto ml-2 inline">
          <AiFillLock className="my-auto inline h-6 w-6" height={32} width={32} />
          <span className="ml-2 self-center text-xl font-semibold">Despesas</span>
        </div>
      </div>
      {/* </Link> */}
      {/* <Link href="/unidesk/unicontrolo/repairs"> */}
      <div
        className={classNames("flex rounded-2xl py-5 px-4", {
          "bg-primary-300": activeLink == "repairs",
        })}
      >
        <Image src="/images/icons8_maintenance_1.svg" height={46} width={46} alt="" />
        <div className="my-auto ml-2 inline">
          <AiFillLock className="my-auto inline h-6 w-6" height={32} width={32} />
          <span className="ml-2 self-center text-xl font-semibold">Reparações</span>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default HospedesMenu;
