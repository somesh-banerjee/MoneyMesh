"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/UserContext";

const LoginSignupModal = () => {
    const { accessToken, setAccessToken } = useUser();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!accessToken) {
            setOpen(true); // Show modal if user not logged in
        }
    }, [accessToken]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Add login logic here
        console.log("Logging in...");
        setAccessToken("mock-user-id");
        setOpen(false);
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Add signup logic here
        console.log("Signing up...");
        setAccessToken("mock-user-id");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogTrigger asChild>
                <Button variant="outline">Login / Signup</Button>
            </DialogTrigger> */}

            <DialogContent className="max-w-md w-full">
                <DialogHeader>
                    <DialogTitle className="text-center">Welcome</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Signup</TabsTrigger>
                    </TabsList>

                    {/* Login Tab */}
                    <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" required />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                    </TabsContent>

                    {/* Signup Tab */}
                    <TabsContent value="signup">
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" required />
                            </div>
                            <div>
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="signup-password">
                                    Password
                                </Label>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Create Account
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default LoginSignupModal;
