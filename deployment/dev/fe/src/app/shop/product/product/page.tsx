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
        image: string;
        productName: string;
        supplier: string;
        cost: number;
        wholesale: number;
        retail: number;
        size: string;
        weight: string;
        inventory: number;
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'ProductName',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier',
            key: 'supplier',
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
        },
        {
            title: 'Wholesale',
            dataIndex: 'wholesale',
            key: 'wholesale',
        },
        {
            title: 'Retail',
            dataIndex: 'retail',
            key: 'retail',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'Inventory',
            dataIndex: 'inventory',
            key: 'inventory',
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
           image: 'image1',
           productName: 'ao thun',
           supplier: 'abc',
           cost: 10,
           wholesale: 15,
           retail: 20,
           size: '10x10',
           weight: '10g',
           inventory: 10,
        },
        {
            key: '2',
            image: 'image 2',
            productName: 'quan jean',
            supplier: 'arc',
            cost: 20,
            wholesale: 25,
            retail: 30,
            size: '15x15',
            weight: '20g',
            inventory: 15,
         },
         {
            key: '3',
            image: 'image 3',
            productName: 'ao khoac',
            supplier: 'hjgjg',
            cost: 50,
            wholesale: 60,
            retail: 70,
            size: '40x40',
            weight: '40g',
            inventory: 25,
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
                            <Search placeholder="Tìm Sản Phẩm" enterButton="Tìm" size="middle" loading />
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
