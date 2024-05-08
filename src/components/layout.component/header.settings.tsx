import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown, Space } from "antd";
import { FC } from "react";
import { useAuth } from "../../hook/useAuth";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const HeaderSettings: FC = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: "2",
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            key: "3",
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: "4",
            // danger: true,
            label: (
                <Button
                    danger
                    onClick={async () => {
                        await logout();
                        navigate("/login");
                    }}
                >
                    Выйти
                </Button>
            ),
        },
    ];
    return (
        <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
                <Space style={{ paddingRight: 30 }}>
                    <Avatar size="large" icon={<UserOutlined />} />
                    {user.email}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    );
};
