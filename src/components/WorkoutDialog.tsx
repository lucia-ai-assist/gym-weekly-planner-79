
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import type { Workout, Exercise } from "@/pages/Index";

interface WorkoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workout: Workout | null;
  onSave: (workout: Workout) => void;
}

const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

export function WorkoutDialog({ open, onOpenChange, workout, onSave }: WorkoutDialogProps) {
  const [currentWorkout, setCurrentWorkout] = useState<Workout>({
    day: days[0],
    exercises: [],
  });

  useEffect(() => {
    if (workout) {
      setCurrentWorkout(workout);
    } else {
      setCurrentWorkout({
        day: days[0],
        exercises: [],
      });
    }
  }, [workout]);

  const handleAddExercise = () => {
    setCurrentWorkout((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        { name: "", sets: 3, reps: 12, restTime: 60 },
      ],
    }));
  };

  const handleRemoveExercise = (index: number) => {
    setCurrentWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const handleExerciseChange = (index: number, field: keyof Exercise, value: string | number) => {
    setCurrentWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) => {
        if (i === index) {
          return {
            ...exercise,
            [field]: field === "name" ? value : Number(value),
          };
        }
        return exercise;
      }),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {workout ? `Editar Treino de ${workout.day}` : "Novo Treino"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Dia da Semana</label>
            <select
              className="w-full p-2 border rounded-md"
              value={currentWorkout.day}
              onChange={(e) => setCurrentWorkout(prev => ({ ...prev, day: e.target.value }))}
            >
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Exercícios</h3>
              <Button onClick={handleAddExercise} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Exercício
              </Button>
            </div>

            {currentWorkout.exercises.map((exercise, index) => (
              <div key={index} className="grid gap-4 p-4 border rounded-lg relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleRemoveExercise(index)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome do Exercício</label>
                    <Input
                      value={exercise.name}
                      onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                      placeholder="Ex: Supino Reto"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Séries</label>
                      <Input
                        type="number"
                        min="1"
                        value={exercise.sets}
                        onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Reps</label>
                      <Input
                        type="number"
                        min="1"
                        value={exercise.reps}
                        onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Descanso (s)</label>
                      <Input
                        type="number"
                        min="0"
                        value={exercise.restTime}
                        onChange={(e) => handleExerciseChange(index, "restTime", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={() => onSave(currentWorkout)}
              disabled={currentWorkout.exercises.length === 0 || 
                currentWorkout.exercises.some(e => !e.name)}
            >
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
