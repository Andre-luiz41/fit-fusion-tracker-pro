
import { addDays } from "date-fns";
import { AppointmentSlot } from "@/types/schedule.types";

// Initial appointment data
export const initialAppointments: AppointmentSlot[] = [
  // Demo data for available slots
  { date: new Date(), time: "09:00", status: "available" },
  { date: new Date(), time: "10:00", status: "available" },
  { date: new Date(), time: "11:00", status: "booked", clientName: "Jane Smith" },
  { date: new Date(), time: "12:00", status: "unavailable" },
  { date: new Date(), time: "13:00", status: "available" },
  { date: addDays(new Date(), 1), time: "09:00", status: "available" },
  { date: addDays(new Date(), 1), time: "10:00", status: "available" },
  { date: addDays(new Date(), 1), time: "11:00", status: "available" },
  { date: addDays(new Date(), 2), time: "10:00", status: "booked", clientName: "Bob Johnson" },
  { date: addDays(new Date(), 3), time: "14:00", status: "booked", clientName: "Alice Brown" },
];
