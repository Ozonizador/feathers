import React from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { AiFillLock } from "react-icons/ai";
import { UNICONTROLO_GUESTS_URL } from "../../../models/paths";

interface HospedesMenuProps {
  activeLink: "guests" | "transactions" | "expenses" | "repairs";
}

/* MENU HOSPEDES - PAGINA 60 XD */

const HospedesMenu = ({ activeLink }: HospedesMenuProps) => {
  return (
    <div className="w-80 rounded-2xl bg-terciary-600 py-8 px-6">
      <Link href={UNICONTROLO_GUESTS_URL}>
        <div
          className={classNames("flex cursor-pointer rounded-2xl py-5 px-4", {
            "bg-primary-300": activeLink == "guests",
          })}
        >
          <Image src="/images/icons8_male_user_2.svg" height={46} width={46} alt="" />
          <span className="ml-2 self-center text-xl font-semibold">Hóspedes</span>
        </div>
      </Link>
      <div
        className={classNames("flex gap-2 rounded-2xl py-5 px-4", {
          "bg-primary-300": activeLink == "transactions",
        })}
      >
        <Image src="/images/icons8_card_exchange_1.svg" height={46} width={46} alt="" />
        <div className="my-auto flex gap-2">
          <AiFillLock className="my-auto inline h-6 w-6" height={32} width={32} />
          <span className="self-center text-xl font-semibold">Transações</span>
        </div>
      </div>
      <div
        className={classNames("flex gap-2 rounded-2xl py-5 px-4", {
          "bg-primary-300": activeLink == "expenses",
        })}
      >
        <Image src="/images/icons8_paycheque.svg" height={46} width={46} alt="" />
        <div className="my-auto flex gap-2">
          <AiFillLock className="my-auto inline h-6 w-6" height={32} width={32} />
          <span className="self-center text-xl font-semibold">Despesas</span>
        </div>
      </div>
      <div
        className={classNames("flex gap-2 rounded-2xl py-5 px-4", {
          "bg-primary-300": activeLink == "repairs",
        })}
      >
        <Image src="/images/icons8_maintenance_1.svg" height={46} width={46} alt="" />
        <div className="my-auto flex gap-2">
          <AiFillLock className="my-auto inline h-6 w-6" height={32} width={32} />
          <span className="self-center text-xl font-semibold">Reparações</span>
        </div>
      </div>
    </div>
  );
};

export default HospedesMenu;
