import React from "react";
// import Menu from "../unideskAdminEstudante/Menu";
import { IoWarningOutline } from "react-icons/io5";
import { BsCheckCircle } from "react-icons/bs";
import MenuEstudante from "../unidesk/Menus/MenuEstudante";
import { ADMIN_URL } from "../../models/paths";
import Breadcrumbs, { BreadcrumbPath } from "../utils/Breadcrumbs";

const paths = [
  { url: ADMIN_URL, label: "Conta" },
  { url: "", label: "Informações pessoais" },
] as BreadcrumbPath[];

const InfoPessoais = () => {
  return (
    <section>
      <div className=" mx-auto mb-20 w-10/12 ">
        <Breadcrumbs paths={paths} />

        <div className="flex flex-1 justify-center">
          <div className="w-full rounded-2xl border border-terciary-700 bg-terciary-300 p-10 px-10">
            <div className="my-4 flex flex-row gap-7">
              <div className="w-2/6 ">
                {/* <Menu /> */}
                <MenuEstudante activeSection={"stay"} activeUrl={"general"} />
              </div>

              <div className="flex w-full flex-col  px-6">
                <div className="mb-10 text-3xl font-bold">Renda</div>

                <div className="flex flex-row">
                  <div className="flex-1">
                    <div className="mb-1 text-xl">Valor Mensal Outubro</div>
                    <div className="text-2xl font-bold">
                      400€/<span className="text-base ">mês</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-1 text-xl">Despesas mês de outubro</div>
                    <div className="text-2xl font-bold">32,40€</div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                      <div>
                        <IoWarningOutline className=" text-red-700" />
                      </div>
                      <div className="mb-1 text-xl">O pagamento está em atraso</div>
                    </div>
                    <div className="mt-1">
                      <button className="mb-2 mr-2 rounded-lg bg-red-700 px-12 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300">
                        Pagar renda
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6  text-2xl">Histórico de pagamentos</div>

                <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-xl">
                          Data
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl">
                          Descritivo
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl">
                          Valor
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 text-xl font-normal text-gray-900 dark:text-white"
                        >
                          07/09/2021
                        </th>
                        <td className="px-6 py-4 text-xl font-normal">Renda + Despesas Setembro</td>
                        <td className="px-6 py-4 text-xl font-normal">425,30€</td>

                        <td className="px-6 py-4 text-right">
                          <a href="#" className="text-2xl font-bold text-green-400">
                            <BsCheckCircle />
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 text-xl font-normal text-gray-900 dark:text-white"
                        >
                          07/09/2021
                        </th>
                        <td className="px-6 py-4 text-xl font-normal">Renda + Despesas Setembro</td>
                        <td className="px-6 py-4 text-xl font-normal">425,30€</td>

                        <td className="px-6 py-4 text-right">
                          <a href="#" className="text-2xl font-bold text-green-400">
                            <BsCheckCircle />
                          </a>
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 text-xl font-normal text-gray-900 dark:text-white"
                        >
                          07/09/2021
                        </th>
                        <td className="px-6 py-4 text-xl font-normal">Renda + Despesas Setembro</td>
                        <td className="px-6 py-4 text-xl font-normal">425,30€</td>

                        <td className="px-6 py-4 text-right">
                          <a href="#" className="text-2xl font-bold text-green-400">
                            <BsCheckCircle />
                          </a>
                        </td>
                      </tr>

                      <tr className="border-t bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 text-xl font-normal text-gray-900 dark:text-white"
                        >
                          07/09/2021
                        </th>
                        <td className="px-6 py-4 text-xl font-normal">Renda + Despesas Setembro</td>
                        <td className="px-6 py-4 text-xl font-normal">425,30€</td>

                        <td className="px-6 py-4 text-right">
                          <a href="#" className="text-2xl font-bold text-green-400">
                            <BsCheckCircle />
                          </a>
                        </td>
                      </tr>

                      <tr className="border-t bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 text-xl font-normal text-gray-900 dark:text-white"
                        >
                          07/09/2021
                        </th>
                        <td className="px-6 py-4 text-xl font-normal">Renda + Despesas Setembro</td>
                        <td className="px-6 py-4 text-xl font-normal">425,30€</td>

                        <td className="px-6 py-4 text-right">
                          <a href="#" className="text-2xl font-bold text-green-400">
                            <BsCheckCircle />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 text-center text-secondary-400">Não tem mais pagamentos para mostrar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoPessoais;
