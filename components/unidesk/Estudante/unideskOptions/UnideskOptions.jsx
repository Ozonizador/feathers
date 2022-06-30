import React from "react";
import Image from "next/image"
import Link from "next/link"





const UnideskOptions = () => {
    return (
<section className="container mx-auto flex gap-7 my-32">

    {/* OPTION1 */}
        <div className="flex flex-col rounded-2xl bg-white p-5 drop-shadow-2xl pb-10 lg:w-2/6">
          <div className="flex flex-1 flex-col items-center align-middle pt-12">
          <Image
                //   className="object-scale-down"
                  src="/images/icon-pg14-1.svg"
                  alt=""
                  height="80"
                  width="80"
                ></Image>
          <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">Minha estadia</h1>
          </div>
                <p className="text-xl">Informações gerais</p>
                <div  className="flex flex-row">
                <Image
                  className="object-scale-down"
                  src="/images/icon-pg14-5.svg"
                  alt=""
                  height="25"
                  width="25"
                ></Image>
                <p className="my-auto ml-2 py-2 text-xl">Renda</p>
              </div>


              <div  className="flex flex-row">
                <Image
                  className="object-scale-down"
                  src="/images/icon-pg14-5.svg"
                  alt=""
                  height="25"
                  width="25"
                ></Image>
                <p className="my-auto ml-2 py-2 text-xl">Reparações</p>
              </div>


              <div  className="flex flex-row">
                <Image
                  className="object-scale-down"
                  src="/images/icon-pg14-5.svg"
                  alt=""
                  height="25"
                  width="25"
                ></Image>
                <p className="my-auto ml-2 py-2 text-xl">Despesas</p>
              </div>

              <div  className="flex flex-row">
                <Image
                  className="object-scale-down"
                  src="/images/icon-pg14-5.svg"
                  alt=""
                  height="25"
                  width="25"
                ></Image>
                <p className="my-auto ml-2 py-2 text-xl">Informações contratuais</p>
              </div>
              
              <div>
          </div>
        </div>

       

    {/* OPTION2 */}
    <div className="flex flex-col rounded-2xl bg-white p-5 drop-shadow-2xl pb-10 lg:w-2/6">
        <div>
          <div className="flex flex-1 flex-col items-center align-middle pt-12">
            <Image
                    src="/images/icon-pg14-2.svg"
                    alt=""
                    height="80"
                    width="80"
                    ></Image>
            <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">Favoritos</h1>
          </div>
        </div>
    </div>



   {/* OPTION3 */}
   <div className="flex flex-col rounded-2xl bg-white p-5 drop-shadow-2xl pb-10 lg:w-2/6">
        <div className="pt-12 flex flex-col justify-center">
            <Image
                    src="/images/icon-pg14-3.svg"
                    alt=""
                    height="80"
                    width="80"
            ></Image>
            <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">Favoritos</h1>
        </div>
        <div className="flex flex-col justify-start">
        <p className="text-xl">Pedidos de reserva</p>
        <p className="text-xl">Mensagens</p>
        </div>
    </div>




    {/* OPTION4 */}
    <div className="flex flex-col rounded-2xl bg-white p-5 drop-shadow-2xl pb-10 lg:w-2/6">
            <div>
            <div className="flex flex-1 flex-col items-center align-middle pt-12">
                <Image
                        src="/images/icon-pg14-4.svg"
                        alt=""
                        height="80"
                        width="80"
                        ></Image>
                <h1 className="mt-4 text-center text-2xl font-bold text-primary-500">Notificações</h1>
            </div>
            </div>
    </div>













</section>










    );
};

export default UnideskOptions;
