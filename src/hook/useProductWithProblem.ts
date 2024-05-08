import { mockProducts } from "./../../mock/mock.products";
import { useEffect, useState } from "react";
import { useBagesStore } from "../store/badges";

export const UseProductWithProblem = ({ type }: { type: "attention" | "danger" }) => {
    const { productsAttention, productsDanger, setAttention, setDanger } = useBagesStore();
    const [count, setCount] = useState<string>("");
    useEffect(() => {
        const data = mockProducts.filter((item) => item.status === type);
        if (type === "attention") {
            setAttention(data);
            setCount(productsAttention.length.toString());
        } else {
            setDanger(data);
            setCount(productsDanger.length.toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { count };
};
