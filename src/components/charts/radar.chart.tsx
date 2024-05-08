import { Radar } from "@ant-design/plots";
import { IProductInfo } from "../../types/types";
import { FC } from "react";
interface IRadarData {
    data: IProductInfo[];
}
interface IPreparedData {
    [key: string]: {
        country: string;
        quantity: number;
    };
}

export const RadarChart: FC<IRadarData> = ({ data }) => {
    const preparedData = data.reduce((acc: IPreparedData, current) => {
        if (!acc[current.country]) {
            acc[current.country] = {
                country: current.country,
                quantity: 0,
            };
        }
        acc[current.country].quantity += current.quantity;
        return acc;
    }, {});
    const config = {
        data: Object.values(preparedData),
        xField: "country",
        yField: "quantity",
        area: {
            style: {
                fillOpacity: 0.2,
            },
        },
        scale: {
            x: {
                padding: 0.5,
                align: 0,
            },
            y: {
                nice: true,
            },
        },
        axis: {
            x: {
                title: false,
                grid: true,
            },
            y: {
                gridAreaFill: "rgba(0, 0, 0, 0.04)",
                label: false,
                title: false,
            },
        },
    };

    return <Radar {...config} />;
};
