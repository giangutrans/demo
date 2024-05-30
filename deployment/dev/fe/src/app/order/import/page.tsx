"use client";

import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined, ReadOutlined, FileExcelOutlined, DownOutlined } from '@ant-design/icons';

import MyLayout from "../../components/_layout";
import { Space, Table, Tag, Row, Form, Input, Button, Col, Dropdown } from 'antd';
import type { TableProps, MenuProps } from 'antd';
const { Search } = Input;

export default function ImportPage() {
    const dispatch = useDispatch();
    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
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
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Không cho xem hàng
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Cho xem hàng không thử
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    Cho thử hàng
                </a>
            ),
        },
    ];

    return (
        <MyLayout>
            <Form>
                <Row gutter={16}>
                    <Col span={10}>
                        <Form.Item >
                            <Search placeholder="Mã đơn hàng" enterButton="Search" size="middle" loading />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item >
                            <Dropdown.Button menu={{ items }} placement="bottomRight" icon={<DownOutlined />}>
                                Điều kiện nhận hàng
                            </Dropdown.Button>
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                    </Col>
                    <Col span={8} >
                        {/* <Space>
                            <Form.Item >
                                <Button placeholder="input search text" icon={<UploadOutlined />} size="middle" >Import</Button>
                            </Form.Item>
                            <Form.Item >
                                <Button placeholder="input search text" icon={<ReadOutlined />} size="middle" >Đọc File</Button>
                            </Form.Item>
                            <Form.Item >
                                <Button placeholder="input search text" icon={<FileExcelOutlined />} size="middle" >Tải xuống file mẫu</Button>
                            </Form.Item>
                        </Space> */}
                    </Col>
                </Row>
            </Form>
            <Table
                style={{ width: "100%" }}
                columns={columns} dataSource={data}
            />
        </MyLayout>
    );
}
