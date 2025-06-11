
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SavingsGoal } from "@/types/savings";
import { ArrowUpCircle, ArrowDownCircle, Clock } from "lucide-react";

interface RecentTransactionsProps {
  goals: SavingsGoal[];
}

export const RecentTransactions = ({ goals }: RecentTransactionsProps) => {
  // Get all transactions from all goals and sort by date
  const allTransactions = goals.flatMap(goal => 
    goal.transactions.map(transaction => ({
      ...transaction,
      goalTitle: goal.title,
      goalId: goal.id
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(amount));
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (allTransactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your latest transactions will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-2">📊</div>
            <p>No transactions yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {allTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              {transaction.type === 'deposit' ? (
                <ArrowUpCircle className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDownCircle className="h-4 w-4 text-red-600" />
              )}
              <div>
                <p className="font-medium text-sm">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">{transaction.goalTitle}</p>
                <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-medium ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
