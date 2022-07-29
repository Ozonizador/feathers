import React from "react";
import notification from "../../../public/images/notification.png";
import Image from "next/image";

const Notification = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="mx-auto mt-14 mb-44 flex flex-col items-center justify-center rounded-2xl  bg-primary-100 py-4 text-center align-middle  lg:w-2/6 lg:flex-row lg:text-left">
          <div className="alert alert-warning con ml-3" role="alert">
            <Image className="h-10" src={notification} alt="" />
          </div>

          <div className="ml-6 text-xl">Receba notificações sempre que houver novidades por aqui</div>
        </div>
      </div>
    </>
  );
};

export default Notification;
