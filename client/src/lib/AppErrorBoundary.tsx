import { Component, type ErrorInfo, type ReactNode } from "react";
import ErrorFallback from "@/components/ErrorFallback";

type Props = {
    children: ReactNode;
};

type State = {
    error: Error | null;
};

export class AppErrorBoundary extends Component<Props, State> {
    state: State = { error: null };

    static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("Unhandled application error", error, info);
    }

    reset = () => {
        this.setState({ error: null });
    };

    render() {
        if (this.state.error) {
            return (
                <ErrorFallback error={this.state.error} reset={this.reset} />
            );
        }

        return this.props.children;
    }
}
