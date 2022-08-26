import Link from "next/link";
import { BUTTON_MESSAGE_LABEL, Notification, NOTIFICATION_LINKS } from "../../../models/notification";
interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  return (
    <>
      <div className="mb-5 flex w-full flex-col items-center justify-between gap-5 rounded-md border border-gray-200 p-4 lg:flex-row">
        <div className="lg:flex lg:flex-col">
          <h1 className="mb-1 text-xl font-bold">{notification.title}</h1>
          <p className="text-base text-gray-400 ">{notification.description}</p>
        </div>

        <div>
          <Link href={NOTIFICATION_LINKS[notification.type]}>
            <a>
              <button className="rounded-full bg-primary-500 py-3 px-11 text-center text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
                {BUTTON_MESSAGE_LABEL[notification.type]}
              </button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotificationCard;
