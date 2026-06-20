import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppProviders } from "./lib/AppProviders.tsx";
import { AppErrorBoundary } from "./lib/AppErrorBoundary.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppErrorBoundary>
            <AppProviders>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AppProviders>
        </AppErrorBoundary>
    </StrictMode>
);
