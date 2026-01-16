import AppLogo from "../AppLogo";

export function Header() {
    return (
        <header className="border-b border-border backdrop-blur supports-backdrop-filter:bg-zinc-800">
            <div className="flex h-14 items-center px-3">
                <AppLogo className="w-50 h-auto" />
            </div>
        </header>
    )
}