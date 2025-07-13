import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorFallbackProps = {
    error: Error;
    reset?: () => void;
};

export default function ErrorFallback({ error, reset }: ErrorFallbackProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-6 gap-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div>
                <h2 className="text-lg font-semibold text-destructive">
                    Something went wrong
                </h2>
                <p className="text-muted-foreground text-sm max-w-md mt-2">
                    {error.message}
                </p>
            </div>
            {reset && (
                <Button variant="outline" onClick={reset}>
                    Try Again
                </Button>
            )}
        </div>
    );
}
