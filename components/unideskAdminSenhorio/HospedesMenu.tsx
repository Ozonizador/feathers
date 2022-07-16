import React from "react";
import Image from "next/image";
import Link from "next/link";

interface HospedesMenuProps {
  activeLink: string;
}

const HospedesMenu = ({ activeLink }) => {
  return (
    <div className="rounded-2xl bg-terciary-600 py-8 px-6">
      <Link href="">
        <div className="flex rounded-2xl py-5 px-4">
          <Image src="/images/icons8_male_user_2.svg" height={32} width={32} alt="" />
          <span className="ml-2 self-center font-bold">Hóspedes</span>
        </div>
      </Link>
      <Link href="">
        <div className="flex rounded-2xl py-5 px-4">
          <Image src="/images/icons8_card_exchange_1.svg" height={32} width={32} alt="" />
          <span className="ml-2 self-center font-bold">Transações</span>
        </div>
      </Link>
      <Link href="">
        <a>
          <div className="flex rounded-2xl py-5 px-4">
            <Image src="/images/icons8_paycheque.svg" height={32} width={32} alt="" />
            <span className="ml-2 self-center font-bold">Despesas</span>
          </div>
        </a>
      </Link>
      <Link href="">
        <div className="flex rounded-2xl py-5 px-4">
          <Image src="/images/icons8_maintenance_1.svg" height={32} width={32} alt="" />
          <span className="ml-2 self-center font-bold">Reparações</span>
        </div>
      </Link>
    </div>
  );
};

export default HospedesMenu;
