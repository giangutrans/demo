"use client";

import { useDispatch } from "react-redux";

import MyLayout from "../../../components/_layout";
import { Space, Table, Row, Form, Input, Button, Col } from 'antd';
import type { TableProps } from 'antd';
import { useState } from "react";
const { Search } = Input;

export default function AddressPage() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false)
    interface DataType {
        key: string;
        supplierNumber: string;
        supplierName: string;
        isActive: true
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'SupplierNumber',
            dataIndex: 'supplierNumber',
            key: 'supplierNumber',
        },
        {
            title: 'SupplierName',
            dataIndex: 'supplierName',
            key: 'supplierName',
        },
        {
            title: 'Active',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive) => (
                <span>{isActive ? 'Active' : 'Inactive'}</span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            supplierNumber: 'GO24C6785',
            supplierName: 'Nhà cung cấp 1',
            isActive: true,
        },
        {
            key: '2',
            supplierNumber: 'GO24C6789',
            supplierName: 'Nhà cung cấp 2',
            isActive: true,
        },
        {
            key: '3',
            supplierNumber: 'GO24C6788',
            supplierName: 'Nhà cung cấp 3',
            isActive: true,
        },
    ];

    const handleFormSubmit = (values: any) => {
        setIsModalOpen(false)
    }


    return (
        <MyLayout>
            <Form>
                <Row gutter={16}>
                    
                    <Col span={8}>
                        <Form.Item >
                            <Search placeholder="Tìm Nhà Cung Cấp" enterButton="Tìm" size="middle" loading />
                        </Form.Item>
                    </Col>
                    <Col style={{position: 'absolute', right: '8px'}}> 
                        <Button style={{ background: '#184858', color: 'white' }} onClick={() => setIsModalOpen(true)}>+ Tạo Mới</Button>
                    </Col>

                    <Table
                        style={{ width: "100%" }}
                        columns={columns} dataSource={data}
                    />
                </Row>
            </Form>
        </MyLayout>
    );
}
