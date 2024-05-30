"use client";

import { useDispatch, useSelector } from "react-redux";

import MyLayout from "../../components/_layout";
import { Space, Table, Tag, Row, Form, Input, Button, Col, Dropdown, DatePicker, Modal } from 'antd';
import type { TableProps, MenuProps } from 'antd';
const { Search } = Input;
const { RangePicker } = DatePicker;

export default function VoucherPage() {
    const dispatch = useDispatch();
    interface DataType {
        key: string;
        storage: string;
        name: string;
        phone: number;
        address: string;
        surburb: string;
        district: string;
        city: string;
        isActive: true
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Storage',
            dataIndex: 'storage',
            key: 'storage',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Surburb',
            dataIndex: 'surburb',
            key: 'surburb',
        },
        {
            title: 'District',
            dataIndex: 'district',
            key: 'district',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
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
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            storage: 'Binh Duong',
            name: 'Thong Map',
            phone: 123456789,
            address: 'New York No. 1 Lake Park',
            surburb: 'An Phu',
            district: 'District 2',
            city: 'HCMC',
            isActive: true,
        },
        {
            key: '2',
            storage: 'Dong Nai',
            name: 'Thong Beo',
            phone: 987654321,
            address: '43 Nguyen Trai',
            surburb: 'An Phu',
            district: 'District 9',
            city: 'HCMC',
            isActive: true,
        },
        {
            key: '3',
            storage: 'Tay Ninh',
            name: 'Thong Bao',
            phone: 1435435435,
            address: '3 Nguyen Van Trang',
            surburb: 'An Phu',
            district: 'Thu Duc',
            city: 'Thu Duc',
            isActive: true,
        },
    ];



    return (
        <MyLayout>
            <Form>
                <Row gutter={16}>
                    
                    <Col span={8}>
                        <Form.Item >
                            <Search placeholder="Tìm Địa Chỉ" enterButton="Tìm" size="middle" loading />
                        </Form.Item>
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
