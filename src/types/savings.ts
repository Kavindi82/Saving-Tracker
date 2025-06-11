
export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  type: 'deposit' | 'withdrawal';
}

export interface SavingsGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: string;
  createdAt: Date;
  transactions: Transaction[];
}

export const GOAL_CATEGORIES = [
  'Emergency Fund',
  'Vacation',
  'Car',
  'House',
  'Education',
  'Wedding',
  'Electronics',
  'Health',
  'Investment',
  'Other'
] as const;
