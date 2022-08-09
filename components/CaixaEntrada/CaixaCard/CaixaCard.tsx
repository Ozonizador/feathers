import React from "react";
import { Avatar } from "flowbite-react";
import { Profile } from "../../../models/profile";
import { Reservation, ReservationStatusLabel } from "../../../models/reservation";

interface CaixaCardProps {
  profile: Profile;
  reservation: Reservation;
}

const CaixaCard = ({ profile, reservation }: CaixaCardProps) => {
  return (
    <>
      <div className="mb-2 flex gap-3 bg-white p-2">
        <div className="flex w-20 flex-col items-center justify-center align-middle">
          <Avatar
            alt="Hóspede"
            img={
              profile.avatarUrl ? profile.avatarUrl : "https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            }
            rounded={true}
            size="md"
          />
          <div className="mt-2 text-xs font-bold">{profile.name}</div>
        </div>

        <div className="ml-1">
          <div className="flex flex-row justify-between">
            <h1 className="text-base font-bold text-green-500">{ReservationStatusLabel[reservation.status]}</h1>
            <p className="text-xs">{new Date(reservation.updatedAt).toDateString()}</p>
          </div>
          <h2 className="mt-2 mb-2 text-xs text-secondary-500">
            Sed ut perspiciatis unde omnis iste natus error sit volup tatem
          </h2>

          <a>
            <p className="text-xs font-normal text-secondary-400">Nome do anuncio</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default CaixaCard;
