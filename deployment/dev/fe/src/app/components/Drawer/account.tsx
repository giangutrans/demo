import {
    Button, Col, Cascader, Drawer, Form, Divider,
    Input, Row, Select, Space, AutoComplete, Typography
} from 'antd';
import { useState } from 'react';
import type { CascaderProps } from 'antd';
const { Option } = Select;
const { Text, Title } = Typography;

const EditAccount = (props: any) => {
    const { open, setOpenAccount } = props
    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([])

    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));

    const onWebsiteChange = (value: string) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };

    interface DataNodeType {
        value: string;
        label: string;
        children?: DataNodeType[];
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+84</Option>
                <Option value="87">+85</Option>
            </Select>
        </Form.Item>
    );

    const validatePhoneNumber = (_: any, value: any) => {
        // Regular expression for Vietnamese phone numbers
        const phoneNumberRegex = /^[0-9]{9}$/;
        if (!phoneNumberRegex.test(value)) {
            return Promise.reject(new Error('Please enter a valid Vietnamese phone number'));
        }
        return Promise.resolve();
    };

    const onChangeCascader = (value: (string | number)[], selectedOptions: any) => {
        // setIdAddress(selectedOptions)
    };

    const validatePassportNumber = (_: any, value: any) => {
        // Regular expression for validating passport numbers (adjust as needed)
        const passportNumberRegex = /^[A-Za-z0-9]{6,9}$/;

        if (!passportNumberRegex.test(value)) {
            return Promise.reject(new Error('Please enter a valid passport number'));
        }
        return Promise.resolve();
    };

    const residences: CascaderProps<DataNodeType>['options'] = [
        {
            value: '01',
            label: 'Tây ninh',
            children: [
                {
                    value: '12',
                    label: 'TP Tây Ninh',
                    children: [
                        {
                            value: '13',
                            label: 'khu phố 6 phường 3',
                        },
                    ],
                },
            ],
        },
        {
            value: '02',
            label: 'Hồ Chí minh',
            children: [
                {
                    value: '21',
                    label: 'Bình thạnh',
                    children: [
                        {
                            value: '22',
                            label: 'Phan Xích Long',
                        },
                    ],
                },
            ],
        },
    ];

    const onClose = () => {
        setOpenAccount(false);
    };

    return (
        <Drawer
            title="Thông tin tài khoản"
            width={720}
            onClose={onClose}
            open={open}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
            extra={
                <Space>
                    <Button onClick={onClose}>Hủy</Button>
                    <Button onClick={onClose} type="primary">
                        Cập nhật
                    </Button>
                </Space>
            }
        >
            <Form layout="vertical">
                <Title level={5}>
                    Cá nhân
                </Title>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="username"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input placeholder="Email"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="kyc_fullname"
                            label="Họ và tên"
                            tooltip="What do you want others to call you?"
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                        >
                            <Input placeholder="Họ và tên"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="kyc_identity_address"
                            label="Địa chỉ"
                            rules={[
                                { type: 'array', required: true, message: 'Please select your habitual residence!' },
                            ]}
                        >
                            <Cascader options={residences} onChange={onChangeCascader} placeholder="Vui lòng chọn"/>
                        </Form.Item >
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="phone_number"
                            label="Điện thoại"
                            rules={[
                                { required: true, message: 'Please input your phone number!' },
                                { validator: validatePhoneNumber }
                            ]}
                        >
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Số điện thoại"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="kyc_identity_id"
                            label="Mã số thuế/ CCCD"
                            rules={[
                                { required: true, message: 'Please input your tax code/ passport!' },
                                { validator: validatePassportNumber }
                            ]}
                        >
                            <Input style={{ width: '100%' }} placeholder="Mã số thuế"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="website"
                            label="Website"
                            rules={[{ required: true, message: 'Please input website!' }]}
                        >
                            <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                                <Input />
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="industry_type"
                            label="Ngành hàng kinh doanh"
                            rules={[{ required: true, message: 'Please select gender!' }]}
                        >
                            <Select placeholder="Vui lòng chọn">
                                <Option value="quanao">Quần áo</Option>
                                <Option value="dientu">Điện tử</Option>
                                <Option value="nuochoa">Nước hoa</Option>
                                <Option value="khac">Khác</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="gender"
                            label="Giới tính"
                            rules={[{ required: true, message: 'Please select gender!' }]}
                        >
                            <Select placeholder="Vui lòng chọn">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Title level={5}>
                    Cửa hàng
                </Title>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="shop_name"
                            label="Tên cửa hàng"
                            rules={[{ required: true, message: 'Please input your shop name!' }]}
                        >
                            <Input style={{ width: '100%' }} placeholder="Tên cửa hàng"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Title level={5}>
                    Thanh toán
                </Title>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="gender"
                            label="Ngân hàng"
                            rules={[{ required: true, message: 'Vui lòng chọn ngân hàng!' }]}
                        >
                            <Select placeholder="Ngân hàng">
                                <Option value="male">Tiên phong</Option>
                                <Option value="female">Techcom</Option>
                                <Option value="female">OCB</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="shop_name"
                            label="Chi nhánh ngân hàng"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input style={{ width: '100%' }} placeholder="Chi nhánh ngân hàng" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="shop_name"
                            label="Tên tài khoản"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input style={{ width: '100%' }} placeholder="Tên tài khoản" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="shop_name"
                            label="Số tài khoản"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input style={{ width: '100%' }} placeholder="Số tài khoản" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )

}
export default EditAccount;