import React from "react";
import { Avatar } from "flowbite-react";
import { Profile } from "../../../models/profile";
import { ReservationStatusLabel, ReservationWithAdvertisement } from "../../../models/reservation";

interface CaixaCardProps {
  profile: Profile;
  reservation: Partial<ReservationWithAdvertisement>;
}

const CaixaCard = ({ profile, reservation }: CaixaCardProps) => {
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
    <div className="mb-2 flex gap-5 p-2">
      <div className="flex flex-col items-center justify-center align-middle">
        <Avatar
          alt="Hóspede"
          img={profile.avatar_url ? profile.avatar_url : "/images/sec6-person1.jpg"}
          rounded={true}
          size="md"
        />
        <div className="mt-2 text-xs font-bold">{profile.name}</div>
      </div>

      <div className="flex-1">
        <div className="flex flex-row justify-between">
          <h1 className="text-base font-bold text-green-500">{ReservationStatusLabel[reservation.status]}</h1>
          <p className="text-xs">{formatCardDate()}</p>
        </div>
        <h2 className="mt-2 mb-2 text-xs text-secondary-500 line-clamp-2">{profile.description}</h2>

        <p className="text-xs font-normal text-secondary-400">{reservation.advertisement.title}</p>
      </div>
    </div>
  );
};

export default CaixaCard;
