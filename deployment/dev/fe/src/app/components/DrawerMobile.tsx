"use client";


import {
    SettingOutlined, EditOutlined, LogoutOutlined,
    MenuUnfoldOutlined, MenuFoldOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import {
    Typography, Layout, Menu, Affix, Avatar, Image,
    Badge, Drawer, Button, Card, Divider
} from 'antd';
import { isMobile } from 'react-device-detect';
const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;
const { Meta } = Card;

export default function DrawerMobile(props: any) {
    const { items, dataUser, isMobile, selectedKeys } = props;
    const [collapsed, setCollapsed] = useState(true);
    const [iconDraw, setIconDraw] = useState(<MenuFoldOutlined />);
    const [open, setOpen] = useState(false);
    const [visibleDrawer, setVisibleDrawer] = useState("none")

    useEffect(() => {
        if (isMobile) { setVisibleDrawer("") }
    }, [isMobile])

    const showDrawer = () => {
        setIconDraw(<MenuUnfoldOutlined />)
        setOpen(true);
    };


    const onClose = () => {
        setIconDraw(<MenuFoldOutlined />)
        setOpen(false);
    };

    return (
        < >
            <Affix offsetTop={50} style={{ display: visibleDrawer }}>
                <Button onClick={showDrawer} style={{
                    position: "fixed",
                    zIndex: 100,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0
                }}>
                    {iconDraw}
                </Button>
            </Affix>
            <Drawer
                width="85%"
                onClose={onClose}
                open={open}
                closeIcon={false}

            >
                <Card
                    bordered={false}
                    cover={
                        <Image
                            alt="baobaoshop"
                            src="../assets/img/baobaoshop.jpg"
                            preview={false}
                        />
                    }
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <LogoutOutlined key="ellipsis" />,
                    ]}
                >
                    <Meta
                        avatar={<Avatar src="../assets/img/avatar-baobao.jpg" />}
                        // title={dataUser[0]?.fullName}
                        // description={dataUser[0]?.email}
                    />
                </Card>
                <Divider orientation="left">MENU</Divider>
                <Menu
                    mode="inline"
                    items={items}
                    selectedKeys={selectedKeys}
                />
            </Drawer>
        </>


    );
}
