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
        <h5 className="text-5xl font-bold mt-16 mb-12">Conta</h5>
      </div>

      <div className="px-4 flex flex-col justify-center align-middle items-center gap-12">

        <div className="lg:w-1/3 drop-shadow-xl bg-white rounded-2xl">
          <Link href="/admin/general">
            <a>
              <div className="my-5 flex cursor-pointer pl-5 ">
                <div className="flex">
                  <div>
                    <Image src={personalInformationImage} alt="Informações pessoais" height={96} width={96} />

                  </div>
                  <div className="ml-3 lg:ml-5 lg:mt-6 p-2">
                    <div className="font-bold text-xl lg:text-2xl mb-2">Informações pessoais</div>
                    <div>Forneça os dados sobre si e como o podemos contactar.</div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>


        <div className="lg:w-1/3 drop-shadow-xl bg-white rounded-2xl">
          <Link href="/admin/payments">
            <a>
              <div className="my-5 flex cursor-pointer pl-5 ">
                <div className=" flex">
                  <div>
                    <Image src={paymentsImage} alt="Pagamentos" height={96} width={96} />
                  </div>
                  <div className="ml-3 lg:ml-5 lg:mt-6 p-2">
                    <div className="font-bold text-xl lg:text-2xl mb-2">Pagamentos e recebimentos</div>
                    <div>Defina como vai receber/pagar as transações que efectuar.</div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>


        <div className="lg:w-1/3 drop-shadow-xl bg-white rounded-2xl">
          <Link href="/admin/configurations">
            <a>
              <div className="my-5 flex cursor-pointer pl-5 ">
                <div className=" flex">
                  <div>
                    <Image src={configurationsImage} alt="Configurações" height={96} width={96} />
                  </div>
                  <div className="ml-3 lg:ml-5 lg:mt-6 p-2">
                    <div className="font-bold text-xl lg:text-2xl mb-2">Configurações</div>
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
