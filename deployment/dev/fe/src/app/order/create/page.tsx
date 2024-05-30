"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import MyLayout from "../../components/_layout";
import { Layout, Card, Row, Col, Input, Select, Form, Modal, Space, Button, Upload, message, Checkbox } from "antd";
const { Header, Content, Sider } = Layout;
import type { GetProp, UploadProps } from 'antd';
import { fetchCreateOrderStart } from "@/lib/redux";

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
export default function CreatePage() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddressOpen, setIsModalAddressOpen] = useState(0);
    const [formAddress] = Form.useForm();
    const [formOrder] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const onFinish = (values: any) => {
        console.log('Data insert:', values);
        let addressFrom = values.addressShop.split(",");
        let addressReceFrom = values.addressReceiver.split(",");
        let param : any = {
            order_code: "string",
            tracking_code: "string",
            shipper_id: 0,
            shipper_name: "string",
            status: "string",
            pick_from: {
              name: values.nameShop,
              phone_number: values.phoneShop,
              email: "",
              address: {
                address: values.addressShop,
                ward: addressFrom[1],
                district: addressFrom[2],
                province: addressFrom[3],
                postcode: "string"
              }
            },
            pick_to: {
              name: values.nameReceiver,
              phone_number: values.phoneReceiver,
              email: "string",
              address: {
                address: values.addressShop,
                ward: addressReceFrom[1],
                district: addressReceFrom[2],
                province: addressReceFrom[3],
                postcode: "string"
              }
            },
            product: [
              {
                name: values.productName,
                product_code: "values",
                weight: values.productWeight,
                quantity: values.productNumber
              }
            ]
          }
        dispatch(fetchCreateOrderStart({
            onSuccess: onInsertSuccess,
            onFailure: onInsertFailure,
            ...param
          }));
    };

    const onInsertSuccess = () =>{
        console.log("Insert success!");
    }

    const onInsertFailure = () =>{
        console.log("Insert fail!");
    }

    const onFinishModalAddress = (values: any) => {
        let fullAddress = values.addressDetail + ", " + values.street + ", " + values.warn + ", " + values.district + ", " + values.city;
        if (isModalAddressOpen === 0) {
            formOrder.setFieldsValue({
                addressShop: fullAddress
            })
        }
        else {
            formOrder.setFieldsValue({
                addressReceiver: fullAddress
            })
        }
        handleCancel();
    }
    const showModal = (isAddress: any) => {
        setIsModalOpen(true);
        console.log(isAddress)
        setIsModalAddressOpen(isAddress);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {/* {loading ? :} */}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <MyLayout>
            <Card>
                <Form
                    form={formOrder}
                    name="normal_order_create"
                    className="order-create-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Row>
                        <Col span={12}>
                            <h2>Địa chỉ lấy hàng</h2>
                            <Form.Item
                                name="phoneShop"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại shop!' }]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                            <Form.Item
                                name="nameShop"
                                rules={[{ required: true, message: 'Vui lòng nhập tên shop!' }]}
                            >
                                <Input placeholder="Nhập tên shop" />
                            </Form.Item>
                            <Form.Item
                                name="addressShop"
                                rules={[{ required: true, message: 'Vui lòng chọn địa chỉ!' }]}
                            >
                                <Input placeholder="Địa chỉ" onClick={() => showModal(0)} />
                            </Form.Item>
                            <h2>Địa chỉ giao hàng</h2>
                            <Form.Item
                                name="phoneReceiver"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại khách hàng!' }]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                            <Form.Item
                                name="nameReceiver"
                                rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
                            >
                                <Input placeholder="Nhập tên khách hàng" />
                            </Form.Item>
                            <Form.Item
                                name="addressReceiver"
                                rules={[{ required: true, message: 'Vui lòng chọn địa chỉ giao hàng!' }]}
                            >
                                <Input placeholder="Địa chỉ" onClick={() => showModal(1)} />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ borderLeft: "1px solid rgb(224 224 224 / 1)", paddingLeft: "15px" }}>
                            <h2>Sản phẩm</h2>
                            <Row>
                                <Form.Item name="imgProduct" style={{ marginBottom: "0px !important" }}>
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
                                </Form.Item>
                                <div className="product-info">
                                    <Form.Item
                                        name="productName"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                                    >
                                        <Input placeholder="Nhập tên sản phẩm" />
                                    </Form.Item>
                                    <div className="product-index" style={{ display: "flex" }}>
                                        <Form.Item
                                            name="productWeight"
                                            rules={[{ required: true, message: 'Vui lòng nhập khối lượng!' }]}
                                        >
                                            <Input placeholder="Khối lượng(kg)" type="number"/>
                                        </Form.Item>
                                        <Form.Item
                                            name="productNumber"
                                            rules={[{ required: true, message: 'Vui lòng số lượng!' }]}
                                        >
                                            <Input placeholder="Số lượng" type="number"/>
                                        </Form.Item>
                                    </div>
                                </div>
                            </Row>
                            <Row>
                                <span style={{ marginTop: "5px" }}>Tổng khối lượng</span>
                                <Form.Item
                                    name="totalProductWeight"
                                    style={{ marginLeft: "20px" }}
                                >
                                    <Input placeholder="Số lượng" type="number"/>
                                </Form.Item>
                            </Row>
                            <Row>
                                <span style={{ marginTop: "5px" }}>KL tính cước</span>
                                <div style={{ marginLeft: "20px", display: "flex" }}>
                                    <Form.Item
                                        name="productLong"
                                        rules={[{ required: true, message: 'Vui lòng nhập chiều dài!' }]}
                                        style={{ width: "100px" }}
                                    >
                                        <Input placeholder="Dài(cm)" />
                                    </Form.Item>
                                    <Form.Item
                                        name="productWide"
                                        rules={[{ required: true, message: 'Vui lòng nhập chiều rộng!' }]}
                                        style={{ width: "100px" }}
                                    >
                                        <Input placeholder="Rộng(cm)" />
                                    </Form.Item>
                                    <Form.Item
                                        name="productHigh"
                                        rules={[{ required: true, message: 'Vui lòng nhập chiều cao!' }]}
                                        style={{ width: "100px" }}
                                    >
                                        <Input placeholder="Cao(cm)" />
                                    </Form.Item>
                                </div>
                            </Row>
                            <Row>
                                <span style={{ marginTop: "5px" }}>Giá trị hàng</span>
                                <Form.Item
                                    name="productValue"
                                    rules={[{ required: true, message: 'Vui lòng nhập giá trị đơn hàng!' }]}
                                    style={{ marginLeft: "20px" }}
                                >
                                    <Input placeholder="0đ" />
                                </Form.Item>
                            </Row>
                            <Row>
                                <span style={{ marginTop: "5px" }}>Tổng tiền</span>
                                <Form.Item
                                    name="totalAmount"
                                    style={{ marginLeft: "20px" }}
                                >
                                    <Input placeholder="0đ" />
                                </Form.Item>
                            </Row>
                            <Row>
                                <span style={{ marginTop: "5px" }}>Ghi chú</span>
                                <Form.Item
                                    name="note"
                                    style={{ marginLeft: "20px" }}
                                >
                                    <Input placeholder="Nhập ghi chú" />
                                </Form.Item>
                            </Row>
                            <Row>
                                <span style={{ marginTop: "5px" }}>Mã đơn hàng</span>
                                <Form.Item
                                    name="codeOrder"
                                    style={{ marginLeft: "20px" }}
                                >
                                    <Input />
                                </Form.Item>
                            </Row>
                            <h3>Dịch vụ gia tăng</h3>
                            <Checkbox.Group style={{ width: '100%' }} >
                                <Row>
                                    <Col span={24}>
                                        <Checkbox value="A">Hàng nhỏ</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="B">Hàng dễ vỡ</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="C">Hàng giá trị cao ≥ 1,000,000đ</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="D">Thư tín, tài liệu</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="E">Hàng chất lỏng</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="E">Nông sản/ Thực phẩm khô</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="E">Hàng nguyên hộp</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="E">Hàng có HSD ngắn</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="E">Hàng có cạnh sắc nhọn</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="E">Hàng yêu cầu xếp đúng chiều</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Item
                            name="orderRegular"
                            // rules={[{ required: true, message: 'Vui lòng chọn!' }]}
                        >
                            <Checkbox>Tôi đã đọc hiểu và đồng ý với <a>Điều khoản</a> và quy định và <a>Chính sách bảo mật</a></Checkbox>
                        </Form.Item>

                    </Row>
                    <div>
                        <Form.Item style={{display:"flex",justifyContent: "space-around"}}>
                            <Button type="primary" htmlType="submit">
                                Lưu
                            </Button>
                        </Form.Item>
                    </div>

                </Form>
                <Modal title="Thêm địa chỉ" open={isModalOpen} footer="" onCancel={handleCancel}>
                    <Form
                        form={formAddress}
                        name="normal_order_address"
                        className="order-address-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinishModalAddress}
                    >
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="addressDetail"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết!' }]}
                                >
                                    <Input placeholder="Địa chỉ chi tiết (Tòa nhà/ Hẻm/ Đường)" onClick={showModal} />
                                </Form.Item>
                            </Col>
                            <Row style={{ width: "100%" }}>
                                <Col span={12}>
                                    <Form.Item
                                        name="street"
                                        rules={[{ required: true, message: 'Vui lòng nhập Đường/Ấp/Khu!' }]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Đường/Ấp/Khu"
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
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="warn"
                                        rules={[{ required: true, message: 'Vui lòng nhập Phường/Xã!' }]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Phường/Xã"
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
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="district"
                                        rules={[{ required: true, message: 'Vui lòng nhập Quận/Huyện!' }]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Quận/Huyện"
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
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="city"
                                        rules={[{ required: true, message: 'Vui lòng nhập Tỉnh/Thành phố!' }]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Tỉnh/Thành phố"
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
                                </Col>
                            </Row>
                            <Form.Item>
                                <Space style={{ textAlign: "center" }}>
                                    <Button type="primary" htmlType="submit">
                                        Xác nhận
                                    </Button>
                                    <Button htmlType="button" onClick={handleCancel}>
                                        Huỷ
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Row>
                    </Form>
                </Modal>
            </Card>
        </MyLayout>
    );
}
