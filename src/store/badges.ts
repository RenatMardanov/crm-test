import { create } from "zustand";
import { IProduct } from "../types/types";

interface BagesStore {
    productsAttention: IProduct[];
    productsDanger: IProduct[];
    setAttention: (products: IProduct[]) => void;
    setDanger: (products: IProduct[]) => void;
}

export const useBagesStore = create<BagesStore>((set) => ({
    productsAttention: [] as IProduct[],
    productsDanger: [] as IProduct[],
    setAttention: (productsAttention: IProduct[]) =>
        set((state) => ({ ...state, productsAttention })),
    setDanger: (productsDanger: IProduct[]) => set((state) => ({ ...state, productsDanger })),
}));
