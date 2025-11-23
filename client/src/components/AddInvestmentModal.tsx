import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_INVESTMENT } from "@/graphql/mutations/investment";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type AssetType =
    | "STOCK"
    | "MUTUAL_FUND"
    | "ETF"
    | "CRYPTO"
    | "BOND"
    | "REAL_ESTATE"
    | "COMMODITY";

interface AddInvestmentModalProps {
    onInvestmentAdded: () => void;
    children?: React.ReactNode;
}

export function AddInvestmentModal({
    onInvestmentAdded,
    children,
}: AddInvestmentModalProps) {
    const [open, setOpen] = useState(false);
    const [createInvestment, { loading }] = useMutation(CREATE_INVESTMENT, {
        onCompleted: () => {
            toast.success("Investment added successfully");
            setOpen(false);
            onInvestmentAdded();
        },
        onError: (error) => {
            toast.error(`Failed to add investment: ${error.message}`);
        },
    });

    const [formData, setFormData] = useState({
        asset_name: "",
        asset_type: "STOCK" as AssetType,
        amount_invested: "",
        current_value: "",
        expected_cagr: "",
        currency: "INR",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createInvestment({
            variables: {
                createInvestmentInput: {
                    asset_name: formData.asset_name,
                    asset_type: formData.asset_type,
                    amount_invested: formData.amount_invested,
                    current_value:
                        formData.current_value || formData.amount_invested,
                    expected_cagr: formData.expected_cagr,
                    currency: formData.currency,
                },
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children ? (
                <DialogTrigger asChild>{children}</DialogTrigger>
            ) : (
                <DialogTrigger asChild>
                    <Button>Add Investment</Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Investment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="asset_name">Asset Name</Label>
                        <Input
                            id="asset_name"
                            name="asset_name"
                            value={formData.asset_name}
                            onChange={handleChange}
                            placeholder="e.g., Apple Inc."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="asset_type">Asset Type</Label>
                        <Select
                            value={formData.asset_type}
                            onValueChange={(value: AssetType) =>
                                handleSelectChange("asset_type", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select asset type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="STOCK">Stock</SelectItem>
                                <SelectItem value="MUTUAL_FUND">
                                    Mutual Fund
                                </SelectItem>
                                <SelectItem value="ETF">ETF</SelectItem>
                                <SelectItem value="CRYPTO">
                                    Cryptocurrency
                                </SelectItem>
                                <SelectItem value="BOND">Bond</SelectItem>
                                <SelectItem value="REAL_ESTATE">
                                    Real Estate
                                </SelectItem>
                                <SelectItem value="COMMODITY">
                                    Commodity
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount_invested">
                            Amount Invested
                        </Label>
                        <Input
                            id="amount_invested"
                            name="amount_invested"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.amount_invested}
                            onChange={handleChange}
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="current_value">
                                Current Value
                            </Label>
                            <span className="text-xs text-muted-foreground">
                                (Optional)
                            </span>
                        </div>
                        <Input
                            id="current_value"
                            name="current_value"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.current_value}
                            onChange={handleChange}
                            placeholder="Leave empty to use invested amount"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="currency">
                            Currency
                        </Label>
                        <Input
                            id="currency"
                            name="currency"
                            type="text"
                            value={formData.currency}
                            onChange={handleChange}
                            placeholder="e.g., INR/BTC/Units"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="expected_cagr">
                            Expected Annual Return (%)
                        </Label>
                        <Input
                            id="expected_cagr"
                            name="expected_cagr"
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={formData.expected_cagr}
                            onChange={handleChange}
                            placeholder="e.g., 8.5"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Adding..." : "Add Investment"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

