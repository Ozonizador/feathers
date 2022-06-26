import React from "react";
import Image from "next/image";

import personalInformationImage from "../../public/images/mainmenu_1.png";
import paymentsImage from "../../public/images/mainmenu_2.png";
import configurationsImage from "../../public/images/mainmenu_3.png";
import Link from "next/link";

/*
    pagina 31 do XD
*/

const MainMenu = () => {
  return (
    <>
      <div className="mb-7 flex flex-1 justify-center">
        <h5 className="text-3xl font-bold">Conta</h5>
      </div>
      <Link href="/admin/general">
        <a>
          <div className="my-5 flex cursor-pointer justify-center">
            <div className="p-2x flex">
              <div>
                <Image
                  src={personalInformationImage}
                  alt="Informações pessoais"
                  height={96}
                  width={96}
                />
              </div>
              <div className="ml-5 mt-6">
                <div>Informações pessoais</div>
                <div>Forneça os dados sobre si e como o podemos contactar.</div>
              </div>
            </div>
          </div>
        </a>
      </Link>
      <Link href="/admin/general">
        <a>
          <div className="my-5 flex cursor-pointer justify-center">
            <div className="p-2x flex">
              <div>
                <Image src={paymentsImage} alt="Informações pessoais" height={96} width={96} />
              </div>
              <div className="ml-5 mt-6">
                <div>Pagamentos e recebimentos</div>
                <div>Defina como vai receber/pagar as transações que efectuar.</div>
              </div>
            </div>
          </div>
        </a>
      </Link>
      <Link href="/admin/general">
        <a>
          <div className="my-5 flex cursor-pointer justify-center">
            <div className="p-2x flex">
              <div>
                <Image
                  src={configurationsImage}
                  alt="Informações pessoais"
                  height={96}
                  width={96}
                />
              </div>
              <div className="ml-5 mt-6">
                <div>Configurações</div>
                <div>Atualize a sua palavra-passe e controle as notificações.</div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

export default MainMenu;
