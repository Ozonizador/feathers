import React, { useCallback, useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Tab } from "@headlessui/react";
import { useUser } from "@supabase/auth-helpers-react";
import useStayService from "../../hooks/stayService";
import { TYPE_ADVERTISEMENT } from "../../models/advertisement";
import { StayGuest } from "../../models/stay";
import Spinner from "../utils/Spinner";

const ReservasSection = () => {
  return (
    <section className="mx-28 pt-20 pb-5">
      <Tab.Group>
        <Tab.List className="mb-10 flex gap-5">
          <Tab className="reservas-tab">Ativas</Tab>
          <Tab className="reservas-tab">Próximas</Tab>
          <Tab className="reservas-tab">Todas</Tab>
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
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUser();
  const { getCurrentStaysByHostId } = useStayService();
  const [stays, setStays] = useState<StayGuest[]>([]);

  const getCurrentStays = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await getCurrentStaysByHostId(user.id);
    if (!error) {
      setStays(data as StayGuest[]);
    }
    setLoading(false);
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
          {loading && (
            <Table.Row className="flex justify-center">
              <Table.Cell>
                <Spinner />
              </Table.Cell>
            </Table.Row>
          )}
          {!loading && (!stays || stays.length == 0) && (
            <Table.Row>
              <Table.Cell className="flex justify-center py-2">Sem reservas de momento</Table.Cell>
            </Table.Row>
          )}
          {!loading &&
            stays &&
            stays.map((stay, index) => {
              return (
                <Table.Row className="bg-white" key={index}>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">Atualmente a hospedar</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-xl text-gray-700 dark:text-white">
                    {stay.tenant.name}
                  </Table.Cell>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">
                    {stay.reservation?.start_date || ""}
                  </Table.Cell>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">
                    {stay.reservation?.end_date || ""}
                  </Table.Cell>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">{`${
                    TYPE_ADVERTISEMENT[stay.advertisement.type]
                  } em ${stay.advertisement.place}`}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

const NextReservationsSection = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUser();
  const { getNextStaysByHostId } = useStayService();
  const [reservations, setReservations] = useState<StayGuest[]>([]);

  const getNextReservations = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await getNextStaysByHostId(user.id);
    if (!error) {
      setReservations(data as StayGuest[]);
    }
    setLoading(false);
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
          {loading && (
            <Table.Row className="flex justify-center">
              <Table.Cell>
                <Spinner />
              </Table.Cell>
            </Table.Row>
          )}
          {!loading && (!reservations || reservations.length == 0) && (
            <Table.Cell className="flex justify-center py-2">Sem próximas reservas</Table.Cell>
          )}
          {!loading &&
            reservations &&
            reservations.map((stay, index) => {
              return (
                <Table.Row className="bg-white" key={index}>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">{"Próximas"}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-xl text-gray-700 dark:text-white">
                    {stay.tenant.name}
                  </Table.Cell>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">
                    {stay.reservation?.start_date || ""}
                  </Table.Cell>
                  <Table.Cell className=" text-xl text-gray-700 dark:text-white">
                    {stay.reservation?.end_date || ""}
                  </Table.Cell>
                  <Table.Cell className=" text-xl text-gray-700 dark:text-white">{`${
                    TYPE_ADVERTISEMENT[stay.advertisement.type]
                  } em ${stay.advertisement.place}`}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

const AllReservationsSection = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUser();
  const { getAllStaysByHostId } = useStayService();
  const [reservations, setReservations] = useState<StayGuest[]>([]);

  const getNextReservations = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await getAllStaysByHostId(user.id);
    if (!error) {
      setReservations(data as StayGuest[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    getNextReservations();
  }, [getNextReservations]);

  const checkIntervalForDate = (stay: StayGuest) => {
    const currentDate = new Date();

    if (new Date(stay.reservation?.start_date) < currentDate && new Date(stay.reservation?.end_date) >= currentDate)
      return "A decorrer estadia";
    if (new Date(stay.reservation?.start_date) < currentDate && new Date(stay.reservation?.end_date) < currentDate)
      return "Finalizado";
    if (new Date(stay.reservation?.start_date) > currentDate && new Date(stay.reservation?.end_date) > currentDate)
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
          {loading && (
            <Table.Row className="flex justify-center">
              <Table.Cell>
                <Spinner />
              </Table.Cell>
            </Table.Row>
          )}
          {!loading && (!reservations || reservations.length == 0) && (
            <Table.Cell className="flex justify-center py-2">Sem reservas</Table.Cell>
          )}
          {!loading &&
            reservations &&
            reservations.map((stay, index) => {
              return (
                <Table.Row className="bg-white" key={index}>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">
                    {checkIntervalForDate(stay)}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-xl text-gray-700 dark:text-white">
                    {stay.tenant.name}
                  </Table.Cell>
                  <Table.Cell className="text-xl text-gray-700 dark:text-white">
                    {stay.reservation?.start_date || ""}
                  </Table.Cell>
                  <Table.Cell className=" text-xl text-gray-700 dark:text-white">
                    {stay.reservation?.end_date || ""}
                  </Table.Cell>
                  <Table.Cell className=" text-xl text-gray-700 dark:text-white">{`${
                    TYPE_ADVERTISEMENT[stay.advertisement.type]
                  } em ${stay.advertisement.place}`}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

export default ReservasSection;
