import { useQuery } from "@tanstack/react-query";
import { Button, Col, Row } from "antd";
import { productService } from "../../api/service/product-service";
import { Loader } from "../forms/loader";
import { AreaChar } from "../charts/area.char";
import { BadgeWithCount } from "../sections/badge";
import { AlertOutlined, BellOutlined } from "@ant-design/icons";
import { LiquidChar } from "../charts/liquid.char";
import { StatisticCard } from "../charts/statistic.card";

const Dashboard = () => {
    const { data, isFetching, isSuccess } = useQuery({
        queryKey: ["transactions"],
        queryFn: () => productService.getAllTransactions(),
    });

    if (isFetching) {
        return <Loader />;
    }
    if (isSuccess) {
        console.log("hello");
        return (
            <>
                <Row justify="space-between" align="middle">
                    <Col span={8}>
                        <h1>Статистика по товарам:</h1>
                    </Col>
                    <Col span={8}>
                        <StatisticCard />
                    </Col>
                    <Col
                        span={8}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: "20px",
                        }}
                    >
                        <BadgeWithCount type="attention">
                            <Button icon={<BellOutlined />} size="large">
                                Требуется внимание{" "}
                            </Button>
                        </BadgeWithCount>
                        <BadgeWithCount type="danger">
                            <Button icon={<AlertOutlined />} size="large">
                                Товары в опасности
                            </Button>
                        </BadgeWithCount>
                    </Col>
                </Row>
                <Row justify="space-between" align="middle">
                    <Col span={18}>
                        <AreaChar data={data.data} title={"Продажи за неделю"} />
                    </Col>
                    <Col span={6}>
                        <LiquidChar title={"Выполнение плана"} />
                    </Col>
                </Row>
            </>
        );
    }

    return <>ERROR</>;
};

export default Dashboard;
