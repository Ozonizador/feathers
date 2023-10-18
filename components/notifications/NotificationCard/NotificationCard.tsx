import Link from "next/link";
import {
  BUTTON_MESSAGE_LABEL,
  Notification,
  NOTIFICATION_LINKS,
  NOTIFICATION_TYPES_INFORMATION,
} from "../../../models/notification";
import Button from "../../utils/Button"
import { useCallback } from "react";
import useProfileService from "../../../hooks/useProfileService"
interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const profileService = useProfileService();

  const handleClick = useCallback(() => {
    profileService.makeNotificationSeen(notification.id);
  }, [notification.id])
  return (
    <>
      <div className="mb-5 flex w-full flex-col justify-between gap-5 rounded-md border border-gray-200 p-4 lg:flex-row lg:items-center">
        <div className="lg:flex lg:flex-col">
          <h1 className="mb-1 text-xl font-bold">{NOTIFICATION_TYPES_INFORMATION[notification.type].title}</h1>
          <p className="text-base text-gray-400 ">{NOTIFICATION_TYPES_INFORMATION[notification.type].description}</p>
        </div>

        <div className="w-fit min-w-[300px]">
          <Link href={NOTIFICATION_LINKS[notification.type]} onClick={() => handleClick()}>
            <Button rounded="full" type="button">
              {BUTTON_MESSAGE_LABEL[notification.type]}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotificationCard;
