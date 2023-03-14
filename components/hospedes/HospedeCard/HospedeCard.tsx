import React from "react";
import { Avatar } from "flowbite-react";
import Link from "next/link";
import { TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import { StayGuest } from "../../../models/stay";

interface HospedeCardProps {
  stay: StayGuest;
}

const HospedeCard = ({ stay }: HospedeCardProps) => {
  const { advertisement, tenant } = stay;
  return (
    <div className="mt-5 flex gap-2 rounded-md bg-white p-2 py-6">
      <div className="flex w-36 flex-col items-center justify-center align-middle">
        <Avatar alt="Hóspede" img={tenant?.avatar_url || "/images/sec6-person1.jpg"} rounded={true} size="lg" />

        <div className="mt-2 font-bold">{tenant.name}</div>
      </div>

      <div>
        <h1 className="text-xl font-bold">A hospedar em</h1>
        <h2 className="mt-2 mb-6 text-base text-secondary-500">
          {TYPE_ADVERTISEMENT[advertisement.type]} em {advertisement.place}
        </h2>
        <Link href={`/anuncio/${advertisement.slug}`}>
          <a>
            <p className="text-base font-normal text-primary-500">+ informações</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HospedeCard;
