import React from "react";
import notification from "../../../public/images/notification.png";
import Image from "next/image";

const Notification = () => {
  return (
    <div className="flex justify-center align-middle items-center bg-primary-100  py-4  w-2/6 rounded-2xl mx-auto mt-14  mb-44">
      <div className="alert alert-warning con " role="alert">
      <Image className="h-10" src={notification} alt="" />
      </div>

      <div className="text-xl ml-6">Receba notificações sempre que houver novidades por aqui</div>

    </div>
  );
};

export default Notification;



{/* <div className="alert alert-warning con " role="alert">
<Image className="h-10" src={notification} alt="" />
Receba notificações sempre que houver novidades por aqui
</div> */}
