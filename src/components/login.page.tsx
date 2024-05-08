import { LoginForm } from "./forms/login";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

export const LoginPage = () => {
    const { isAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location, isAuth);
    const fromPage = location.state?.pathname;

    if (isAuth) {
        navigate(fromPage || "/");
    }
    return <LoginForm />;
};
