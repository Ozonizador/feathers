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
      <div className="mb-3 flex flex-1 justify-center">
        <h5 className="my-12 text-5xl font-bold">Conta</h5>
      </div>

      <div className="flex flex-col items-center justify-center gap-12 px-4 pb-10 align-middle">
        <div className="rounded-2xl bg-white drop-shadow-xl lg:w-1/3">
          <Link href="/admin/general">
            <a>
              <div className="my-5 flex cursor-pointer pl-5 ">
                <div className="flex">
                  <div>
                    <Image src={personalInformationImage} alt="Informações pessoais" height={96} width={96} />
                  </div>
                  <div className="ml-3 p-2 lg:ml-5 lg:mt-6">
                    <div className="mb-2 text-xl font-bold lg:text-2xl">Informações pessoais</div>
                    <div>Forneça os dados sobre si e como o podemos contactar.</div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>

        <div className="rounded-2xl bg-white drop-shadow-xl lg:w-1/3">
          <Link href="/admin/payments">
            <a>
              <div className="my-5 flex cursor-pointer pl-5 ">
                <div className=" flex">
                  <div>
                    <Image src={paymentsImage} alt="Pagamentos" height={96} width={96} />
                  </div>
                  <div className="ml-3 p-2 lg:ml-5 lg:mt-6">
                    <div className="mb-2 text-xl font-bold lg:text-2xl">Pagamentos e recebimentos</div>
                    <div>Defina como vai receber/pagar as transações que efectuar.</div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>

        <div className="rounded-2xl bg-white drop-shadow-xl lg:w-1/3">
          <Link href="/admin/configurations">
            <a>
              <div className="my-5 flex cursor-pointer pl-5 ">
                <div className=" flex">
                  <div>
                    <Image src={configurationsImage} alt="Configurações" height={96} width={96} />
                  </div>
                  <div className="ml-3 p-2 lg:ml-5 lg:mt-6">
                    <div className="mb-2 text-xl font-bold lg:text-2xl">Configurações</div>
                    <div>Atualize a sua palavra-passe e controle as notificações.</div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainMenu;
