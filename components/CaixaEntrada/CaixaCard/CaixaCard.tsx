import React from "react";
import { Avatar } from "flowbite-react";
import { Profile } from "../../../models/profile";
import { ReservationStatusLabel, ReservationWithAdvertisement } from "../../../models/reservation";
import { useTranslation } from "next-i18next";

interface CaixaCardProps {
  profile?: Profile;
  reservation: Pick<ReservationWithAdvertisement, "updated_at" | "status" | "advertisement">;
}

const CaixaCard = ({ profile, reservation }: CaixaCardProps) => {
  const { t } = useTranslation();
  const formatCardDate = () => {
    if (!reservation?.updated_at) return "";
    const now = new Date();
    const reservationDate = new Date(reservation.updated_at);
    let msBetweenDates = Math.abs(reservationDate.getTime() - now.getTime());

    const daysBetweenDates = msBetweenDates / (60 * 60 * 1000 * 24);
    if (daysBetweenDates < 1) {
      return `${reservationDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    return `${reservationDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}`;
  };
  return (
    <div className="mb-2 flex w-72 gap-5 p-2">
      <div className="flex w-1/3 flex-col items-center justify-center align-middle">
        <Avatar alt="Hóspede" img={profile?.avatar_url || "/icons/user/user.svg"} rounded={true} size="md" />
        <div className="mt-2 text-xs font-bold">{profile?.name || ""}</div>
      </div>

      <div className="flex w-full flex-col">
        <div className="flex w-full flex-row">
          <h1 className="text-base font-bold text-green-500">
            {t(ReservationStatusLabel[reservation.status as keyof typeof ReservationStatusLabel])}
          </h1>
          <p className="my-auto ml-auto text-xs">{formatCardDate()}</p>
        </div>
        <h2 className="mb-2 mt-2 line-clamp-2 text-xs text-secondary-500">{profile?.description || ""}</h2>
        <p className="text-xs font-normal text-secondary-400">{reservation.advertisement?.title || ""}</p>
      </div>
    </div>
  );
};

export default CaixaCard;
