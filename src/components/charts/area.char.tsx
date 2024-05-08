import { FC } from "react";
import { IProductInfo } from "../../types/types";
import { Area } from "@ant-design/charts";
import dayjs from "dayjs";

interface AreaChar {
    data: IProductInfo[];
    title: string;
}

interface IPreparedData {
    [key: string]: {
        date: string;
        quantity: number;
    };
}

export const AreaChar: FC<AreaChar> = ({ data, title }) => {
    const arr = data.reduce((acc: IPreparedData, current) => {
        const date = dayjs(current.date).format("DD/MM/YYYY");
        if (!acc[date]) {
            acc[date] = {
                date,
                quantity: 0,
            };
        }
        acc[date].quantity += current.quantity;
        return acc;
    }, {});
    const preparedData = Object.values(arr).sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
    const config = {
        data: preparedData,
        xField: "date",
        yField: "quantity",

        scale: {
            x: {
                padding: 0.5,
                align: 0,
            },
            y: {
                nice: true,
            },
        },
        style: {
            fill: "linear-gradient(-90deg, white 0%, #593db4 100%)",
        },
        line: {
            style: {
                stroke: "#593db4",
                strokeWidth: 2,
            },
        },
        animate: { enter: { type: "growInY" } },
    };

    return <Area {...config} title={title} />;
};
