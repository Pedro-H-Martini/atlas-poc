import { cn } from "@/lib/utils";
interface AppLogoProps {
    variant?: "horizontal" | "vertical";
    className?: string;
    wrap?: boolean;
}

export default function AppLogo({ variant = "horizontal", className, wrap = false }: AppLogoProps) {
    if (variant === "horizontal") {
        return (
            <div className={cn(`flex flex-col items-center`, className)}>
                <img src="/logo_horizontal.png" alt="App Logo" />
            </div>
        );
    }

    return (
        <div className={cn( `flex ${wrap ? "flex-wrap" : "flex-nowrap"} items-center`, className )} >
            <div className="shrink-0 w-full flex justify-center" >
                <img src="/logo.png" alt="ATLAS Logo" width={150} height={30} className="object-contain h-auto"/>
            </div>
            <div
                className={cn("flex items-center shrink-0",wrap ? "w-full mt-2 justify-center" : "")}
            >
            </div>
        </div>
    );
}