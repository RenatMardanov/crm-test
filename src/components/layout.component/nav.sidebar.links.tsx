import { DashboardOutlined, ShopOutlined, ShoppingOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

export const links: MenuProps["items"] = [
    {
        label: "Dashboard",
        key: "dashboard",
        icon: <DashboardOutlined />,
    },
    {
        label: "Wildberries",
        key: "wb",
        icon: <ShopOutlined />,
        children: [
            { key: "personal", label: "Личные кабинеты", disabled: true },
            { key: "products", label: "Товары" },
            { key: "stat", label: "Статистика" },
        ],
    },
    {
        label: "Ozone",
        key: "ozone",
        icon: <ShoppingOutlined />,
        disabled: true,
        children: [
            { key: "personal", label: "Личные кабинеты" },
            { key: "items", label: "Товары" },
            { key: "stat", label: "Статистика" },
        ],
    },
];
