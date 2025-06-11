
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GOAL_CATEGORIES } from "@/types/savings";

interface AddGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: (goal: {
    title: string;
    description: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: Date;
    category: string;
  }) => void;
}

export const AddGoalDialog = ({ open, onOpenChange, onAddGoal }: AddGoalDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !targetAmount || !targetDate || !category) {
      return;
    }

    onAddGoal({
      title,
      description,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      targetDate: new Date(targetDate),
      category,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setTargetAmount("");
    setTargetDate("");
    setCategory("");
    onOpenChange(false);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Savings Goal</DialogTitle>
            <DialogDescription>
              Set up a new savings goal to track your progress towards your financial dreams.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Emergency Fund"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description of your goal"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-card border border-border">
                  {GOAL_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount *</Label>
              <Input
                id="targetAmount"
                type="number"
                min="0.01"
                step="0.01"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetDate">Target Date *</Label>
              <Input
                id="targetDate"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                min={today}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-green-600 hover:bg-green-700"
            >
              Create Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
