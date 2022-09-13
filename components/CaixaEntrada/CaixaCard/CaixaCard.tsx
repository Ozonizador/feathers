import React from "react";
import { Avatar } from "flowbite-react";
import { Profile } from "../../../models/profile";
import { ReservationStatusLabel, ReservationWithAdvertisement } from "../../../models/reservation";

interface CaixaCardProps {
  profile: Profile;
  reservation: Partial<ReservationWithAdvertisement>;
}

const CaixaCard = ({ profile, reservation }: CaixaCardProps) => {
  return (
    <>
      <div className="gap-3p-2 mb-2 flex">
        <div className="flex w-20 flex-col items-center justify-center align-middle">
          <Avatar
            alt="Hóspede"
            img={
              profile.avatar_url ? profile.avatar_url : "https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            }
            rounded={true}
            size="md"
          />
          <div className="mt-2 text-xs font-bold">{profile.name}</div>
        </div>

        <div className="ml-1">
          <div className="flex flex-row justify-between">
            <h1 className="text-base font-bold text-green-500">{ReservationStatusLabel[reservation.status]}</h1>
            <p className="text-xs">{new Date(reservation.updated_at).toDateString()}</p>
          </div>
          <h2 className="mt-2 mb-2 text-xs text-secondary-500">{profile.description}</h2>

          <a>
            <p className="text-xs font-normal text-secondary-400">{reservation.advertisement.title}</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default CaixaCard;
