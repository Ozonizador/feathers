import React from "react";
import Link from "next/link";
import Image from "next/image";
import Menu from "../unideskAdminEstudante/Menu"
import { IoWarningOutline } from "react-icons/io5"
import { BsCheckCircle } from "react-icons/bs"


const InfoPessoais = () => {
    return (
        <section>
            <div className=" w-10/12 mx-auto mb-20 ">
                <div className="my-10 text-xl font-b">
                    <Link href="/admin">Conta</Link>
                    {"  > Informações pessoais"}
                </div>



                <div className="flex flex-1 justify-center">
                    <div className="w-full bg-terciary-300 p-10 border border-terciary-700 rounded-2xl px-10">

                        <div className="flex flex-row my-4 gap-7">

                            <div className="w-2/6 "><Menu /></div>


                            <div className="flex flex-col px-6  w-full">
                                <div className="text-3xl font-bold mb-10">Renda</div>

                                <div className="flex flex-row">
                                    <div className="flex-1">
                                        <div className="text-xl mb-1">Valor Mensal Outubro</div>
                                        <div className="font-bold text-2xl">400€/<span className="text-base ">mês</span></div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="text-xl mb-1">Despesas mês de outubro</div>
                                        <div className="font-bold text-2xl">32,40€</div>
                                    </div>



                                    <div className="flex flex-col">
                                        <div className="flex flex-row items-center">

                                            <div><IoWarningOutline className=" text-red-700" /></div>
                                            <div className="text-xl mb-1">O pagamento está em atraso</div>

                                        </div>
                                        <div className="mt-1">
                                            <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-12 py-2.5 mr-2 mb-2">Pagar renda</button>
                                        </div>

                                    </div>

                                </div>

                                <div className="mt-6  text-2xl">Histórico de pagamentos</div>



                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-normal text-xl text-gray-900 dark:text-white whitespace-nowrap">
                                                    07/09/2021
                                                </th>
                                                <td className="px-6 py-4 font-normal text-xl">
                                                    Renda + Despesas Setembro
                                                </td>
                                                <td className="px-6 py-4 font-normal text-xl">
                                                    425,30€
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <a href="#" className="font-bold text-2xl text-green-400"><BsCheckCircle /></a>
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-normal text-xl text-gray-900 dark:text-white whitespace-nowrap">
                                                    07/09/2021
                                                </th>
                                                <td className="px-6 py-4 font-normal text-xl">
                                                    Renda + Despesas Setembro
                                                </td>
                                                <td className="px-6 py-4 font-normal text-xl">
                                                    425,30€
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <a href="#" className="font-bold text-2xl text-green-400"><BsCheckCircle /></a>
                                                </td>
                                            </tr>
                                            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-normal text-xl text-gray-900 dark:text-white whitespace-nowrap">
                                                    07/09/2021
                                                </th>
                                                <td className="px-6 py-4 font-normal text-xl">
                                                    Renda + Despesas Setembro
                                                </td>
                                                <td className="px-6 py-4 font-normal text-xl">
                                                    425,30€
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <a href="#" className="font-bold text-2xl text-green-400"><BsCheckCircle /></a>
                                                </td>
                                            </tr>

                                            <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-normal text-xl text-gray-900 dark:text-white whitespace-nowrap">
                                                    07/09/2021
                                                </th>
                                                <td className="px-6 py-4 font-normal text-xl">
                                                    Renda + Despesas Setembro
                                                </td>
                                                <td className="px-6 py-4 font-normal text-xl">
                                                    425,30€
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <a href="#" className="font-bold text-2xl text-green-400"><BsCheckCircle /></a>
                                                </td>
                                            </tr>

                                            <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-normal text-xl text-gray-900 dark:text-white whitespace-nowrap">
                                                    07/09/2021
                                                </th>
                                                <td className="px-6 py-4 font-normal text-xl">
                                                    Renda + Despesas Setembro
                                                </td>
                                                <td className="px-6 py-4 font-normal text-xl">
                                                    425,30€
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <a href="#" className="font-bold text-2xl text-green-400"><BsCheckCircle /></a>
                                                </td>
                                            </tr>


                                        </tbody>
                                    </table>
                                </div>

                                <div className="text-center mt-8 text-secondary-400">Não tem mais pagamentos para mostrar</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoPessoais;