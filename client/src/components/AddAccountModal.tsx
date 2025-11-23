import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@apollo/client";
import { CREATE_ACCOUNT } from "@/graphql/mutations/account";
import { toast } from "sonner";

type AccountType = "BANK" | "CREDIT_CARD";

interface AddAccountModalProps {
    onAccountAdded: () => void;
    children: React.ReactNode;
}

export function AddAccountModal({
    onAccountAdded,
    children,
}: AddAccountModalProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [currency, setCurrency] = useState("INR");
    const [type, setType] = useState<AccountType>("BANK");
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createAccount({
                variables: {
                    createAccountInput: {
                        name,
                        type,
                        currency,
                    },
                },
            });
            toast.success("Account created successfully");
            setOpen(false);
            onAccountAdded();
        } catch (error) {
            toast.error("Failed to create account");
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Account</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="account-name">Account Name</Label>
                        <Input
                            id="account-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Chase Checking"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="account-currency">
                            Account Currency
                        </Label>
                        <Input
                            id="account-currency"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            placeholder="e.g., INR, BTC, Units"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="account-type">Account Type</Label>
                        <select
                            id="account-type"
                            value={type}
                            onChange={(e) =>
                                setType(e.target.value as AccountType)
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="BANK">Savings</option>
                            <option value="CREDIT_CARD">Credit Card</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Account"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

