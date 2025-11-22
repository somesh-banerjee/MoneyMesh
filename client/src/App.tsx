import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./lib/UserContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Transactions from "./pages/Transactions";
import Investments from "./pages/Investments";
import Budgets from "./pages/Budgets";
import type { JSX } from "react";

// Protected Route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { accessToken } = useUser();
    return accessToken ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Home />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="investments" element={<Investments />} />
                <Route path="budgets" element={<Budgets />} />
            </Route>

            {/* Redirect all other paths to home if authenticated, or to login if not */}
            <Route
                path="*"
                element={
                    <ProtectedRoute>
                        <Navigate to="/" replace />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;

