import React from "react";
import Link from "next/link";
import { ADMIN_URL } from "../../models/paths";
import Breadcrumbs, { BreadcrumbPath } from "../utils/Breadcrumbs";

/*
    pagina 33 do XD
*/

const paths = [
  { url: ADMIN_URL, label: "Conta" },
  { url: "", label: "Pagamentos e Recebimentos" },
] as BreadcrumbPath[];

const Payments = () => {
  return (
    <div className="max-width mb-20">
      <Breadcrumbs paths={paths} />

      <div className="flex flex-1 justify-center">
        <div className="w-full rounded-2xl border border-terciary-700 bg-terciary-300 p-10 px-5 lg:px-32">
          <div className="mb-5 text-3xl font-bold">Pagamentos e Recebimentos</div>
          <p>Adicione e faça gestão dos seus métodos de pagamento e recebimento.</p>

          {/* BOTÕES*/}
          <div className=" mb-20 mt-10 flex flex-col gap-4 lg:my-20 lg:flex-row">
            <button className="rounded-xl bg-primary-500 px-12 py-4 text-xl text-white">Pagamentos</button>
            <button className="rounded-xl bg-terciary-500 px-12 py-4 text-xl text-secondary-400">Recebimentos</button>
          </div>

          {/* ADICIONAR CARTÕES LINK */}

          <div className="font-base">Cartões</div>
          <div className="flex w-full flex-row gap-4 lg:w-3/5">
            {/* CARTÃO 1 */}
            <div className=" mt-5 flex h-5 flex-1  items-center justify-center rounded-md border-2 border-dashed border-terciary-500 pb-16 pt-9 lg:py-28">
              <div className="space-y-1 text-center">
                <div className="flex  text-terciary-700">
                  <label className="relative cursor-pointer rounded-md text-8xl text-secondary-400">
                    <span>+</span>
                    <input type="file" className="sr-only" />
                  </label>
                </div>
              </div>
            </div>
            {/* CARTÃO 2 */}
            <div className=" mt-5 flex h-5 flex-1  items-center justify-center rounded-md border-2 border-dashed border-terciary-500 pb-16 pt-9 lg:py-28">
              <div className="space-y-1 text-center">
                <div className="flex  text-terciary-700">
                  <label className="relative cursor-pointer rounded-md text-8xl text-secondary-400">
                    <span>+</span>
                    <input type="file" className="sr-only" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* ADICIONAR CARTÕES */}
          <Link href="#">
            <a>
              <div className="my-5 flex flex-row items-center align-middle">
                <div className="mt-16 text-2xl text-primary-500 lg:mt-0">
                  <span className=" mr-3">Adicionar outro método de pagamento</span> &#129062;
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payments;
