import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TIMESERIES } from "@/graphql/queries/analytics";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
} from "recharts";

type Props = {
    accountId: string;
};

export function TimeseriesChart({ accountId }: Props) {
    const [from, setFrom] = useState<Date | null>(null);
    const [to, setTo] = useState<Date>(new Date());

    // --- Fetch transactions only when both dates are chosen ---
    const { data, loading, refetch } = useQuery(GET_TIMESERIES, {
        variables: {
            accountId,
            from: from ? from.toISOString() : null,
            to: to ? to.toISOString() : null,
        },
        skip: !from || !to, // prevents API call until both dates are set
    });

    const series = data?.getTimelineAnalytics || [];
    const lineKeys =
        series.length > 0
            ? Object.keys(series[0]).filter(
                  (k) => k !== "bucket" && k !== "__typename",
              )
            : [];

    const colors = {
        credit: "#16a34a",
        debit: "#dc2626",
        investment: "#2563eb",
        other: "#9333ea",
        expense: "#ea580c",
        earning: "#059669",
    };

    // Trigger API refetch when both dates chosen
    useEffect(() => {
        if (from && to) {
            refetch({
                accountId,
                from: from.toISOString(),
                to: to.toISOString(),
            });
        }
    }, [from, to]);

    return (
        <Card className="w-full">
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Account Statistics</CardTitle>

                <div className="flex gap-4">
                    {/* FROM picker */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-[140px]">
                                {from
                                    ? format(from, "MMM dd, yyyy")
                                    : "From date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                selected={from ?? undefined}
                                onSelect={(d) => d && setFrom(d)}
                            />
                        </PopoverContent>
                    </Popover>

                    {/* TO picker */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-[140px]">
                                {to ? format(to, "MMM dd, yyyy") : "To date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                selected={to ?? undefined}
                                onSelect={(d) => d && setTo(d)}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </CardHeader>

            <CardContent className="h-[350px]">
                {/* No date range chosen */}
                {!from || !to ? (
                    <div className="text-center text-muted-foreground py-10">
                        Select “From” date to load data.
                    </div>
                ) : loading ? (
                    // Loading State
                    <div className="text-center text-muted-foreground py-10">
                        Loading transactions...
                    </div>
                ) : series.length === 0 ? (
                    // No data
                    <div className="text-center text-muted-foreground py-10">
                        No data found for selected range.
                    </div>
                ) : (
                    // Chart
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={series}>
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
                                dataKey="bucket"
                                tickFormatter={(d) =>
                                    format(new Date(d), "MMM dd")
                                }
                            />

                            <YAxis />

                            <Tooltip
                                labelFormatter={(d) =>
                                    format(new Date(d), "PPP")
                                }
                            />
                            <Legend />

                            {lineKeys.map((key) => (
                                <Line
                                    key={key}
                                    dataKey={key}
                                    type="monotone"
                                    stroke={colors[key as keyof typeof colors]}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}

