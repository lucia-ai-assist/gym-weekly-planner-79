
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  restTime: number;
}

interface WorkoutCardProps {
  day: string;
  exercises: Exercise[];
  isCompleted: boolean;
  onComplete: () => void;
}

export function WorkoutCard({ day, exercises, isCompleted, onComplete }: WorkoutCardProps) {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer",
        isCompleted ? "bg-success/10 border-success" : "bg-card hover:border-primary/50"
      )}
      onClick={onComplete}
    >
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{day}</h3>
          {isCompleted && (
            <Check className="w-5 h-5 text-success animate-fade-in" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          {exercises.map((exercise, index) => (
            <div 
              key={index}
              className="text-sm space-y-1"
            >
              <p className="font-medium">{exercise.name}</p>
              <p className="text-muted-foreground">
                {exercise.sets} séries x {exercise.reps} reps
                <span className="mx-2">•</span>
                {exercise.restTime}s descanso
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
