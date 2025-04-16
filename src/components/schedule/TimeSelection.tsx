
import React from "react";
import { AppointmentSlot } from "@/types/schedule.types";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format, isSameDay } from "date-fns";

interface TimeSelectionProps {
  appointments: AppointmentSlot[];
  selectedDate: Date | undefined;
  selectedTime: string | undefined;
  setSelectedTime: (time: string | undefined) => void;
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentSlot[]>>;
}

export const TimeSelection: React.FC<TimeSelectionProps> = ({
  appointments,
  selectedDate,
  selectedTime,
  setSelectedTime,
  setAppointments
}) => {
  const { toast } = useToast();

  const availableTimesForDate = appointments
    .filter(slot => selectedDate && isSameDay(slot.date, selectedDate) && slot.status === "available")
    .map(slot => slot.time);

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma data e horário",
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
            clientName: "Você"
          };
        }
        return slot;
      })
    );

    toast({
      title: "Agendamento Confirmado",
      description: `Seu agendamento em ${format(selectedDate, "PPP")} às ${selectedTime} foi confirmado.`,
    });

    setSelectedTime(undefined);
  };

  if (!selectedDate) {
    return null;
  }

  if (availableTimesForDate.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">Não há horários disponíveis nesta data.</p>
        <p className="text-sm mt-2">Por favor, selecione outra data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="time">Selecione o Horário</Label>
        <Select 
          value={selectedTime} 
          onValueChange={setSelectedTime}
        >
          <SelectTrigger id="time">
            <SelectValue placeholder="Selecione um horário" />
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
        Agendar Sessão
      </Button>
    </div>
  );
};
