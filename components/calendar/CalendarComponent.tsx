import { format, subHours, startOfMonth } from "date-fns";
import { useState } from "react";
import { pt } from "date-fns/locale";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

type EventType = {
  title: string;
  date: Date;
};

export const CalendarComponent = () => {
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
};
