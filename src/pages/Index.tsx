
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SavingsGoal } from "@/types/savings";
import { AddGoalDialog } from "@/components/AddGoalDialog";
import { GoalCard } from "@/components/GoalCard";
import { SavingsOverview } from "@/components/SavingsOverview";
import { RecentTransactions } from "@/components/RecentTransactions";

const Index = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('savingsGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save goals to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem('savingsGoals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (newGoal: Omit<SavingsGoal, 'id' | 'createdAt' | 'transactions'>) => {
    const goal: SavingsGoal = {
      ...newGoal,
      id: Date.now().toString(),
      createdAt: new Date(),
      transactions: []
    };
    setGoals(prev => [...prev, goal]);
  };

  const updateGoal = (goalId: string, amount: number, description: string) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const transaction = {
          id: Date.now().toString(),
          amount,
          description,
          date: new Date(),
          type: amount > 0 ? 'deposit' as const : 'withdrawal' as const
        };
        return {
          ...goal,
          currentAmount: goal.currentAmount + amount,
          transactions: [...goal.transactions, transaction]
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground">Savings Tracker</h1>
          <p className="text-lg text-muted-foreground">Track your financial goals and build your future</p>
        </div>

        {/* Overview Cards */}
        <SavingsOverview 
          totalSaved={totalSaved}
          totalTarget={totalTarget}
          goalsCount={goals.length}
        />

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Goals Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-foreground">Your Goals</h2>
              <Button 
                onClick={() => setIsAddGoalOpen(true)}
                className="bg-green-600 hover:bg-green-700 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Goal
              </Button>
            </div>

            {goals.length === 0 ? (
              <Card className="text-center p-8 animate-fade-in">
                <CardContent className="pt-6">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-2">No savings goals yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start your financial journey by creating your first savings goal!
                  </p>
                  <Button 
                    onClick={() => setIsAddGoalOpen(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Create Your First Goal
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {goals.map((goal, index) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onUpdate={updateGoal}
                    onDelete={deleteGoal}
                    className={`animate-fade-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <RecentTransactions goals={goals} />
          </div>
        </div>

        {/* Add Goal Dialog */}
        <AddGoalDialog
          open={isAddGoalOpen}
          onOpenChange={setIsAddGoalOpen}
          onAddGoal={addGoal}
        />
      </div>
    </div>
  );
};

export default Index;
