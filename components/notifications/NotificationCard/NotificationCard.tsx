import Link from "next/link";
import { Notification } from "../../../models/notification";
interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  return (
    <>
      <div className="mb-5 flex w-full flex-row items-center justify-between rounded-md border border-gray-200 p-4">
        <div className="flex flex-col">
          <h1 className="mb-1 text-xl font-bold">{notification.title}</h1>
          <p className="text-base text-gray-400 ">{notification.description}</p>
        </div>

        <div>
          <Link href={notification.url}>
            <a className="rounded-full bg-primary-500 py-3 px-11 text-center text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
              ir para a caixa de entrada
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotificationCard;
