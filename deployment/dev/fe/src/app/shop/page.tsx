"use client";

import MyLayout from '../components/_layout';
import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Space, Card, Col, Row } from "antd";
import Link from "next/link";
import { ShoppingOutlined, ContactsOutlined, GifOutlined } from '@ant-design/icons';

export default function ShopPage() {
    const contentDesktop = () => {
        return (
            <Row gutter={16} style={{ textAlign: "center" }}>
                <Col span={8} >
                    <Link href={"/shop/address"}>
                        <Card bordered={false} title="Địa Chỉ" hoverable
                            style={{ marginRight: "1rem" }}>
                            <ContactsOutlined style={{ fontSize: "5rem" }} />
                        </Card>
                    </Link>
                </Col>
                <Col span={8}>
                    <Link href={"/shop/product"}>
                        <Card bordered={false} title="Sản Phẩm" hoverable
                            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                            <ShoppingOutlined style={{ fontSize: "5rem" }} />
                        </Card>
                    </Link>
                </Col>
                <Col span={8}>
                    <Link href={"/shop/voucher"}>
                        <Card bordered={false} title="Khuyến Mãi"
                            hoverable style={{ marginLeft: "1rem" }}>
                            <GifOutlined style={{ fontSize: "5rem" }} />
                        </Card>
                    </Link>
                </Col>
            </Row>

        )
    }

    const contentMobile = () => {
        return (
            <Space direction="vertical" style={{ width: "100%", textAlign: "center" }}>
                <Link href={"/shop/address"}>
                    <Card bordered={false} title="Địa Chỉ" hoverable  >
                        <ContactsOutlined style={{ fontSize: "5rem" }} />
                    </Card>
                </Link>

                <Link href={"/shop/product"}>
                    <Card bordered={false} title="Sản Phẩm" hoverable>
                        <ShoppingOutlined style={{ fontSize: "5rem" }} />

                    </Card>
                </Link>
                <Link href={"/shop/voucher"}>
                    <Card bordered={false} title="Khuyến Mãi">
                        <GifOutlined style={{ fontSize: "5rem" }} />
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

