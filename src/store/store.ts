import { create } from "zustand";
import { IUser } from "../types/types";
import { AuthService } from "../api/service/auth-service";
import axios from "axios";
import { AuthResponse } from "../types/response/AuthResponse";

interface UserStore {
    user: IUser;
    isLoading: boolean;
    isAuth: boolean | undefined;
    setLoading: (isLoading: boolean) => void;
    setAuth: (isAuth: boolean) => void;
    setUser: (user: IUser) => void;
    login: (email: string, password: string) => Promise<void>;
    registration: (email: string, password: string) => Promise<void>;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    user: {} as IUser,
    isLoading: false,
    isAuth: undefined,
    setLoading: (isLoading: boolean) => set((state) => ({ ...state, isLoading })),
    setAuth: (isAuth: boolean) => set((state) => ({ ...state, isAuth })),
    setUser: (user: IUser) => set((state) => ({ ...state, user })),
    registration: async (email: string, password: string) => {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response);
            localStorage.setItem("token", response.data.accessToken);
            set({ isAuth: true });
            set({ user: response.data.user });
        } catch (e) {
            console.log(e);
        }
    },
    login: async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem("token", response.data.accessToken);
            set({ isAuth: true });
            set({ user: response.data.user });
        } catch (e) {
            console.log(e);
        }
    },
    logout: async () => {
        try {
            await AuthService.logout();
            localStorage.removeItem("token");
            set({ isAuth: false });
            set({ user: {} as IUser });
        } catch (e) {
            console.log(e);
        }
    },
    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get<AuthResponse>(
                `${import.meta.env.VITE_API_URL}/refresh`,
                {
                    withCredentials: true,
                }
            );
            localStorage.setItem("token", response.data.accessToken);
            set({ isAuth: true });
            set({ user: response.data.user });
        } catch (e) {
            console.log(e);
        } finally {
            set({ isLoading: false });
        }
    },
}));
