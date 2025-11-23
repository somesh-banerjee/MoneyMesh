import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_INVESTMENTS } from "@/graphql/queries/investment";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { InfoIcon, Plus } from "lucide-react";
import { AddInvestmentModal } from "@/components/AddInvestmentModal";
import { format } from "date-fns";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type Investment = {
    id: string;
    asset_name: string;
    asset_type: string;
    amount_invested: number;
    current_value: number;
    expected_cagr: number;
    created_at: string;
    updated_at: string;
};

export default function Investments() {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    const {
        loading,
        data,
        error,
        refetch: refetchInvestments,
    } = useQuery(GET_INVESTMENTS, {
        variables: { limit, offset: page * limit },
        fetchPolicy: "cache-and-network",
    });

    const investments = data?.investments || [];

    // Show error toast if there's an error
    useEffect(() => {
        if (error) {
            toast.error("Error loading investments", {
                description:
                    error.message ||
                    "Failed to load investments. Please try again.",
            });
        }
    }, [error]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatPercentage = (value: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "percent",
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
        }).format(value / 100);
    };

    const calculateProfit = (investment: Investment) => {
        const profit = investment.current_value - investment.amount_invested;
        const profitPercentage = (profit / investment.amount_invested) * 100;

        return {
            amount: profit,
            percentage: profitPercentage,
            isPositive: profit >= 0,
        };
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Investments
                    </h1>
                </div>
                <AddInvestmentModal
                    onInvestmentAdded={() => {
                        refetchInvestments();
                    }}
                >
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Investment
                    </Button>
                </AddInvestmentModal>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Asset Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">
                                Invested
                            </TableHead>
                            <TableHead className="text-right">
                                Current Value
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <InfoIcon />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>
                                            Update Current Value to get accurate
                                            calculations
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TableHead>
                            <TableHead className="text-right">
                                Profit/Loss
                            </TableHead>
                            <TableHead className="text-right">CAGR</TableHead>
                            <TableHead>Last Updated</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading &&
                            Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <TableRow key={`skeleton-${i}`}>
                                        <TableCell>
                                            <Skeleton className="h-4 w-24" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-16" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="h-4 w-20 ml-auto" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="h-4 w-20 ml-auto" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="h-4 w-20 ml-auto" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="h-4 w-16 ml-auto" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-24" />
                                        </TableCell>
                                    </TableRow>
                                ))}

                        {!loading && investments.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    No investments found. Add your first
                                    investment to get started.
                                </TableCell>
                            </TableRow>
                        )}

                        {!loading &&
                            investments.map((investment: Investment) => {
                                const profit = calculateProfit(investment);

                                return (
                                    <TableRow key={investment.id}>
                                        <TableCell className="font-medium">
                                            {investment.asset_name}
                                        </TableCell>
                                        <TableCell className="capitalize">
                                            {investment.asset_type.toLowerCase()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {formatCurrency(
                                                investment.amount_invested,
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {formatCurrency(
                                                investment.current_value,
                                            )}
                                        </TableCell>
                                        <TableCell
                                            className={`text-right font-medium ${
                                                profit.isPositive
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {formatCurrency(profit.amount)} (
                                            {profit.isPositive ? "+" : ""}
                                            {profit.percentage.toFixed(1)}
                                            %)
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {formatPercentage(
                                                investment.expected_cagr,
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {format(
                                                new Date(investment.updated_at),
                                                "dd/MM/yyyy",
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">
                        Rows per page
                    </p>
                    <Select
                        value={limit.toString()}
                        onValueChange={(value) => {
                            setLimit(Number(value));
                            setPage(0); // Reset to first page when changing limit
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={limit} />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 20, 50].map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => p + 1)}
                        disabled={
                            !investments.length || investments.length < limit
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

