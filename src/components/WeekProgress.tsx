
import { Progress } from "@/components/ui/progress";

interface WeekProgressProps {
  completedWorkouts: number;
  totalWorkouts: number;
}

export function WeekProgress({ completedWorkouts, totalWorkouts }: WeekProgressProps) {
  const progress = (completedWorkouts / totalWorkouts) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Progresso Semanal</p>
        <p className="text-sm font-medium">{completedWorkouts}/{totalWorkouts}</p>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
