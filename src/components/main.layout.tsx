import { Outlet } from "react-router-dom";
import Sidebar from "./layout.component/nav.sidebar";
import { Suspense } from "react";
import { Loader } from "./forms/loader";

export const MainLayout = () => {
    return (
        <Sidebar>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </Sidebar>
    );
};
