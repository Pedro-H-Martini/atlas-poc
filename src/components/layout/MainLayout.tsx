import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function MainLayout() {
    return (
        <div className="flex w-full min-h-screen">
            <div className="flex-1 flex flex-col">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}