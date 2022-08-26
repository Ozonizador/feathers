import React from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

// interface MenuTeste {
//     activeLink: "guests" | "transactions" | "expenses" | "repairs";
// }

/* MENU HOSPEDES - PAGINA 60 XD */

const MenuTest = () => {
  return (
    <div className="w-80 rounded-2xl bg-terciary-600 py-8 px-6">
      <Link href="/unidesk/unicontrolo/guests">
        <div
          className={classNames("flex rounded-2xl py-5 px-4", {
            // "bg-primary-300": activeLink == "guests",
          })}
        >
          <Image src="/images/icons8_male_user_2.svg" height={46} width={46} alt="" />
          <span className="ml-2 self-center text-xl font-semibold">Hóspedes</span>
        </div>
      </Link>
      <Link href="/unidesk/unicontrolo/transactions">
        <div
          className={classNames("flex rounded-2xl py-5 px-4", {
            // "bg-primary-300": activeLink == "transactions",
          })}
        >
          <Image src="/images/icons8_card_exchange_1.svg" height={46} width={46} alt="" />
          <span className="ml-2 self-center text-xl font-semibold">Transações</span>
        </div>
      </Link>
      <Link href="/unidesk/unicontrolo/expenses">
        <div
          className={classNames("flex rounded-2xl py-5 px-4", {
            // "bg-primary-300": activeLink == "expenses",
          })}
        >
          <Image src="/images/icons8_paycheque.svg" height={46} width={46} alt="" />
          <span className="ml-2 self-center text-xl font-semibold">Despesas</span>
        </div>
      </Link>
      <Link href="/unidesk/unicontrolo/repairs">
        <div
          className={classNames("flex rounded-2xl py-5 px-4", {
            // "bg-primary-300": activeLink == "repairs",
          })}
        >
          <Image src="/images/icons8_maintenance_1.svg" height={46} width={46} alt="" />
          <span className="ml-2 self-center text-xl font-semibold">Reparações</span>
        </div>
      </Link>
    </div>
  );
};

export default MenuTest;
