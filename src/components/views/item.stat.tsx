import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { productService } from "../../api/service/product-service";
import dayjs from "dayjs";
import { TransactionsTable } from "../tables/transactions.table";
import { Flex, Segmented } from "antd";
import { StatisticCard } from "../charts/statistic.card";
import { RadarChart } from "../charts/radar.chart";
import { useState } from "react";
import { Loader } from "../forms/loader";
import { IProductInfo } from "../../types/types";
import { AreaChar } from "../charts/area.char";

const Item = () => {
    const { id } = useParams();
    const [value, setValue] = useState<string>("За все время");
    const {
        data: responseData,
        isError,
        isSuccess,
        isLoading,
    } = useQuery({
        queryKey: ["transactions", `${id}`],
        queryFn: () => productService.getInfoByProductId(id!),
    });
    responseData?.data.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return (
            <>
                <p>Ошибка при получении данных</p>
            </>
        );
    }

    function filterDataByPeriod(period: string, data: IProductInfo[]) {
        const now = dayjs();

        switch (period) {
            case "За все время":
                return data;
            case "Неделя":
                return data.filter((item) => dayjs(item.date).isAfter(now.subtract(1, "week")));
            case "Месяц":
                return data.filter((item) => dayjs(item.date).isAfter(now.subtract(1, "month")));
            case "Год":
                return data.filter((item) => dayjs(item.date).isAfter(now.subtract(1, "year")));
            default:
                console.error("Неверный период");
                return [];
        }
    }
    if (isSuccess) {
        const data = filterDataByPeriod(value, responseData.data);
        return (
            <>
                <Flex justify="space-between" gap={1}>
                    <Flex vertical justify="space-between" style={{ width: "45%" }}>
                        <Segmented
                            options={["За все время", "Неделя", "Месяц", "Год"]}
                            value={value}
                            onChange={setValue}
                            style={{ width: "max-content" }}
                        />
                        {data.length === 0 ? (
                            <Flex justify="center" align="center" style={{ height: "100%" }}>
                                <p>Нет данных за выбранный промежуток времени</p>
                            </Flex>
                        ) : (
                            // <DemoDualAxes data={data} />
                            <AreaChar data={data} title="Количество продаж" />
                        )}
                    </Flex>
                    <Flex style={{ width: "45%" }} vertical>
                        <StatisticCard />
                        <RadarChart data={data} />
                    </Flex>
                </Flex>
                <TransactionsTable data={data} />
            </>
        );
    }

    return <>Ошибка, обратитесь к администратору</>;
};

export default Item;
