import { create } from "zustand";

interface ModalStore {
    modal: boolean;
    setModal: (visible: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    modal: false,
    setModal: (visible: boolean) => set((state) => ({ ...state, modal: visible })),
}));
