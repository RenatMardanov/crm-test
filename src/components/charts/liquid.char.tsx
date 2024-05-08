import { Liquid } from "@ant-design/charts";

export const LiquidChar = ({ title }: { title: string }) => {
    const config = {
        percent: 0.45,
        style: {
            outlineBorder: 4,
            outlineDistance: 8,
            waveLength: 128,
        },
    };
    return <Liquid {...config} title={title} />;
};
