
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Plus, Minus, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SavingsGoal } from "@/types/savings";
import { AddTransactionDialog } from "./AddTransactionDialog";

interface GoalCardProps {
  goal: SavingsGoal;
  onUpdate: (goalId: string, amount: number, description: string) => void;
  onDelete: (goalId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const GoalCard = ({ goal, onUpdate, onDelete, className, style }: GoalCardProps) => {
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);

  const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100;
  const isCompleted = goal.currentAmount >= goal.targetAmount;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const daysRemaining = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <>
      <Card className={`hover:shadow-lg transition-all duration-300 ${isCompleted ? 'ring-2 ring-green-500' : ''} ${className}`} style={style}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                {goal.title}
                {isCompleted && <span className="text-lg">🎉</span>}
              </CardTitle>
              <CardDescription>{goal.description}</CardDescription>
              <Badge variant="secondary">{goal.category}</Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border border-border">
                <DropdownMenuItem onClick={() => setIsTransactionDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Transaction
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(goal.id)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Goal
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className={`transition-all duration-500 ${isCompleted ? 'bg-green-100' : ''}`}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatCurrency(goal.currentAmount)}</span>
              <span>{formatCurrency(goal.targetAmount)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-muted-foreground">Target Date: </span>
              <span className="font-medium">{formatDate(goal.targetDate)}</span>
            </div>
            <div className={`text-right ${daysRemaining < 0 ? 'text-red-500' : daysRemaining < 30 ? 'text-orange-500' : 'text-green-600'}`}>
              {daysRemaining < 0 ? 'Overdue' : `${daysRemaining} days left`}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => setIsTransactionDialogOpen(true)}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={isCompleted}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Money
            </Button>
          </div>
        </CardContent>
      </Card>

      <AddTransactionDialog
        open={isTransactionDialogOpen}
        onOpenChange={setIsTransactionDialogOpen}
        onAddTransaction={(amount, description) => onUpdate(goal.id, amount, description)}
        goalTitle={goal.title}
      />
    </>
  );
};
