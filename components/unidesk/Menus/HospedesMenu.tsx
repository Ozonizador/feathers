import React from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

interface HospedesMenuProps {
  activeLink: string;
}

/* MENU HOSPEDES - PAGINA 60 XD */

const HospedesMenu = ({ activeLink }: HospedesMenuProps) => {
  return (
    <div className="w-80 rounded-2xl bg-terciary-600 py-8 px-6">
      <Link href="">
        <div
          className={classNames("flex rounded-2xl py-5 px-4", {
            "bg-primary-300": activeLink == "hospedes",
          })}
        >
          <Image src="/images/icons8_male_user_2.svg" height={46} width={46} alt="" />
          <span className="ml-2 self-center text-xl font-semibold">Hóspedes</span>
        </div>
      </Link>
      <Link href="">
        <div className="flex rounded-2xl py-5 px-4">
          <Image src="/images/icons8_card_exchange_1.svg" height={46} width={46} alt="" />
          <span className="ml-2 self-center text-xl font-semibold">Transações</span>
        </div>
      </Link>
      <Link href="">
        <a>
          <div className="flex rounded-2xl py-5 px-4">
            <Image src="/images/icons8_paycheque.svg" height={46} width={46} alt="" />
            <span className="ml-2 self-center text-xl font-semibold">Despesas</span>
          </div>
        </a>
      </Link>
      <Link href="">
        <div className="flex rounded-2xl py-5 px-4">
          <Image src="/images/icons8_maintenance_1.svg" height={46} width={46} alt="" />
          <span className="ml-2 self-center text-xl font-semibold">Reparações</span>
        </div>
      </Link>
    </div>
  );
};

export default HospedesMenu;
