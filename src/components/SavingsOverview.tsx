
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, DollarSign } from "lucide-react";

interface SavingsOverviewProps {
  totalSaved: number;
  totalTarget: number;
  goalsCount: number;
}

export const SavingsOverview = ({ totalSaved, totalTarget, goalsCount }: SavingsOverviewProps) => {
  const progressPercentage = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid md:grid-cols-3 gap-4 animate-fade-in">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(totalSaved)}</div>
          <p className="text-xs text-muted-foreground">
            Across {goalsCount} {goalsCount === 1 ? 'goal' : 'goals'}
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Target</CardTitle>
          <Target className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalTarget)}</div>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(totalTarget - totalSaved)} remaining
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
          <Progress value={progressPercentage} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};
