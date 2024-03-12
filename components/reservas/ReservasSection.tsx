import React, { useCallback, useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Tab } from "@headlessui/react";
import { useUser } from "@supabase/auth-helpers-react";
import useStayService from "../../hooks/stayService";
import { TYPE_ADVERTISEMENT } from "../../models/advertisement";
import Spinner from "../utils/Spinner";
import { ReservationGuest } from "../../models/reservation";
import { UnideskStructure } from "../unidesk/UnideskStructure";
import Breadcrumbs, { BreadcrumbPath } from "../utils/Breadcrumbs";
import { UNIDESK_URL } from "../../models/paths";
import IconAnuncios from "../../public/images/icon-pg37-1.svg";
import MenuSenhorio from "../unidesk/Menus/MenuSenhorio";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell";
import Button from "../utils/Button";
import { useRouter } from "next/router";

const DynamicTabPanels = dynamic(() => import("@headlessui/react").then((headlessui) => headlessui.Tab.Panels), {
  ssr: false,
});

const paths = [
  { url: UNIDESK_URL, label: "uni-desk" },
  { url: "", label: "reservation_other" },
] as BreadcrumbPath[];

const ReservasSection = () => {
  const { t } = useTranslation();
  return (
    <section className="">
      <Breadcrumbs icon={IconAnuncios} paths={paths} />
      <UnideskStructure>
        <UnideskStructure.Menu>
          <MenuSenhorio activeSection={"adverts"} activeUrl={"reservations"} />
        </UnideskStructure.Menu>
        <UnideskStructure.Content>
          <Tab.Group>
            <Tab.List className="mb-5 flex gap-5 border-b border-primary-200">
              <Tab className="reservas-tab ui-selected:text-primary-500 ui-not-selected:text-black">{t("active")}</Tab>
              <Tab className="reservas-tab ui-selected:text-primary-500 ui-not-selected:text-black">{t("next")}</Tab>
              <Tab className="reservas-tab ui-selected:text-primary-500 ui-not-selected:text-black">{t("all")}</Tab>
            </Tab.List>
            <Tab.Panels as={DynamicTabPanels} className="w-full overflow-x-auto" suppressHydrationWarning>
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
        </UnideskStructure.Content>
      </UnideskStructure>
    </section>
  );
};

const CurrentReservationsSection = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUser();
  const router = useRouter();
  const { getCurrentStaysByHostId } = useStayService();
  const [reservations, setReservations] = useState<ReservationGuest[]>([]);

  const getCurrentStays = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await getCurrentStaysByHostId(user.id);
    if (!error) {
      setReservations(data as unknown as ReservationGuest[]);
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
          <Table.HeadCell className="text-md mb-5 font-normal text-gray-900">
            <div className="my-5">{t("state")}</div>
          </Table.HeadCell>
          <Table.HeadCell className="text-md font-normal text-gray-900">{t("guest", { count: 2 })}</Table.HeadCell>
          <Table.HeadCell className="text-md font-normal text-gray-900">{t("start")}</Table.HeadCell>
          <Table.HeadCell className="text-md font-normal text-gray-900">{t("end")}</Table.HeadCell>
          <Table.HeadCell className="text-md font-normal text-gray-900">
            {t("advertisement", { count: 1 })}
          </Table.HeadCell>
          <Table.HeadCell className="text-md font-normal text-gray-900">{t("details")}</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {loading && (
            <Table.Row className="flex justify-center">
              <Table.Cell>
                <Spinner />
              </Table.Cell>
            </Table.Row>
          )}
          {!loading && (!reservations || reservations.length == 0) && <Table.Row>Sem reservas de momento</Table.Row>}
          {!loading &&
            reservations &&
            reservations.map((reservation, index) => {
              return (
                <Table.Row className="bg-white" key={index}>
                  <Table.Cell className="text-md text-gray-700 dark:text-white">
                    {t("admin:guests.currently_hosting")}
                  </Table.Cell>
                  <Table.Cell className="text-md whitespace-nowrap capitalize text-gray-700 dark:text-white">
                    {reservation.tenant?.name}
                  </Table.Cell>
                  <Table.Cell className="text-md text-gray-700 dark:text-white">
                    {reservation?.start_date || ""}
                  </Table.Cell>
                  <Table.Cell className="text-md text-gray-700 dark:text-white">
                    {reservation?.end_date || ""}
                  </Table.Cell>
                  <Table.Cell className="text-md text-gray-700 dark:text-white">{`${t(
                    TYPE_ADVERTISEMENT[reservation.advertisement.type]
                  )} ${t("in")} ${reservation.advertisement.place}`}</Table.Cell>
                  <Table.Cell>
                    <Button
                      type="button"
                      onClick={() => router.push(`/unidesk/inbox?id=${reservation.id}`)}
                      className="bg-none"
                    >
                      {t("details")}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

const NextReservationsSection = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUser();
  const router = useRouter();
  const { getNextStaysByHostId } = useStayService();
  const [reservations, setReservations] = useState<ReservationGuest[]>([]);

  const getNextReservations = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await getNextStaysByHostId(user.id);
    if (!error) {
      setReservations(data as unknown as ReservationGuest[]);
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
          <Table.HeadCell className="text-md table_head mb-10 font-normal text-gray-900">
            <div className="my-5">{t("state")}</div>
          </Table.HeadCell>
          <Table.HeadCell className=" table_head text-[14px] font-normal text-gray-900 lg:text-base">
            {t("guest", { count: 2 })}
          </Table.HeadCell>
          <Table.HeadCell className=" table_head text-xs font-normal text-gray-900 lg:text-base">
            {t("start")}
          </Table.HeadCell>
          <Table.HeadCell className=" table_head text-xs font-normal text-gray-900 lg:text-base">
            {t("end")}
          </Table.HeadCell>
          <Table.HeadCell className=" table_head text-xs font-normal text-gray-900 lg:text-base">
            {t("advertisement", { count: 1 })}
          </Table.HeadCell>
          <Table.HeadCell className="table_head text-xs font-normal text-gray-900 lg:text-base">
            {t("details")}
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y bg-white">
          {loading && (
            <Table.Row className="flex justify-center">
              <Table.Cell>
                <Spinner />
              </Table.Cell>
            </Table.Row>
          )}
          {!loading && (!reservations || reservations.length == 0) && <Table.Row>Sem próximas reservas</Table.Row>}
          {!loading &&
            reservations &&
            reservations.map((reservation, index) => {
              return (
                <Table.Row className="bg-white" key={index}>
                  <Table.Cell className="text-lg text-gray-700 dark:text-white">{t("confirmed")}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-lg capitalize text-gray-700 dark:text-white">
                    {reservation.tenant?.name}
                  </Table.Cell>
                  <Table.Cell className="text-lg text-gray-700 dark:text-white">
                    {reservation?.start_date || ""}
                  </Table.Cell>
                  <Table.Cell className=" text-lg text-gray-700 dark:text-white">
                    {reservation?.end_date || ""}
                  </Table.Cell>
                  <Table.Cell className=" text-lg text-gray-700 dark:text-white">{`${
                    t(TYPE_ADVERTISEMENT[reservation.advertisement?.type]) || ""
                  } ${t("in")} ${reservation.advertisement?.place || ""}`}</Table.Cell>
                  <Table.Cell>
                    <Button
                      type="button"
                      onClick={() => router.push(`/unidesk/inbox?id=${reservation.id}`)}
                      className="bg-none"
                    >
                      {t("details")}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

const AllReservationsSection = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUser();
  const router = useRouter();
  const { getAllStaysByHostId } = useStayService();
  const [reservations, setReservations] = useState<ReservationGuest[]>([]);

  const getNextReservations = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await getAllStaysByHostId(user.id);
    if (!error) {
      setReservations(data as unknown as ReservationGuest[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    getNextReservations();
  }, [getNextReservations]);

  const checkIntervalForDate = (reservation: ReservationGuest) => {
    const currentDate = new Date();

    if (new Date(reservation?.start_date) < currentDate && new Date(reservation?.end_date) >= currentDate)
      return t("ongoing_stay");
    if (new Date(reservation?.start_date) < currentDate && new Date(reservation?.end_date) < currentDate)
      return t("finished");
    if (new Date(reservation?.start_date) > currentDate && new Date(reservation?.end_date) > currentDate)
      return t("confirmed");

    return "";
  };

  return (
    <>
      <Table className="w-full">
        <Table.Head>
          <Table.HeadCell className="text-md table_head mb-5 font-normal text-gray-900">
            <div className="my-5">{t("state")}</div>
          </Table.HeadCell>
          <Table.HeadCell className="table_head text-[14px] font-normal text-gray-900 md:text-base">
            {t("guest", { count: 2 })}
          </Table.HeadCell>
          <Table.HeadCell className="table_head text-sm font-normal text-gray-900 md:text-base">
            {t("start")}
          </Table.HeadCell>
          <Table.HeadCell className="table_head text-sm font-normal text-gray-900 md:text-base">
            {t("end")}
          </Table.HeadCell>
          <Table.HeadCell className="table_head text-sm font-normal text-gray-900 md:text-base">
            {t("advertisement", { count: 1 })}
          </Table.HeadCell>
          <Table.HeadCell className="table_head text-sm font-normal text-gray-900 md:text-base">
            {t("details")}
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {loading && (
            <Table.Row className="flex justify-center">
              <Table.Cell>
                <Spinner />
              </Table.Cell>
            </Table.Row>
          )}
          {!loading && (!reservations || reservations.length == 0) && <Table.Row>Sem reservas</Table.Row>}
          {!loading &&
            reservations &&
            reservations.map((reservation, index) => {
              return (
                <Table.Row className="bg-white" key={index}>
                  <Table.Cell className="text-lg text-gray-700 dark:text-white">
                    {checkIntervalForDate(reservation)}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-lg capitalize text-gray-700 dark:text-white">
                    {reservation.tenant?.name}
                  </Table.Cell>
                  <Table.Cell className="text-lg text-gray-700 dark:text-white">
                    {reservation?.start_date || ""}
                  </Table.Cell>
                  <Table.Cell className=" text-lg text-gray-700 dark:text-white">
                    {reservation?.end_date || ""}
                  </Table.Cell>
                  <Table.Cell className=" text-lg text-gray-700 dark:text-white">{`${
                    reservation.advertisement ? t(TYPE_ADVERTISEMENT[reservation.advertisement.type]) : ""
                  } ${t("in")} ${reservation.advertisement?.place || ""}`}</Table.Cell>
                  <Table.Cell>
                    <Button
                      type="button"
                      onClick={() => router.push(`/unidesk/inbox?id=${reservation.id}`)}
                      className="bg-none"
                    >
                      {t("details")}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

export default ReservasSection;
