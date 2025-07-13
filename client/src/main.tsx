import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppProviders } from "./lib/AppProviders.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProviders>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppProviders>
    </StrictMode>
);
