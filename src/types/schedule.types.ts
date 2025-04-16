
// Define types for appointment statuses
export type AppointmentStatus = "available" | "booked" | "unavailable";

export interface AppointmentSlot {
  date: Date;
  time: string;
  status: AppointmentStatus;
  clientName?: string;
}
