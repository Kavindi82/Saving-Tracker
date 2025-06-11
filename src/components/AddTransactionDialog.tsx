
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTransaction: (amount: number, description: string) => void;
  goalTitle: string;
}

export const AddTransactionDialog = ({ open, onOpenChange, onAddTransaction, goalTitle }: AddTransactionDialogProps) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("deposit");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount) {
      return;
    }

    const transactionAmount = type === "deposit" ? parseFloat(amount) : -parseFloat(amount);
    onAddTransaction(transactionAmount, description || `${type === "deposit" ? "Deposit" : "Withdrawal"} to ${goalTitle}`);

    // Reset form
    setAmount("");
    setDescription("");
    setType("deposit");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Add money to or withdraw from "{goalTitle}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <Label>Transaction Type</Label>
              <RadioGroup value={type} onValueChange={setType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="deposit" id="deposit" />
                  <Label htmlFor="deposit">Add Money (Deposit)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="withdrawal" id="withdrawal" />
                  <Label htmlFor="withdrawal">Remove Money (Withdrawal)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
                rows={2}
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
              className={type === "deposit" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {type === "deposit" ? "Add Money" : "Remove Money"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
