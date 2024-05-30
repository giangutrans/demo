
"use client";
import { ShopOutlined, HomeOutlined, ShoppingOutlined, LoadingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link'
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Breadcrumb, Layout, Menu, Image, ConfigProvider, theme, Spin } from 'antd';
import theme_token from "@/theme/themeConfig";
import { isMobile } from 'react-device-detect';
import { usePathname, useRouter } from 'next/navigation'
import DrawerMobile from './DrawerMobile';
import HeaderContent from './HeaderContent';
import { UserInfoAuthnSelector, tokenSelector } from "@/lib/redux/slices/authenSlice/selector";
import { listNotificationSelector } from '@/lib/redux/slices/notificationSlice/selector';
import { fetchListNotificationStart } from "@/lib/redux";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "../../context/ThemeContext"

import type { ConfigProviderProps } from 'antd';

const { Content, Sider, Footer } = Layout;

type SizeType = ConfigProviderProps['prefixCls'];

const items: MenuProps['items'] = [
    {
        icon: HomeOutlined,
        href: "home"
    },
    {
        icon: ShoppingOutlined,
        href: "order"
    },
    {
        icon: ShopOutlined,
        href: "shop"
    }
].map(
    (items, index) => {
        const key = String(index + 1);
        return {
            key: key,
            icon: React.createElement(items.icon),
            label: <Link href={"/" + items.href}>{items.href.toUpperCase()}</Link>,
        };
    },
);

const customBreadcrumb = () => {
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
    )
}

const MyLayout = ({ children }: React.PropsWithChildren) => {
    const dispatch = useDispatch();
    const user = useSelector(UserInfoAuthnSelector);
    const notifications = useSelector(listNotificationSelector)
    const token = useSelector(tokenSelector);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [darkMode, setDarkMode] = useState(false);
    const [dataUser, setDataUser] = useState(user);
    const [useBreadcrumb, setBreadcrumb] = useState(customBreadcrumb);

    const [collapsed, setCollapsed] = useState(false);
    const [heightLayout, setHeight] = useState("100%");
    const [isDesktop, setDesktop] = useState("");

    const pathname = usePathname();
    const pathnameFilter = items.find((item: any) => item.label.props.href === pathname);
    const selectMenu = [String(pathnameFilter?.key)];

    const getUserLogin = () => {
    };

    useEffect(() => {
        if (dataUser) {
            getUserLogin();
            setDataUser(user)
            dispatch(fetchListNotificationStart());
        }
    }, [user]);

    useEffect(() => {
        if (isMobile) {
            setHeight("auto")
            setDesktop("none")
        }
    }, [isMobile]);
    useEffect(() => {
    }, [darkMode]);

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token]);

    const preferences = useMemo(() => ({ loading, setLoading }), [setLoading]);

    return (
        <ThemeContext.Provider value={preferences}>
            <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                <ConfigProvider
                    theme={{
                        algorithm: darkMode ? theme.darkAlgorithm : theme.compactAlgorithm,
                        ...theme_token
                    }}
                >
                    <Layout style={{ minHeight: "100vh" }}>
                        <DrawerMobile items={items}
                            dataUser={dataUser}
                            isMobile={isMobile}
                            selectedKeys={selectMenu}
                        />
                        <Sider
                            theme='light'
                            collapsible
                            collapsed={collapsed}
                            onCollapse={(value) => setCollapsed(value)}
                            style={{ minHeight: "100%", display: isDesktop }}
                        >
                            <Image
                                src={collapsed ? "../assets/img/logo_single.png" : "../assets/img/LogoSvg.png"}
                                preview={false}
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    padding: collapsed ? "1rem" : "2rem"
                                }}
                            />
                            <Menu
                                mode="inline"
                                style={{ borderRight: 0 }}
                                items={items}
                                selectedKeys={selectMenu}
                            />
                        </Sider>
                        <Layout>
                            <HeaderContent
                                dataUser={dataUser}
                                isMobile={isMobile}
                                darkMode={darkMode}
                                setDarkMode={setDarkMode}
                                notifications={notifications}
                            />
                            <Content>
                                <div style={{
                                    margin: "1rem"
                                }}>
                                    {children}
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                                Utrans Shop System ©{new Date().getFullYear()} Created by Utrans technology
                            </Footer>
                        </Layout>
                    </Layout>
                </ConfigProvider>
            </Spin>
        </ThemeContext.Provider>
    )
};

export default MyLayout;
