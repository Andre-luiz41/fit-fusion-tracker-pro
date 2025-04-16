
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { AppointmentSlot } from "@/types/schedule.types";
import { ScheduleCalendar } from "@/components/schedule/ScheduleCalendar";
import { TimeSelection } from "@/components/schedule/TimeSelection";
import { BookedAppointments } from "@/components/schedule/BookedAppointments";
import { initialAppointments } from "@/components/schedule/AppointmentData";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [appointments, setAppointments] = useState<AppointmentSlot[]>(initialAppointments);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Agendar uma Sessão</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Selecione uma Data</CardTitle>
              <CardDescription>
                Datas em verde têm horários disponíveis, datas em vermelho estão totalmente ocupadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduleCalendar 
                appointments={appointments}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Horários Disponíveis</CardTitle>
              <CardDescription>
                {selectedDate 
                  ? `Selecione um horário em ${format(selectedDate, "d 'de' MMMM 'de' yyyy")}` 
                  : "Por favor, selecione uma data primeiro"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDate && (
                <>
                  <TimeSelection 
                    appointments={appointments}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    setAppointments={setAppointments}
                  />
                  
                  <BookedAppointments 
                    appointments={appointments}
                    selectedDate={selectedDate}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;
