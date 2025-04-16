
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { addDays, format, isSameDay } from "date-fns";

// Define types for appointment statuses
type AppointmentStatus = "available" | "booked" | "unavailable";

interface AppointmentSlot {
  date: Date;
  time: string;
  status: AppointmentStatus;
  clientName?: string;
}

const Schedule = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [appointments, setAppointments] = useState<AppointmentSlot[]>([
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
  ]);

  const availableTimesForDate = appointments
    .filter(slot => selectedDate && isSameDay(slot.date, selectedDate) && slot.status === "available")
    .map(slot => slot.time);

  const bookedAppointmentsForDate = appointments
    .filter(slot => selectedDate && isSameDay(slot.date, selectedDate) && slot.status === "booked");

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

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Error",
        description: "Please select both a date and time",
        variant: "destructive",
      });
      return;
    }

    // Update the appointment status
    setAppointments(prev => 
      prev.map(slot => {
        if (isSameDay(slot.date, selectedDate) && slot.time === selectedTime) {
          return {
            ...slot,
            status: "booked",
            clientName: "You"
          };
        }
        return slot;
      })
    );

    toast({
      title: "Appointment Booked",
      description: `Your appointment on ${format(selectedDate, "PPP")} at ${selectedTime} has been confirmed.`,
    });

    setSelectedTime(undefined);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Schedule a Session</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Select a Date</CardTitle>
              <CardDescription>
                Green dates have available slots, red dates are fully booked
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                styles={{
                  day_today: { backgroundColor: "#E5DEFF" },
                  day: (date) => {
                    return { className: getDayClassNames(date) };
                  }
                }}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Time Slots</CardTitle>
              <CardDescription>
                {selectedDate 
                  ? `Select a time on ${format(selectedDate, "MMMM d, yyyy")}` 
                  : "Please select a date first"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDate && (
                <>
                  {availableTimesForDate.length > 0 ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="time">Select Time</Label>
                        <Select 
                          value={selectedTime} 
                          onValueChange={setSelectedTime}
                        >
                          <SelectTrigger id="time">
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTimesForDate.map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={handleBookAppointment} 
                        disabled={!selectedTime}
                      >
                        Book Appointment
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No available slots on this date.</p>
                      <p className="text-sm mt-2">Please select another date.</p>
                    </div>
                  )}
                </>
              )}
              
              {bookedAppointmentsForDate.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Booked Sessions:</h3>
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
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;
