"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import MyLayout from "../../components/_layout";
import { Layout, Card, Row, Col, Input, Select, Form, Modal, Space, Button, Upload, message, Checkbox } from "antd";
const { Header, Content, Sider } = Layout;
import type { GetProp, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
export default function EditAccount() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const onFinish = (values: any) => {
        console.log('Data insert:', values);
    };

    // const uploadButton = (
    //     <button style={{ border: 0, background: 'none' }} type="button">
    //         {loading ? <LoadingOutlined /> : <PlusOutlined />}
    //         <div style={{ marginTop: 8 }}>Upload</div>
    //     </button>
    // );

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    return (
        <MyLayout>
            <Card>
                <Row>
                    <Col span={12} style={{ paddingRight: "10px" }}>
                        <h2 style={{ marginBottom: "10px" }}>Thông tin tài khoản</h2>
                        <Form
                            name="normal_order_create"
                            className="order-create-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            {/* <Form.Item name="imgProduct" >
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Form.Item> */}
                            Tên shop
                            <Form.Item
                                name="nameShop"
                                rules={[{ required: true, message: 'Vui lòng nhập tên shop!' }]}
                            >
                                <Input placeholder="Nhập tên shop" />

                            </Form.Item>
                            Số điện thoại
                            <Form.Item
                                name="phoneShop"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại shop!' }]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                            Email
                            <Form.Item
                                name="emailShop"
                                rules={[{ required: true, message: 'Vui lòng nhập email shop!' }]}
                            >
                                <Input placeholder="Nhập email" />
                            </Form.Item>
                            Mật khẩu
                            <Form.Item
                                name="password"
                            >
                                <Input placeholder="Nhập mật khẩu" type="password" />
                            </Form.Item>
                            <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={12}>
                        <h2 style={{ marginBottom: "10px" }}>Thông tin ngân hàng</h2>
                        <Form
                            name="normal_order_create"
                            className="order-create-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            Ngân hàng
                            <Form.Item
                                name="bank"
                                rules={[{ required: true, message: 'Vui lòng chọn Ngân hàng!' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Ngân hàng"
                                    optionFilterProp="children"
                                    options={[
                                        {
                                            value: 'jack',
                                            label: 'Jack',
                                        },
                                        {
                                            value: 'lucy',
                                            label: 'Lucy',
                                        },
                                        {
                                            value: 'tom',
                                            label: 'Tom',
                                        },
                                    ]}
                                    style={{ width: "100%" }}
                                />

                            </Form.Item>
                            Chi nhánh ngân hàng
                            <Form.Item
                                name="branchBank"
                                rules={[{ required: true, message: 'Vui lòng nhập Chi nhánh ngân hàng!' }]}
                            >
                                <Input placeholder="Nhập Chi nhánh ngân hàng" />

                            </Form.Item>
                            Tên tài khoản
                            <Form.Item
                                name="bankAccount"
                                rules={[{ required: true, message: 'Vui lòng nhập Tên tài khoản!' }]}
                            >
                                <Input placeholder="Nhập Tên tài khoản" />

                            </Form.Item>
                            Số tài khoản
                            <Form.Item
                                name="bankAccountNumber"
                                rules={[{ required: true, message: 'Vui lòng nhập Số tài khoản!' }]}
                            >
                                <Input placeholder="Nhập Số tài khoản" />

                            </Form.Item>
                            <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button type="primary" htmlType="submit">
                                    Thêm tài khoản
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </MyLayout>
    );
}
