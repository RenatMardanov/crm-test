import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import { Spin } from "antd";
export const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { isAuth } = useAuth();

    if (isAuth === undefined) {
        return <Spin size="large" />;
    }

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
