import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS } from "@/graphql/queries/account";
import { GET_TRANSACTIONS } from "@/graphql/queries/transaction";
import { Button } from "@/components/ui/button";
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
import { AddAccountModal } from "@/components/AddAccountModal";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Account = {
    id: string;
    name: string;
    type: string;
};

type Transaction = {
    id: string;
    amount: number;
    category: string;
    counterparty: string;
    created_at: string;
    direction: "CREDIT" | "DEBIT";
    note: string;
    type: string;
};

export default function Transactions() {
    const [selectedAccount, setSelectedAccount] = useState<string>("");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);

    const { data: accountsData, refetch: refetchAccounts } =
        useQuery(GET_ACCOUNTS);

    const { data: transactionsData, loading: loadingTransactions } = useQuery(
        GET_TRANSACTIONS,
        {
            variables: {
                accountId: selectedAccount,
                limit: pageSize,
                offset: page * pageSize,
                orderBy: "created_at",
                orderDirection: "DESC",
            },
            skip: !selectedAccount,
        },
    );

    const accounts: Account[] = accountsData?.accounts || [];
    const transactions: Transaction[] = transactionsData?.transactions || [];

    useEffect(() => {
        if (accountsData?.accounts.length > 0 && !selectedAccount) {
            setSelectedAccount(accountsData.accounts[0].id);
        }
    }, [accountsData]);

    useEffect(() => {
        if (selectedAccount) {
            setPage(0);
        }
    }, [selectedAccount]);

    useEffect(() => {
        setPage(0);
    }, [pageSize]);

    const handleAccountAdded = () => {
        refetchAccounts();
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <p>Account:</p>
                    <Select
                        value={selectedAccount}
                        onValueChange={setSelectedAccount}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select an account" />
                        </SelectTrigger>
                        <SelectContent>
                            {accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                    {account.name} ({account.type})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <AddAccountModal onAccountAdded={handleAccountAdded}>
                    <Button>Add Account</Button>
                </AddAccountModal>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loadingTransactions ? (
                            // Skeleton loaders while transactions are loading
                            Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <Skeleton className="h-4 w-20" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-32" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-24" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="h-4 w-16 ml-auto" />
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {format(
                                            new Date(transaction.created_at),
                                            "MMM dd, yyyy",
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">
                                            {transaction.counterparty}
                                        </div>
                                        {transaction.note && (
                                            <div className="text-xs text-muted-foreground">
                                                {transaction.note}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                            {transaction.category}
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        className={`text-right font-medium ${
                                            transaction.direction === "CREDIT"
                                                ? "text-green-600"
                                                : "text-foreground"
                                        }`}
                                    >
                                        {transaction.direction === "CREDIT"
                                            ? "+"
                                            : "-"}
                                        $
                                        {Math.abs(transaction.amount).toFixed(
                                            2,
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    No transactions found for this account
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between items-center">

                {/* Page size selector */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                        Rows per page:
                    </span>

                    <Select
                        value={String(pageSize)}
                        onValueChange={(v) => setPageSize(Number(v))}
                    >
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Page size" />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 25, 50, 100].map((size) => (
                                <SelectItem key={size} value={String(size)}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Page indicator */}
                <div className="text-sm text-muted-foreground">
                    Page {page + 1}
                </div>

                {/* Pagination buttons */}
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => {
                            if (transactions.length < pageSize) return;
                            setPage((p) => p + 1);
                        }}
                        disabled={transactions.length < pageSize}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}



