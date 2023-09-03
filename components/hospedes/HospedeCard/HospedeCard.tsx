import React from "react";
import { Avatar } from "flowbite-react";
import Link from "next/link";
import { TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import { ReservationGuest } from "../../../models/reservation";
import { useTranslation } from "next-i18next";

interface HospedeCardProps {
  stay: ReservationGuest;
}

const HospedeCard = ({ stay }: HospedeCardProps) => {
  const { t } = useTranslation();
  const { advertisement, tenant } = stay;
  return (
    <div className="mt-5 flex gap-2 rounded-md bg-white p-2 py-6">
      <div className="flex w-36 flex-col items-center justify-center align-middle">
        <Avatar alt="Hóspede" img={tenant?.avatar_url || "/icons/user/user.svg"} rounded={true} size="lg" />

        <div className="mt-2 font-bold">{tenant.name}</div>
      </div>

      <div>
        <h1 className="text-xl font-bold">A hospedar em</h1>
        <h2 className="mb-6 mt-2 text-base text-secondary-500">
          {t(TYPE_ADVERTISEMENT[advertisement.type])} em {advertisement.place}
        </h2>
        <Link href={`/anuncio/${advertisement.slug}`}>
          <p className="text-base font-normal text-primary-500">+ informações</p>
        </Link>
      </div>
    </div>
  );
};

export default HospedeCard;
