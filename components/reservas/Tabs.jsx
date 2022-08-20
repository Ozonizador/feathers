import React from 'react'
import { Table } from 'flowbite-react'





const Tabs = () => {
    return (
        <section className="container mx-auto  pt-20 pb-5">

            <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
                role="tablist">
                <li className="nav-item" role="presentation">
                    <a href="#tabs-home" className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
      active
    " id="tabs-home-tab" data-bs-toggle="pill" data-bs-target="#tabs-atuais" role="tab" aria-controls="tabs-home"
                        aria-selected="true">Atuais</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a href="#tabs-profile" className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    " id="tabs-profile-tab" data-bs-toggle="pill" data-bs-target="#tabs-proximas" role="tab"
                        aria-controls="tabs-profile" aria-selected="false" >Próximas</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a href="#tabs-messages" className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    " id="tabs-messages-tab" data-bs-toggle="pill" data-bs-target="#tabs-todas" role="tab"
                        aria-controls="tabs-messages" aria-selected="false">Todas</a>
                </li>

            </ul>
            <div className="tab-content" id="tabs-tabContent">
                <div className="tab-pane fade show active" id="tabs-home" role="tabpanel" aria-labelledby="tabs-home-tab">
                    <Table className='w-full'>
                        <Table.Head >
                            <Table.HeadCell className="text-xl font-normal text-gray-900 mb-10">
                                <div className='my-5'> Estado</div>
                            </Table.HeadCell>
                            <Table.HeadCell className="text-xl font-normal text-gray-900">
                                Hóspedes
                            </Table.HeadCell>
                            <Table.HeadCell className="text-xl font-normal text-gray-900">
                                Entrada
                            </Table.HeadCell>
                            <Table.HeadCell className="text-xl font-normal text-gray-900">
                                Saída
                            </Table.HeadCell>
                            <Table.HeadCell className="text-xl font-normal text-gray-900">
                                Anúncio
                            </Table.HeadCell>
                            <Table.HeadCell>

                            </Table.HeadCell>

                            <Table.HeadCell>

                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white ">
                                <Table.Cell className="text-xl text-gray-700 dark:text-white">
                                    Atualmente a hospedar
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-xl text-gray-700 dark:text-white">
                                    Podo Santos
                                </Table.Cell>
                                <Table.Cell className="text-xl text-gray-700 dark:text-white">
                                    20 de Junho de 2022
                                </Table.Cell>
                                <Table.Cell className=" text-xl text-gray-700 dark:text-white">
                                    23 de Junho de 2022
                                </Table.Cell>
                                <Table.Cell className=" text-xl text-gray-700 dark:text-white">
                                    Quarto privado em Aveiro
                                </Table.Cell>
                                <Table.Cell>
                                    <a href="/teste" className="px-6 py-2  border border-gray-600 rounded-lg">Detalhes</a>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white">
                                <Table.Cell className="text-xl text-gray-900 dark:text-white0">
                                    Atualmente a hospedar
                                </Table.Cell>
                                <Table.Cell className="text-xl text-gray-900 dark:text-white">
                                    Podo Santos
                                </Table.Cell>
                                <Table.Cell className="text-xl text-gray-900 dark:text-white">
                                    20 de Junho de 2022
                                </Table.Cell>
                                <Table.Cell className=" text-xl text-gray-900 dark:text-white">
                                    23 de Junho de 2022
                                </Table.Cell>
                                <Table.Cell className=" text-xl text-gray-900 dark:text-white">
                                    Quarto privado em Aveiro
                                </Table.Cell>
                                <Table.Cell>
                                    <a href="/teste" className="px-6 py-2  border border-gray-600 rounded-lg">Detalhes</a>
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row className="bg-white ">
                                <Table.Cell className="text-xl text-gray-900 dark:text-white">
                                    Atualmente a hospedar
                                </Table.Cell>
                                <Table.Cell className="text-xl text-gray-900 dark:text-white">
                                    Podo Santos
                                </Table.Cell>
                                <Table.Cell className="text-xl text-gray-900 dark:text-white">
                                    20 de Junho de 2022
                                </Table.Cell>
                                <Table.Cell className=" text-xl text-gray-900 dark:text-white">
                                    23 de Junho de 2022
                                </Table.Cell>
                                <Table.Cell className=" text-xl text-gray-900 dark:text-white">
                                    Quarto privado em Aveiro
                                </Table.Cell>
                                <Table.Cell>
                                    <a href="/teste" className="px-6 py-2  border border-gray-600 rounded-lg">Detalhes</a>
                                </Table.Cell>
                            </Table.Row>




                        </Table.Body>



                    </Table>
                </div>
                <div className="tab-pane fade" id="tabs-profile" role="tabpanel" aria-labelledby="tabs-profile-tab">
                    Tab 2 content
                </div>
                <div className="tab-pane fade" id="tabs-messages" role="tabpanel" aria-labelledby="tabs-profile-tab">
                    Tab 3 content
                </div>
                <div className="tab-pane fade" id="tabs-contact" role="tabpanel" aria-labelledby="tabs-contact-tab">
                    Tab 4 content
                </div>
            </div>









        </section>
    )
}

export default Tabs