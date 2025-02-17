
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeekProgressProps {
  completedWorkouts: string[];
  totalWorkouts: number;
}

const WEEK_DAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const FULL_DAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export function WeekProgress({ completedWorkouts, totalWorkouts }: WeekProgressProps) {
  const [date, setDate] = useState<Date>(new Date());
  const progress = (completedWorkouts.length / totalWorkouts) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Progresso Semanal</p>
        <p className="text-sm font-medium">{completedWorkouts.length}/{totalWorkouts}</p>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEK_DAYS.map((day, index) => {
          const isCompleted = completedWorkouts.includes(FULL_DAYS[index]);
          
          return (
            <Popover key={day}>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "relative h-8 rounded-md text-sm font-medium transition-colors",
                    "hover:bg-muted flex items-center justify-center",
                    isCompleted ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {day}
                  {isCompleted && (
                    <CheckCircle2 className="w-3 h-3 absolute -top-1 -right-1 text-primary" />
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="rounded-md border"
                  modifiers={{
                    completed: (date) => {
                      const dayName = FULL_DAYS[date.getDay()];
                      return completedWorkouts.includes(dayName);
                    }
                  }}
                  modifiersStyles={{
                    completed: {
                      backgroundColor: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))"
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          );
        })}
      </div>

      <Progress value={progress} className="h-2" />
    </div>
  );
}
