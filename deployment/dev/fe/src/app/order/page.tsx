"use client";

import MyLayout from '../components/_layout';
import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Space, Card, Col, Row } from "antd";
import Link from "next/link";
import { PlusSquareOutlined, FolderAddOutlined, AreaChartOutlined } from '@ant-design/icons';

export default function ShopPage() {
    const contentDesktop = () => {
        return (
            <Row gutter={16} style={{ textAlign: "center" }}>
                <Col span={8} >
                    <Link href={"/order/manage"}>
                        <Card bordered={false} title="Quản lý đơn hàng" hoverable
                            style={{ marginRight: "1rem" }}>
                            <AreaChartOutlined style={{ fontSize: "5rem" }} />
                        </Card>
                    </Link>
                </Col>
                <Col span={8}>
                    <Link href={"/order/create"}>
                        <Card bordered={false} title="Tạo đơn hàng" hoverable
                            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                            <PlusSquareOutlined style={{ fontSize: "5rem" }} />
                        </Card>
                    </Link>
                </Col>
                <Col span={8}>
                    <Link href={"/order/import"}>
                        <Card bordered={false} title="Tạo đơn hàng loạt"
                            hoverable style={{ marginLeft: "1rem" }}>
                            <FolderAddOutlined style={{ fontSize: "5rem" }} />
                        </Card>
                    </Link>
                </Col>
            </Row>

        )
    }

    const contentMobile = () => {
        return (
            <Space direction="vertical" style={{ width: "100%", textAlign: "center" }}>
                <Card bordered={false} title="Quản lý đơn hàng" hoverable  >
                    <AreaChartOutlined style={{ fontSize: "5rem" }} />
                </Card>
                <Link href={"/order/create"}>
                    <Card bordered={false} title="Tạo đơn hàng" hoverable>
                        <PlusSquareOutlined style={{ fontSize: "5rem" }} />

                    </Card>
                </Link>
                <Link href={"/order/import"}>
                    <Card bordered={false} title="Tạo đơn hàng loạt">
                        <FolderAddOutlined style={{ fontSize: "5rem" }} />
                    </Card>
                </Link>
            </Space>
        )
    }

    const [content, setContent] = useState(contentDesktop);

    useEffect(() => {
        if (isMobile) {
            setContent(contentMobile)
        }
    }, [isMobile]);

    return (
        <MyLayout>
            {content}
        </MyLayout>
    );
}

