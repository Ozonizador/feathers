import React, { useState } from "react";
import { Table } from "flowbite-react";
import { Tab } from "@headlessui/react";
import { Reservation } from "@prisma/client";

const ReservasSection = () => {
  return (
    <section className="mx-28 pt-20 pb-5">
      <Tab.Group>
        <Tab.List className="mb-10 flex gap-5">
          <Tab
            className="nav-link
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
            focus:border-transparent"
          >
            Ativas
          </Tab>
          <Tab
            className="nav-link
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
            focus:border-transparent"
          >
            Próximas
          </Tab>
          <Tab
            className="nav-link
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
            focus:border-transparent"
          >
            Todas
          </Tab>
        </Tab.List>
        <Tab.Panels className="w-full">
          <Tab.Panel>
            <CurrentReservationsSection />
          </Tab.Panel>
          <Tab.Panel>
            <NextReservationsSection />
          </Tab.Panel>
          <Tab.Panel>
            <AllReservationsSection />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};

const CurrentReservationsSection = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  return (
    <>
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
            <Table.Cell className="whitespace-nowrap text-xl text-gray-700 dark:text-white">Podo Santos</Table.Cell>
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
    </>
  );
};

const NextReservationsSection = () => {
  return <></>;
};

const AllReservationsSection = () => {
  return <></>;
};

export default Reservas;
