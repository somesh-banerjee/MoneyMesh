import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION } from "@/graphql/mutations/transaction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface AddTransactionModalProps {
    accountId: string;
    onTransactionAdded: () => void;
    children: React.ReactNode;
}

type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER" | "OTHER";
type TransactionDirection = "CREDIT" | "DEBIT";

export function AddTransactionModal({
    accountId,
    onTransactionAdded,
    children,
}: AddTransactionModalProps) {
    const [open, setOpen] = useState(false);
    const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
        onCompleted: () => {
            toast.success("Transaction added successfully");
            setOpen(false);
            onTransactionAdded();
        },
        onError: (error) => {
            toast.error(`Failed to add transaction: ${error.message}`);
        },
    });

    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        counterparty: "",
        direction: "DEBIT" as TransactionDirection,
        type: "EXPENSE" as TransactionType,
        note: "",
        created_at: new Date().toISOString(),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!accountId) {
            toast.error("Please select an account first");
            return;
        }

        await createTransaction({
            variables: {
                createTransactionInput: {
                    account_id: accountId,
                    amount: formData.amount,
                    category: formData.category,
                    counterparty: formData.counterparty,
                    direction: formData.direction,
                    type: formData.type,
                    note: formData.note,
                    created_at: formData.created_at,
                },
            },
        });
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            name="amount"
                            type="number"
                            step="1"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="0"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="counterparty">Counterparty</Label>
                        <Input
                            id="counterparty"
                            name="counterparty"
                            value={formData.counterparty}
                            onChange={handleChange}
                            placeholder="e.g., Amazon, Salary, etc."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="direction">Direction</Label>
                            <select
                                id="direction"
                                name="direction"
                                value={formData.direction}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            >
                                <option value="CREDIT">Credit</option>
                                <option value="DEBIT">Debit</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            >
                                <option value="EXPENSE">Expense</option>
                                <option value="INCOME">Income</option>
                                <option value="TRANSFER">Transfer</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g., Food, Shopping, Salary"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="note">Note</Label>
                        <textarea
                            id="note"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Any additional notes..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="created_at">Created At</Label>
                        <Input
                            id="created_at"
                            name="created_at"
                            value={formData.created_at}
                            onChange={handleChange}
                            type="datetime-local"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Adding..." : "Add Transaction"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

