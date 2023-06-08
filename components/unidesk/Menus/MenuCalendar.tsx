import React from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import {
  UNIDESK_SENHORIO_CALENDAR_URL,
  UNIDESK_SENHORIO_PAINEL_URL,
  UNIDESK_SENHORIO_REVIEWS_URL,
} from "../../../models/paths";

interface MenuCalendarProps {
  activeLink: "painel" | "listings" | "calendar" | "reviews";
}

const MenuCalendar = ({ activeLink }: MenuCalendarProps) => {
  return (
    <div className="rounded-2xl bg-terciary-600 px-6 py-8 lg:w-80">
      <Link href={UNIDESK_SENHORIO_PAINEL_URL}>
        <div
          className={classNames("flex cursor-pointer rounded-2xl px-4 py-5", {
            "bg-primary-300": activeLink == "painel",
          })}
        >
          <Image src="/images/icons8_male_user_2.svg" height={46} width={46} alt="" />
          <span className="ml-2 self-center text-xl font-semibold">Painel</span>
        </div>
      </Link>
      <Link href={UNIDESK_SENHORIO_PAINEL_URL}>
        <div
          className={classNames("flex gap-2 rounded-2xl px-4 py-5", {
            "bg-primary-300": activeLink == "listings",
          })}
        >
          <Image src="/images/icons8_card_exchange_1.svg" height={46} width={46} alt="" />
          <div className="my-auto flex gap-2">
            <span className="self-center text-xl font-semibold">Anúncios</span>
          </div>
        </div>
      </Link>
      <Link href={UNIDESK_SENHORIO_CALENDAR_URL}>
        <div
          className={classNames("flex gap-2 rounded-2xl px-4 py-5", {
            "bg-primary-300": activeLink == "calendar",
          })}
        >
          <Image src="/images/icons8_paycheque.svg" height={46} width={46} alt="" />
          <div className="my-auto flex gap-2">
            <span className="self-center text-xl font-semibold">Calendário</span>
          </div>
        </div>
      </Link>
      <Link href={UNIDESK_SENHORIO_REVIEWS_URL}>
        <div
          className={classNames("flex gap-2 rounded-2xl px-4 py-5", {
            "bg-primary-300": activeLink == "reviews",
          })}
        >
          <Image src="/images/icons8_maintenance_1.svg" height={46} width={46} alt="" />
          <div className="my-auto flex gap-2">
            <span className="self-center text-xl font-semibold">Reviews</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuCalendar;
