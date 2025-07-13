import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Transactions from "./pages/Transactions";
import Expenses from "./pages/Expenses";
import Investments from "./pages/Investments";
import Budgets from "./pages/Budgets";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="investments" element={<Investments />} />
                <Route path="budgets" element={<Budgets />} />
            </Route>
        </Routes>
    );
}

export default App;
