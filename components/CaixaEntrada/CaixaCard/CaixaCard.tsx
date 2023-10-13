import React from "react";
import { Avatar } from "flowbite-react";
import { Profile } from "../../../models/profile";
import { ReservationStatusLabel, ReservationWithAdvertisement } from "../../../models/reservation";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { MessageWithProfile } from "../../../models/message";

interface CaixaCardProps {
  profile?: Profile;
  messagerProfile: Profile;
  reservation: Pick<ReservationWithAdvertisement, "updated_at" | "status" | "advertisement">;
  messages: MessageWithProfile[];
}

const CaixaCard = ({ profile, messagerProfile,reservation, messages }: CaixaCardProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const reservationStatus = () => {
    switch (reservation.status) {
      case "REQUESTED":
        return (<h1 className="text-base font-bold text-yellow-500">
          {t(ReservationStatusLabel[reservation.status as keyof typeof ReservationStatusLabel])}
        </h1>);
      case "ACCEPTED":
        return (<h1 className="text-base font-bold text-green-500">
          {t(ReservationStatusLabel[reservation.status as keyof typeof ReservationStatusLabel])}
        </h1>);
      case "REJECTED":
        return (<h1 className="text-base font-bold text-red-500">
          {t(ReservationStatusLabel[reservation.status as keyof typeof ReservationStatusLabel])}
        </h1>);
      case "CHANGE_REQUESTED":
      case "CHANGE_ACCEPTED":
      case "CHANGE_REJECTED":
      default:
        return (<h1 className="text-base font-bold text-yellow-500">
          {t(ReservationStatusLabel[reservation.status as keyof typeof ReservationStatusLabel])}
        </h1>);
    }
  };

  const formatCardDate = () => {
    if (!reservation?.updated_at) return "";
    const now = new Date();
    const reservationDate = new Date(reservation.updated_at);
    let msBetweenDates = Math.abs(reservationDate.getTime() - now.getTime());

    const daysBetweenDates = msBetweenDates / (60 * 60 * 1000 * 24);
    if (daysBetweenDates < 1) {
      return `${reservationDate.toLocaleTimeString(router.locale, {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    return `${reservationDate.toLocaleDateString(router.locale, { day: "2-digit", month: "short" })}`;
  };

  const avatar = () => {
    if (messages != undefined && messages.length > 0) {
      return <Avatar alt="Hóspede" img={(profile?.avatar_url || messages[0].profile.avatar_url) || "/icons/user/user.svg"} rounded={true} size="md" />
    }

    return <Avatar alt="Hóspede" img={profile?.avatar_url || "/icons/user/user.svg"} rounded={true} size="md" />
  }

  const lastMessage = () => {
    if (messages != undefined && messages.length > 0) {
      if(profile?.id != messages[messages.length - 1].profile_id) {
        return <h5>{`${messages[messages.length - 1].profile.name}: ${messages[messages.length - 1].message}`}</h5>
      }
      
      return <h5>{`${t("you")}: ${messages[messages.length - 1].message}`}</h5>
    }
  }

  return (
    <div className="mb-2 flex w-72 gap-5 p-2">
      <div className="flex w-1/3 flex-col items-center justify-center align-middle">
        {avatar()}
        <div className="mt-2 text-xs font-bold">
          {messagerProfile?.name || ""}
        </div>
      </div>

      <div className="flex w-full flex-col">
        <div className="flex w-full flex-row">
          {reservationStatus()}
        </div>
        <p className="my-auto mr-auto text-xs">{formatCardDate()}</p>
        <h2 className="mb-2 mt-4 line-clamp-2 text-xs text-secondary-500">{profile?.description || ""}</h2>
        {lastMessage()}
        <p className="text-xs font-normal text-secondary-400">{reservation.advertisement?.title || ""}</p>
      </div>
    </div>
  );
};

export default CaixaCard;
