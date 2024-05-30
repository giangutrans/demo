import React from 'react';
import { Form, Input, Button, Modal, Row, Checkbox, Divider, Typography, Space } from 'antd';

const { Title, Text } = Typography;

interface FormValues {
    storage: string;
    name: string;
    phone: number;
    address: string;
    surburb: string;
    district: string;
    city: string;
    isActive: boolean;
}

const NewAddressForm: React.FC<{ open: boolean; onCancel: () => void; onSubmit: (values: FormValues) => void }> = ({ open, onCancel, onSubmit }) => {
    const [form] = Form.useForm();

    const onFinish = (values: FormValues) => {
        onSubmit(values);
        form.resetFields();
    };

    return (
        <Modal
            style={{ textAlign: "center" }}
            title="Tạo mới"
            open={open}
            onCancel={onCancel}
            footer={<>
                    <Button type="primary" htmlType="submit" >Xác nhận</Button>
                    <Button type="primary" onClick={onCancel}>Hủy</Button>
            </>
            }>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                style={{ maxWidth: 600, padding: "1rem" }}
            >
                <Form.Item label="Kho" name="storage" rules={[{ required: true, message: 'Vui lòng nhập vị trí kho!' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Họ và Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập đầy đủ họ tên!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoạt!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Số nhà, Tên đường" name="address" rules={[{ required: true, message: 'Vui lòng nhập số nhà và tên đường!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Khu Phố, Phường" name="surburb" rules={[{ required: true, message: 'Vui lòng nhập khu phố, phường!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Quận, Huyện" name="district" rules={[{ required: true, message: 'Vui lòng nhập quận, huyện!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Thành Phố" name="city" rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Hoạt Động" name="disabled" rules={[{ required: true, message: 'Vui lòng chọn trạng thái hoạt động!' }]} valuePropName="checked">
                    <Checkbox></Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default NewAddressForm;