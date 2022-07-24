import React from "react";
import { Avatar } from "flowbite-react";

/* to remove it */
export const CaixaCardRecusada = () => {
  return (
    <div className="mb-2 flex bg-white py-2">
      <div className="flex w-20 flex-col items-center justify-center align-middle">
        <Avatar
          alt="Hóspede"
          img="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          rounded={true}
          size="md"
        />
        <div className="mt-2 text-xs font-bold">Maria</div>
      </div>

      <div className="ml-1">
        <div className="flex flex-row justify-between">
          <h1 className="text-base font-bold text-red-500">Reserva Recusada</h1>
          <p className="text-xs">16:45</p>
        </div>
        <h2 className="mt-2 mb-2 text-xs text-secondary-500">
          Sed ut perspiciatis unde omnis iste natus error sit volup tatem
        </h2>

        <a>
          <p className="text-xs font-normal text-secondary-400">Nome do anuncio</p>
        </a>
      </div>
    </div>
  );
};
export default CaixaCardRecusada;
