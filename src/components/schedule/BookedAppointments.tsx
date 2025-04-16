
import React from "react";
import { AppointmentSlot } from "@/types/schedule.types";
import { format, isSameDay } from "date-fns";

interface BookedAppointmentsProps {
  appointments: AppointmentSlot[];
  selectedDate: Date | undefined;
}

export const BookedAppointments: React.FC<BookedAppointmentsProps> = ({ 
  appointments, 
  selectedDate 
}) => {
  // Filter booked appointments for the selected date
  const bookedAppointmentsForDate = appointments
    .filter(slot => selectedDate && isSameDay(slot.date, selectedDate) && slot.status === "booked");

  if (bookedAppointmentsForDate.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium mb-2">Sessões Agendadas:</h3>
      <ul className="space-y-2">
        {bookedAppointmentsForDate.map((appointment, index) => (
          <li 
            key={index} 
            className="p-2 bg-red-50 text-red-800 rounded-md flex justify-between"
          >
            <span>{appointment.time}</span>
            <span>{appointment.clientName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
