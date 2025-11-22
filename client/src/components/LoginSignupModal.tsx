"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/lib/UserContext";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, REGISTER_USER } from "@/graphql/mutations/user";
import { toast } from "sonner";

const LoginSignupModal = () => {
    const { accessToken, setAccessToken, setEmail } = useUser();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [login] = useMutation(LOGIN_USER);
    const [register] = useMutation(REGISTER_USER);

    // Refs for login
    const loginEmailRef = useRef<HTMLInputElement>(null);
    const loginPasswordRef = useRef<HTMLInputElement>(null);

    // Refs for signup
    const signupNameRef = useRef<HTMLInputElement>(null);
    const signupEmailRef = useRef<HTMLInputElement>(null);
    const signupPasswordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!accessToken) setOpen(true);
    }, [accessToken]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const email = loginEmailRef.current?.value.trim();
            const password = loginPasswordRef.current?.value.trim();

            const { data } = await login({
                variables: { email, password },
            });

            if (data?.login) {
                setAccessToken(data.login);
                toast("Logged in successfully");
                setEmail(email as string);
                setOpen(false);
            } else {
                setError("Invalid login response");
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Login failed";
            setError(errorMessage);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const name = signupNameRef.current?.value.trim();
            const email = signupEmailRef.current?.value.trim();
            const password = signupPasswordRef.current?.value.trim();

            const { data } = await register({
                variables: {
                    createUserInput: { name, email, password },
                },
            });

            if (data?.register?.email) {
                toast(
                    `User created for ${data.register.email}. Please log in now`,
                );

                if (loginEmailRef.current)
                    loginEmailRef.current.value = email as string;
                if (loginPasswordRef.current)
                    loginPasswordRef.current.value = password as string;
            } else {
                setError("Invalid signup response");
            }
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Signup failed";
            setError(errorMessage);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogOverlay className="fixed inset-0 bg-white/30 backdrop-blur-sm" />
            <DialogContent className="max-w-md w-full">
                <DialogHeader>
                    <DialogTitle className="text-center">Welcome</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Signup</TabsTrigger>
                    </TabsList>

                    {/* Login */}
                    <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <Label htmlFor="login-email">Email</Label>
                                <Input
                                    id="login-email"
                                    type="email"
                                    ref={loginEmailRef}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="login-password">Password</Label>
                                <Input
                                    id="login-password"
                                    type="password"
                                    ref={loginPasswordRef}
                                    required
                                />
                            </div>
                            {error && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                    </TabsContent>

                    {/* Signup */}
                    <TabsContent value="signup">
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <Label htmlFor="signup-name">Name</Label>
                                <Input
                                    id="signup-name"
                                    type="text"
                                    ref={signupNameRef}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    ref={signupEmailRef}
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
                                    ref={signupPasswordRef}
                                    required
                                />
                            </div>
                            {error && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}
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

