import { Home, ArrowLeftRight, TrendingUp, Menu, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Outlet, Link, useLocation } from "react-router";
import { useState } from "react";
import Loader from "@/components/Loader";
import LoginSignupModal from "@/components/LoginSignupModal";

const navLinks = [
    { label: "Dashboard", icon: Home, to: "/" },
    { label: "Transactions", icon: ArrowLeftRight, to: "/transactions" },
    { label: "Investments", icon: TrendingUp, to: "/investments" },
    { label: "Budgets", icon: Wallet, to: "/budgets" },
];

export default function MainLayout() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex md:w-64 flex-col border-r bg-muted/40 p-4">
                <h1 className="text-xl font-bold mb-6">MoneyMesh</h1>
                <nav className="flex flex-col gap-1">
                    {navLinks.map(({ label, icon: Icon, to }) => (
                        <Link key={label} to={to}>
                            <Button
                                variant={
                                    location.pathname === to
                                        ? "default"
                                        : "ghost"
                                }
                                className="w-full justify-start"
                            >
                                <Icon className="mr-2 h-4 w-4" />
                                {label}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Mobile Sidebar Sheet */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 left-4 z-50 md:hidden"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-4">
                    <h1 className="text-xl font-bold mb-6">MoneyMesh</h1>
                    <nav className="flex flex-col gap-1">
                        {navLinks.map(({ label, icon: Icon, to }) => (
                            <Link
                                key={label}
                                to={to}
                                onClick={() => setOpen(false)}
                            >
                                <Button
                                    variant={
                                        location.pathname === to
                                            ? "default"
                                            : "ghost"
                                    }
                                    className="w-full justify-start"
                                >
                                    <Icon className="mr-2 h-4 w-4" />
                                    {label}
                                </Button>
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>

            <LoginSignupModal />
            <Loader />
            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}
