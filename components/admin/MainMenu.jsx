import React from "react";
import Image from "next/image";

import personalInformationImage from "../../public/images/mainmenu_1.png";
import paymentsImage from "../../public/images/mainmenu_2.png";
import configurationsImage from "../../public/images/mainmenu_3.png";

const MainMenu = () => {
  return (
    <>
      <div className="mb-7 flex flex-1 justify-center">
        <h5 className="text-3xl font-bold">Conta</h5>
      </div>
      <div className="my-5 flex justify-center">
        <div>
          <Image src={personalInformationImage} alt="Informações pessoais" height={96} width={96} />
        </div>
        <div className="ml-5">
          <div>Informações pessoais</div>
          <div>Forneça os dados sobre si e como o podemos contactar.</div>
        </div>
      </div>
      <div className="my-5 flex flex-1 justify-center">
        <div>
          <Image src={paymentsImage} alt="Informações pessoais" height={96} width={96} />
        </div>
        <div className="ml-5">
          <div>Pagamentos e recebimentos</div>
          <div>Defina como vai receber/pagar as transações que efectuar.</div>
        </div>
      </div>
      <div className="my-5 flex flex-1 justify-center">
        <div>
          <Image src={configurationsImage} alt="Informações pessoais" height={96} width={96} />
        </div>
        <div className="ml-5">
          <div>Configurações</div>
          <div>Atualize a sua palavra-passe e controle as notificações.</div>
        </div>
      </div>
    </>
  );
};

export default MainMenu;
