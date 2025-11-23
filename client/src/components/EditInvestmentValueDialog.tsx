import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { UPDATE_INVESTMENT } from "@/graphql/mutations/investment";
import type { UpdateInvestmentInput } from "@/graphql/mutations/investment";

interface EditInvestmentValueDialogProps {
  investmentId: string;
  currentValue: number;
  onSuccess: () => void;
}

export function EditInvestmentValueDialog({
  investmentId,
  currentValue,
  onSuccess,
}: EditInvestmentValueDialogProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentValue?.toString() || "");
  const [isLoading, setIsLoading] = useState(false);

  const [updateInvestment] = useMutation(UPDATE_INVESTMENT);

  const handleSave = async () => {
    if (!value) {
      toast.error("Please enter a valid value");
      return;
    }

    try {
      setIsLoading(true);
      
      const input: UpdateInvestmentInput = {
        current_value: value
      };
      
      await updateInvestment({
        variables: {
          updateInvestmentId: investmentId,
          updateInvestmentInput: input
        }
      });
      
      toast.success("Investment value updated successfully");
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Error updating investment:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update investment value");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit value</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Current Value</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentValue" className="text-right">
              New Value
            </Label>
            <Input
              id="currentValue"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="col-span-3"
              placeholder={`Enter value`}
              step="0.01"
              min="0"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
