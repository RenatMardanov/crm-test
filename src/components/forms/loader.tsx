import { Space, Spin } from "antd";

const Loader = () => {
    return (
        <Space
            style={{
                width: "100%",
                minHeight: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Spin size="large" />
        </Space>
    );
};

export { Loader };
