
import { useState } from "react";
import { WorkoutCard } from "@/components/WorkoutCard";
import { WeekProgress } from "@/components/WeekProgress";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { WorkoutDialog } from "@/components/WorkoutDialog";

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  restTime: number;
}

export interface Workout {
  day: string;
  exercises: Exercise[];
}

const defaultWorkouts = [
  {
    day: "Domingo",
    exercises: [
      { name: "Abdominal Reto", sets: 4, reps: 20, restTime: 45 },
      { name: "Prancha", sets: 3, reps: 30, restTime: 45 },
      { name: "Elevação de Pernas", sets: 3, reps: 15, restTime: 45 },
    ],
  },
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
  {
    day: "Sábado",
    exercises: [
      { name: "Bíceps Barra", sets: 4, reps: 12, restTime: 60 },
      { name: "Bíceps Martelo", sets: 3, reps: 12, restTime: 45 },
      { name: "Tríceps Testa", sets: 4, reps: 12, restTime: 60 },
    ],
  },
];

const Index = () => {
  const [workouts, setWorkouts] = useState<Workout[]>(defaultWorkouts);
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
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

  const handleSaveWorkout = (workout: Workout) => {
    setWorkouts((prev) => {
      const index = prev.findIndex((w) => w.day === workout.day);
      if (index >= 0) {
        const newWorkouts = [...prev];
        newWorkouts[index] = workout;
        return newWorkouts;
      }
      return [...prev, workout];
    });
    setEditingWorkout(null);
    setDialogOpen(false);
    toast({
      description: `Treino de ${workout.day} atualizado com sucesso!`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Meus Treinos</h1>
            <p className="text-muted-foreground">
              Acompanhe seus treinos semanais e marque conforme completa
            </p>
          </div>
          <Button 
            onClick={() => {
              setEditingWorkout(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Treino
          </Button>
        </div>

        <WeekProgress 
          completedWorkouts={completedWorkouts.length} 
          totalWorkouts={workouts.length} 
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <div key={workout.day} className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingWorkout(workout);
                  setDialogOpen(true);
                }}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <WorkoutCard
                day={workout.day}
                exercises={workout.exercises}
                isCompleted={completedWorkouts.includes(workout.day)}
                onComplete={() => handleComplete(workout.day)}
              />
            </div>
          ))}
        </div>

        <WorkoutDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          workout={editingWorkout}
          onSave={handleSaveWorkout}
        />
      </div>
    </div>
  );
};

export default Index;
