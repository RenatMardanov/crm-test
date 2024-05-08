import { FC, ReactNode, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Space, theme } from "antd";
import { HeaderSettings } from "./header.settings";
import { useNavigate } from "react-router-dom";
import { links } from "./nav.sidebar.links";
import { useScreenHeight } from "../../hook/useScreenHeight";

const { Header, Sider, Content } = Layout;

interface ISidebar {
    children: ReactNode;
}

const Sidebar: FC<ISidebar> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const screenHeight = useScreenHeight();
    const navigate = useNavigate();

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key) {
            navigate(key);
        }
    };

    return (
        <Layout>
            <Sider
                width={250}
                style={{
                    background: colorBgContainer,
                    height: screenHeight - 90,
                }}
                collapsible
                collapsed={collapsed}
                trigger={null}
            >
                <Space
                    style={{
                        height: 80,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottom: `2px solid #${colorBgContainer}`,
                    }}
                >
                    {collapsed ? "" : "Ахуенное лого"}
                </Space>
                <Menu
                    mode="inline"
                    style={{
                        height: "100%",
                        borderRight: 0,
                        boxShadow: "0px 03px 8px 0px rgba(0,0,0,0.12)",
                    }}
                    onClick={handleMenuClick}
                    items={links}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        height: 80,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.12)",
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <HeaderSettings />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: screenHeight - 150,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflowX: "hidden",
                        overflowY: "scroll",
                        maxHeight: screenHeight - 145,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Sidebar;
