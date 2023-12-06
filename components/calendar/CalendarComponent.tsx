import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import enLocale from "@fullcalendar/core/locales/en-gb";
import ptLocale from "@fullcalendar/core/locales/pt";
import i18next from "i18next";
import { Reservation, ReservationStatus, ReservationWithTenant } from "../../models/reservation";
import { useTranslation } from "react-i18next";

type CalendarComponentProps = {
  reservations: ReservationWithTenant[];
  showRequested: boolean;
  language: string;
};

const statusToColor = {
  ACCEPTED: "green",
  CHANGE_ACCEPTED: "green",
  CHANGE_REQUESTED: "yellow",
  REQUESTED: "gray",
} as StatusToColor;

type StatusToColor = {
  [x in ReservationStatus]: string;
};

export const CalendarComponent = ({ reservations, showRequested, language }: CalendarComponentProps) => {
  const filters = ["ACCEPTED", "CHANGE_ACCEPTED", "CHANGE_REQUESTED"]
  if (showRequested) filters.push("REQUESTED");

  const events = reservations
    .filter((reservation) =>
      filters.includes(reservation.status)
    )
    .map((reservation) => ({
      start: reservation.start_date,
      end: reservation.end_date,
      color: statusToColor[reservation.status],
      title: reservation.tenant.name || undefined,
    }));
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} locale={language == 'en' ? enLocale : ptLocale}/>;
};
