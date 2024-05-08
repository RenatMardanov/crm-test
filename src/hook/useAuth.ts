import { useEffect } from "react";
import { useUserStore } from "../store/store";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const { checkAuth, isAuth, user, login, logout } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        const auth = async () => {
            if (localStorage.getItem("token")) {
                await checkAuth();
            }
            if (!localStorage.getItem("token")) {
                navigate("/login");
            }
        };
        auth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { isAuth, user, login, logout };
};
