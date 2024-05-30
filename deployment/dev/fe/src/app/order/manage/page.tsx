"use client";

import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined, ReadOutlined, FileExcelOutlined, DownOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import MyLayout from "../../components/_layout";
import { Space, Table, Tag, Row, Form, Input, Button, Col, Dropdown, DatePicker } from 'antd';
import type { TableProps, MenuProps } from 'antd';
import MyTable from "@/app/components/MyTable";
const { Search } = Input;
const { RangePicker } = DatePicker;

import { fetchListOrderStart } from "@/lib/redux";

export default function ManagePage() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageSize, setPagesize] = useState(10);
    const [totalRecords, setTotal] = useState(10);
    const [loadingTable, setLoadingTable] = useState(true);
    const [dataTable, setDataTable] = useState([]);

    const onSuccess = (result: any) => {
        const { data, total } = result;
        setTotal(total);
        setDataTable(data ? data.map((element: any) => {
            return {
                key: element._id,
                ...element
            }
        }) : []);
    }

    const callAPi = (data: any) => {
        dispatch(fetchListOrderStart(data));
    }

    useEffect(() => {
        callAPi({
            page: page,
            pageSize: pageSize,
            onSuccess: onSuccess
        })
    }, []);

    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'order_code',
            key: 'order_code',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Mã vận đơn',
            dataIndex: 'tracking_code',
            key: 'tracking_code',
            render: (text) => text
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
            key: 'product',
            render: (text) => text[0].product_name
        },
        {
            title: 'Trạng thái giao hàng',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Ngày lấy',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Ngày giao',
            dataIndex: 'address',
            key: 'address',
        },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: (_, { tags }) => (
        //         <>
        //             {tags.map((tag) => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <a>Invite {record.name}</a>
        //             <a>Delete</a>
        //         </Space>
        //     ),
        // },
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
                    <Col span={8}>
                        <Form.Item >
                            <Search placeholder="Mã vận đơn" enterButton="Search" size="middle" loading />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item >
                            <RangePicker />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Space direction="horizontal" style={{ float: "right" }}>
                            <Dropdown.Button menu={{ items }} placement="bottomRight" icon={<DownOutlined />}>
                                Loại đơn hàng
                            </Dropdown.Button>
                            <Dropdown.Button menu={{ items }} placement="bottomRight" icon={<DownOutlined />}>
                                Loại yêu cầu
                            </Dropdown.Button>
                            <Dropdown.Button menu={{ items }} placement="bottomRight" icon={<DownOutlined />}>
                                Khu vực giao
                            </Dropdown.Button>
                        </Space>
                    </Col>
                </Row>
            </Form>

            <MyTable
                columns={columns}
                dataTable={dataTable}
                totalRecords={totalRecords}
            />
        </MyLayout>
    );
}
