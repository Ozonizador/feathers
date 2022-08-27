import React from "react";
import { Table } from "flowbite-react";
import { Tab } from "@headlessui/react";

const Reservas = () => {
  return (
    <section className="container mx-auto pt-20 pb-5">
      <Tab.Group>
        <Tab.List className="flex gap-5">
          <Tab>Ativas</Tab>
          <Tab>Próximas</Tab>
          <Tab>Todas</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <Table className="w-full">
              <Table.Head>
                <Table.HeadCell className="mb-10 text-xl font-normal text-gray-900">
                  <div className="my-5"> Estado</div>
                </Table.HeadCell>
                <Table.HeadCell className="text-xl font-normal text-gray-900">Hóspedes</Table.HeadCell>
                <Table.HeadCell className="text-xl font-normal text-gray-900">Entrada</Table.HeadCell>
                <Table.HeadCell className="text-xl font-normal text-gray-900">Saída</Table.HeadCell>
                <Table.HeadCell className="text-xl font-normal text-gray-900">Anúncio</Table.HeadCell>

                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white ">
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">Atualmente a hospedar</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-xl text-gray-700 dark:text-white">
                    Podo Santos
                  </Table.Cell>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">20 de Junho de 2022</Table.Cell>
                  <Table.Cell className=" text-xl text-gray-700 dark:text-white">23 de Junho de 2022</Table.Cell>
                  <Table.Cell className=" text-xl text-gray-700 dark:text-white">Quarto privado em Aveiro</Table.Cell>
                  <Table.Cell>
                    <a href="/teste" className="rounded-lg border  border-gray-600 px-6 py-2">
                      Detalhes
                    </a>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="dark:text-white0 text-xl text-gray-900">Atualmente a hospedar</Table.Cell>
                  <Table.Cell className="text-xl text-gray-900 dark:text-white">Podo Santos</Table.Cell>
                  <Table.Cell className="text-xl text-gray-900 dark:text-white">20 de Junho de 2022</Table.Cell>
                  <Table.Cell className=" text-xl text-gray-900 dark:text-white">23 de Junho de 2022</Table.Cell>
                  <Table.Cell className=" text-xl text-gray-900 dark:text-white">Quarto privado em Aveiro</Table.Cell>
                  <Table.Cell>
                    <a href="/teste" className="rounded-lg border  border-gray-600 px-6 py-2">
                      Detalhes
                    </a>
                  </Table.Cell>
                </Table.Row>

                <Table.Row className="bg-white ">
                  <Table.Cell className="text-xl text-gray-900 dark:text-white">Atualmente a hospedar</Table.Cell>
                  <Table.Cell className="text-xl text-gray-900 dark:text-white">Podo Santos</Table.Cell>
                  <Table.Cell className="text-xl text-gray-900 dark:text-white">20 de Junho de 2022</Table.Cell>
                  <Table.Cell className=" text-xl text-gray-900 dark:text-white">23 de Junho de 2022</Table.Cell>
                  <Table.Cell className=" text-xl text-gray-900 dark:text-white">Quarto privado em Aveiro</Table.Cell>
                  <Table.Cell>
                    <a href="/teste" className="rounded-lg border  border-gray-600 px-6 py-2">
                      Detalhes
                    </a>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {/* <ul
        className="nav nav-tabs mb-4 flex list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row"
        id="tabs-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <a
            href="#tabs-home"
            className="
      nav-link
      active
      my-2
      block
      border-x-0
      border-t-0
      border-b-2 border-transparent px-6 py-3
      text-xs
      font-medium
      uppercase
      leading-tight hover:border-transparent
      hover:bg-gray-100
      focus:border-transparent
    "
            id="tabs-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-atuais"
            role="tab"
            aria-controls="tabs-home"
            aria-selected="true"
          >
            Atuais
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            href="#tabs-profile"
            className="
      nav-link
      my-2
      block
      border-x-0
      border-t-0
      border-b-2
      border-transparent px-6 py-3 text-xs
      font-medium
      uppercase
      leading-tight
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
            id="tabs-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-proximas"
            role="tab"
            aria-controls="tabs-profile"
            aria-selected="false"
          >
            Próximas
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            href="#tabs-messages"
            className="
      nav-link
      my-2
      block
      border-x-0
      border-t-0
      border-b-2
      border-transparent px-6 py-3 text-xs
      font-medium
      uppercase
      leading-tight
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
            id="tabs-messages-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-todas"
            role="tab"
            aria-controls="tabs-messages"
            aria-selected="false"
          >
            Todas
          </a>
        </li>
      </ul> */}
    </section>
  );
};

export default Reservas;
