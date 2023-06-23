import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Reservation } from "../../models/reservation";

type CalendarComponentProps = {
  reservations: Reservation[];
};

export const CalendarComponent = ({ reservations }: CalendarComponentProps) => {
  const events = reservations
    .filter((reservation) =>
      ["ACCEPTED", "CHANGE_ACCEPTED", "CHANGE_REQUESTED", "REQUESTED"].includes(reservation.status)
    )
    .map((reservation) => ({ start: reservation.start_date, end: reservation.end_date }));
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />;
};
