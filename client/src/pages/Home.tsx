import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">12,500</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">2,000 / 2,500</p>
                    </CardContent>
                </Card>
            </div>
            <div>
                <p className="font-bold text-3xl">Monthly Stats</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Earning</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">2,500</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">1,200</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Investments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">3,800</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
