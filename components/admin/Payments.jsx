import React from "react";
import Link from "next/link";

/*
    pagina 33 do XD
*/

const Payments = () => {
  return (
    <section>
      <div className=" w-10/12 mx-auto mb-20 ">
        <div className="my-10 text-xl font-b">
          <Link href="/admin">Conta</Link>
          {" > Pagamentos e Recebimentos"}
        </div>



        <div className="flex flex-1 justify-center">
          <div className="w-full bg-terciary-300 px-5 p-10 border border-terciary-700 rounded-2xl lg:px-32">
            <div className="font-bold text-3xl mb-5">Pagamentos e Recebimentos</div>
            <p>Adicione e faça gestão dos seus métodos de pagamento e recebimento.</p>


            {/* BOTÕES*/}
            <div className=" flex flex-col mb-20 mt-10 lg:flex-row gap-4 lg:my-20">
              <button className="bg-primary-500 py-4 px-12 text-white text-xl rounded-xl">Pagamentos</button>
              <button className="bg-terciary-500 py-4 px-12 text-secondary-400 text-xl rounded-xl">Recebimentos</button>
            </div>

            {/* ADICIONAR CARTÕES LINK */}

            <div className="font-base">
              Cartões
            </div>
            <div className="flex flex-row gap-4 w-full lg:w-3/5">

              {/* CARTÃO 1 */}
              <div className=" flex flex-1 justify-center items-center  border-2 border-terciary-500 border-dashed rounded-md pt-9 pb-16 lg:py-28 mt-5 h-5">
                <div className="space-y-1 text-center">
                  <div className="flex  text-terciary-700">

                    <label className="relative cursor-pointer text-8xl rounded-md text-secondary-400">
                      <span>+</span>
                      <input type="file" className="sr-only" />
                    </label>
                  </div>
                </div>
              </div>
              {/* CARTÃO 2 */}
              <div className=" flex flex-1 justify-center items-center  border-2 border-terciary-500 border-dashed rounded-md pt-9 pb-16 lg:py-28 mt-5 h-5">
                <div className="space-y-1 text-center">
                  <div className="flex  text-terciary-700">

                    <label className="relative cursor-pointer text-8xl rounded-md text-secondary-400">
                      <span>+</span>
                      <input type="file" className="sr-only" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* ADICIONAR CARTÕES */}
            <Link href="/">
              <a>
                <div className="flex flex-row items-center align-middle my-5">
                  <div className="text-primary-500 text-2xl mt-16 lg:mt-0">
                    <span className=" mr-3">Adicionar outro método de pagamento</span> &#129062;
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>


  );
};

export default Payments;
