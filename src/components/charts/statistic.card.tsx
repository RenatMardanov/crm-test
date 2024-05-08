import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

export const StatisticCard = () => {
    return (
        <Row gutter={16} style={{ width: "100%" }}>
            <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                        style={{ width: "content" }}
                        title="Продажи"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                        title="Валовая прибыль"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: "#cf1322" }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                    />
                </Card>
            </Col>
        </Row>
    );
};
