
import { useState } from "react";
import { WorkoutCard } from "@/components/WorkoutCard";
import { WeekProgress } from "@/components/WeekProgress";
import { useToast } from "@/hooks/use-toast";

const workoutData = [
  {
    day: "Segunda",
    exercises: [
      { name: "Supino Reto", sets: 4, reps: 12, restTime: 60 },
      { name: "Crucifixo", sets: 3, reps: 15, restTime: 45 },
      { name: "Tríceps Corda", sets: 4, reps: 12, restTime: 60 },
    ],
  },
  {
    day: "Terça",
    exercises: [
      { name: "Agachamento", sets: 4, reps: 12, restTime: 90 },
      { name: "Leg Press", sets: 4, reps: 15, restTime: 60 },
      { name: "Extensora", sets: 3, reps: 15, restTime: 45 },
    ],
  },
  {
    day: "Quarta",
    exercises: [
      { name: "Puxada Frente", sets: 4, reps: 12, restTime: 60 },
      { name: "Remada Baixa", sets: 4, reps: 12, restTime: 60 },
      { name: "Rosca Direta", sets: 3, reps: 15, restTime: 45 },
    ],
  },
  {
    day: "Quinta",
    exercises: [
      { name: "Desenvolvimento", sets: 4, reps: 12, restTime: 60 },
      { name: "Elevação Lateral", sets: 3, reps: 15, restTime: 45 },
      { name: "Face Pull", sets: 3, reps: 15, restTime: 45 },
    ],
  },
  {
    day: "Sexta",
    exercises: [
      { name: "Stiff", sets: 4, reps: 12, restTime: 90 },
      { name: "Cadeira Flexora", sets: 4, reps: 12, restTime: 60 },
      { name: "Panturrilha", sets: 4, reps: 15, restTime: 45 },
    ],
  },
];

const Index = () => {
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);
  const { toast } = useToast();

  const handleComplete = (day: string) => {
    setCompletedWorkouts((prev) => {
      if (prev.includes(day)) {
        toast({
          description: `Treino de ${day} desmarcado`,
        });
        return prev.filter((d) => d !== day);
      } else {
        toast({
          description: `Treino de ${day} concluído!`,
          className: "bg-success/10 border-success text-success-foreground",
        });
        return [...prev, day];
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Meus Treinos</h1>
          <p className="text-muted-foreground">
            Acompanhe seus treinos semanais e marque conforme completa
          </p>
        </div>

        <WeekProgress 
          completedWorkouts={completedWorkouts.length} 
          totalWorkouts={workoutData.length} 
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workoutData.map((workout) => (
            <WorkoutCard
              key={workout.day}
              day={workout.day}
              exercises={workout.exercises}
              isCompleted={completedWorkouts.includes(workout.day)}
              onComplete={() => handleComplete(workout.day)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
