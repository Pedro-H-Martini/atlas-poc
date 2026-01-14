interface AppLogoProps {
    variant?: "horizontal" | "vertical";
    className?: string;
}

export default function AppLogo({ variant = "horizontal", className }: AppLogoProps) {
    return (
        <div className={`flex items-center ${variant === "vertical" ? "flex-col" : "flex-row"} ${className ?? ""}`}>
            <img src="/logo.png" alt="App Logo" />
        </div>
    )
}