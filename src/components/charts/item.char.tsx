import { DualAxes } from "@ant-design/charts";
import { FC } from "react";
import { IProductInfo } from "../../types/types";
import dayjs from "dayjs";

interface LineBarChar {
    data: IProductInfo[];
}

export const DemoDualAxes: FC<LineBarChar> = ({ data }) => {
    const config = {
        xField: (item: IProductInfo) => dayjs(item.date).format("DD/MM/YYYY"),
        data: data,
        legend: {
            color: {
                itemMarker: (v: string) => {
                    if (v === "waiting") return "rect";
                    return "smooth";
                },
            },
        },
        children: [
            {
                type: "interval",
                yField: "quantity",
            },
            {
                type: "line",
                yField: "pricePerUnit",
                shapeField: "smooth",
                scale: { color: { relations: [["pricePerUnit", "#fdae6b"]] } },
                axis: { y: { position: "right" } },
                style: { lineWidth: 2 },
            },
        ],
    };
    return <DualAxes {...config} />;
};
