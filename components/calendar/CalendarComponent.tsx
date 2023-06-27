import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Reservation, ReservationStatus, ReservationWithTenant } from "../../models/reservation";

type CalendarComponentProps = {
  reservations: ReservationWithTenant[];
};

const statusToColor = {
  ACCEPTED: "green",
  CHANGE_ACCEPTED: "green",
  CHANGE_REQUESTED: "yellow",
  REQUESTED: "yellow",
} as StatusToColor;

type StatusToColor = {
  [x in ReservationStatus]: string;
};

export const CalendarComponent = ({ reservations }: CalendarComponentProps) => {
  const events = reservations
    .filter((reservation) =>
      ["ACCEPTED", "CHANGE_ACCEPTED", "CHANGE_REQUESTED", "REQUESTED"].includes(reservation.status)
    )
    .map((reservation) => ({
      start: reservation.start_date,
      end: reservation.end_date,
      color: statusToColor[reservation.status],
      title: reservation.tenant.name || undefined,
    }));
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />;
};
