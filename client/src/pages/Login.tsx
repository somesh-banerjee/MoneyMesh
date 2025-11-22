import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRef, useState } from "react";
import { useUser } from "@/lib/UserContext";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, REGISTER_USER } from "@/graphql/mutations/user";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const { setAccessToken, setEmail } = useUser();
    const [activeTab, setActiveTab] = useState("login");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const [login] = useMutation(LOGIN_USER);
    const [register] = useMutation(REGISTER_USER);

    // Refs for login
    const loginEmailRef = useRef<HTMLInputElement>(null);
    const loginPasswordRef = useRef<HTMLInputElement>(null);

    // Refs for signup
    const signupNameRef = useRef<HTMLInputElement>(null);
    const signupEmailRef = useRef<HTMLInputElement>(null);
    const signupPasswordRef = useRef<HTMLInputElement>(null);

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
                setEmail(email || null);
                toast("Logged in successfully");
                navigate("/")
            } else {
                setError("Invalid login response");
            }
        } catch (err: any) {
            const errorMessage = err?.message || 'Login failed';
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
                variables: { createUserInput: { name, email, password } },
            });

            if (data?.register) {
                toast(`User created for ${data.register.email}. Please log in now`);
                setActiveTab("login");
                // Auto-fill the login form
                if (loginEmailRef.current) loginEmailRef.current.value = email || '';
                if (loginPasswordRef.current) loginPasswordRef.current.value = '';
            } else {
                setError("Invalid signup response");
            }
        } catch (err: any) {
            const errorMessage = err?.message || 'Signup failed';
            setError(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Welcome to MoneyMesh
                    </h2>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    {/* Login Form */}
                    <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <Label htmlFor="login-email">Email</Label>
                                <Input
                                    id="login-email"
                                    type="email"
                                    ref={loginEmailRef}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="login-password">Password</Label>
                                <Input
                                    id="login-password"
                                    type="password"
                                    ref={loginPasswordRef}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Sign in
                            </Button>
                        </form>
                    </TabsContent>

                    {/* Signup Form */}
                    <TabsContent value="signup">
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <Label htmlFor="signup-name">Name</Label>
                                <Input
                                    id="signup-name"
                                    type="text"
                                    ref={signupNameRef}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    ref={signupEmailRef}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="signup-password">Password</Label>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    ref={signupPasswordRef}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Create Account
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}