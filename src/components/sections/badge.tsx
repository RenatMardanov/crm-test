import { Badge } from "antd";
import { FC, ReactNode } from "react";
import { UseProductWithProblem } from "../../hook/useProductWithProblem";

interface IBadgeWithCount {
    children: ReactNode;
    type: "attention" | "danger";
}

export const BadgeWithCount: FC<IBadgeWithCount> = ({ children, type }) => {
    const color = type === "attention" ? "yellow" : "red";
    const { count } = UseProductWithProblem({ type });

    return (
        <Badge count={count} color={color}>
            {children}
        </Badge>
    );
};
