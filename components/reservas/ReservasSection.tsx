import React, { useCallback, useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Tab } from "@headlessui/react";
import { useUser } from "@supabase/auth-helpers-react";
import useStayService from "../../hooks/stayService";
import { TYPE_ADVERTISEMENT } from "../../models/advertisement";
import { ReservationWithAdvertisement } from "../../models/reservation";
import { StayGuest } from "../../models/stay";

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
  const user = useUser();
  const { getCurrentStaysByHostId } = useStayService();
  const [reservations, setReservations] = useState<StayGuest[]>([]);

  const getCurrentStays = useCallback(async () => {
    if (user) {
      const { data, error } = await getCurrentStaysByHostId(user.id);
      if (!error) {
        setReservations(data as StayGuest[]);
      }
    }
  }, [user]);

  useEffect(() => {
    getCurrentStays();
  }, [getCurrentStays]);

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
          {!reservations ||
            (reservations.length == 0 && (
              <Table.Row>
                <Table.Cell className="flex justify-center py-2">Sem reservas de momento</Table.Cell>
              </Table.Row>
            ))}
          {reservations &&
            reservations.map((reservation, index) => {
              return (
                <Table.Row className="bg-white" key={index}>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">Atualmente a hospedar</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-xl text-gray-700 dark:text-white">
                    {reservation.tenant.name}
                  </Table.Cell>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">{reservation.start_date}</Table.Cell>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">{reservation.end_date}</Table.Cell>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">{`${
                    TYPE_ADVERTISEMENT[reservation.advertisement.type]
                  } em ${reservation.advertisement.place}`}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

const NextReservationsSection = () => {
  const user = useUser();
  const { getNextStaysByHostId } = useStayService();
  const [reservations, setReservations] = useState<ReservationWithAdvertisement[]>([]);

  const getNextReservations = useCallback(async () => {
    if (user) {
      const { data, error } = await getNextStaysByHostId(user.id);
      if (!error) {
        setReservations(data);
      }
    }
  }, [user]);

  useEffect(() => {
    getNextReservations();
  }, [getNextReservations]);

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
          {!reservations ||
            (reservations.length == 0 && (
              <Table.Cell className="flex justify-center py-2">Sem próximas reservas</Table.Cell>
            ))}
          {reservations &&
            reservations.map((reservation, index) => {
              return (
                <Table.Row className="bg-white" key={index}>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">{"Próximas"}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-xl text-gray-700 dark:text-white">
                    {reservation.tenant.name}
                  </Table.Cell>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">{reservation.start_date}</Table.Cell>
                  <Table.Cell className=" text-xl text-gray-700 dark:text-white">{reservation.end_date}</Table.Cell>
                  <Table.Cell className=" text-xl text-gray-700 dark:text-white">{`${
                    TYPE_ADVERTISEMENT[reservation.advertisement.type]
                  } em ${reservation.advertisement.place}`}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

const AllReservationsSection = () => {
  const user = useUser();
  const { getAllStaysByHostId } = useStayService();
  const [reservations, setReservations] = useState<ReservationWithAdvertisement[]>([]);

  const getNextReservations = useCallback(async () => {
    if (user) {
      const { data, error } = await getAllStaysByHostId(user.id);
      if (!error) {
        setReservations(data);
      }
    }
  }, [user]);

  useEffect(() => {
    getNextReservations();
  }, [getNextReservations]);

  const checkIntervalForDate = (reservation: ReservationWithAdvertisement) => {
    const currentDate = new Date();

    if (new Date(reservation.start_date) < currentDate && new Date(reservation.end_date) >= currentDate)
      return "A decorrer estadia";
    if (new Date(reservation.start_date) < currentDate && new Date(reservation.end_date) < currentDate)
      return "Finalizado";
    if (new Date(reservation.start_date) > currentDate && new Date(reservation.end_date) > currentDate)
      return "Próxima";

    return "";
  };

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
          {!reservations ||
            (reservations.length == 0 && <Table.Cell className="flex justify-center py-2">Sem reservas</Table.Cell>)}
          {reservations &&
            reservations.map((reservation, index) => {
              return (
                <Table.Row className="bg-white" key={index}>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">
                    {checkIntervalForDate(reservation)}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-xl text-gray-700 dark:text-white">
                    {reservation.tenant.name}
                  </Table.Cell>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">{reservation.start_date}</Table.Cell>
                  <Table.Cell className=" text-xl text-gray-700 dark:text-white">{reservation.end_date}</Table.Cell>
                  <Table.Cell className=" text-xl text-gray-700 dark:text-white">{`${
                    TYPE_ADVERTISEMENT[reservation.advertisement.type]
                  } em ${reservation.advertisement.place}`}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

export default ReservasSection;
