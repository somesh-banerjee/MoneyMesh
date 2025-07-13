import { useGlobalLoader } from "@/lib/LoaderContext";
import { Loader2 } from "lucide-react";

export default function Loader() {
    const { loading } = useGlobalLoader();

    if (loading)
        return (
            <div className="flex items-center justify-center h-full p-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );

    return <></>;
}
