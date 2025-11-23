import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_HOME_PAGE_ANALYTICS } from "@/graphql/queries/analytics";

export default function Home() {
    const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
    const [range, setRange] = useState<"current" | "previous">("current");
    const { data, refetch } = useQuery(GET_HOME_PAGE_ANALYTICS, {
        variables: {
            period,
            range,
        },
    });

    useEffect(() => {
        refetch();
    }, [period, range, refetch]);

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Bank Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">
                            {data?.getHomePageAnalytics?.totalBankBalance}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Investments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">
                            {data?.getHomePageAnalytics?.totalInvestment}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex items-center justify-between">
                {/* Title */}
                <h2 className="ml-2 text-xl font-semibold tracking-tight">
                    Summary
                </h2>

                {/* Filters */}
                <div className="flex items-center gap-3">
                    {/* Monthly / Yearly */}
                    <ToggleGroup
                        type="single"
                        value={period}
                        variant="outline"
                        size="sm"
                        onValueChange={(v: "monthly" | "yearly") =>
                            v && setPeriod(v)
                        }
                    >
                        <ToggleGroupItem value="monthly">
                            Monthly
                        </ToggleGroupItem>
                        <ToggleGroupItem value="yearly">Yearly</ToggleGroupItem>
                    </ToggleGroup>

                    {/* Current / Previous */}
                    <ToggleGroup
                        type="single"
                        value={range}
                        variant="outline"
                        size="sm"
                        onValueChange={(v: "current" | "previous") =>
                            v && setRange(v)
                        }
                    >
                        <ToggleGroupItem value="current">
                            Current
                        </ToggleGroupItem>
                        <ToggleGroupItem value="previous">
                            Previous
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Earning</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">
                            {data?.getHomePageAnalytics?.earnings}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">
                            {data?.getHomePageAnalytics?.expenses}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Investments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">
                            {data?.getHomePageAnalytics?.investments}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

