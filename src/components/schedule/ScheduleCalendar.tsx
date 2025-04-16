
import React from "react";
import { AppointmentSlot } from "@/types/schedule.types";
import { Calendar } from "@/components/ui/calendar";
import { isSameDay } from "date-fns";

interface ScheduleCalendarProps {
  appointments: AppointmentSlot[];
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

export const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({
  appointments,
  selectedDate,
  setSelectedDate
}) => {
  // Function to determine date appearance in calendar
  const getDayClassNames = (day: Date) => {
    const hasAvailable = appointments.some(slot => 
      isSameDay(slot.date, day) && slot.status === "available"
    );
    
    const hasBooked = appointments.some(slot => 
      isSameDay(slot.date, day) && slot.status === "booked"
    );
    
    if (hasBooked && !hasAvailable) return "bg-red-100 text-red-900";
    if (hasAvailable) return "bg-green-100 text-green-900";
    return "";
  };

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      className="rounded-md border"
      modifiersStyles={{
        selected: {
          backgroundColor: "#7E69AB", 
          color: "white"
        }
      }}
      modifiers={{
        available: (date) => appointments.some(slot => 
          isSameDay(slot.date, date) && slot.status === "available"
        ),
        booked: (date) => appointments.some(slot => 
          isSameDay(slot.date, date) && slot.status === "booked" && !appointments.some(s => 
            isSameDay(s.date, date) && s.status === "available"
          )
        )
      }}
      components={{
        Day: ({ date, ...props }: any) => {
          const customClassName = getDayClassNames(date);
          return <button {...props} className={`${props.className || ''} ${customClassName}`} />;
        }
      }}
    />
  );
};
