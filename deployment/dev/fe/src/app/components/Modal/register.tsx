"use client";
import { useState, useContext, useEffect } from 'react';
import {
    Input, Modal, Form, Cascader, Checkbox, Drawer,
    Select, AutoComplete, Button, Typography, Spin,
    Space
} from 'antd';
import type { CascaderProps } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { fetchInsertUserStart, fetchVerifyOTPStart } from "@/lib/redux";
import type { GetProp } from 'antd';
import { ThemeContext } from "../../../context/ThemeContext"
import { fetchInsertUserSelector } from '@/lib/redux/slices/userSlice/selectors';
import { myNotificationWithIcon } from '@/app/helper/notification';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

export default function Register(props: any) {
    const { isOpen, setOpen } = props;
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [isvisibleButton, setIsvisibleButton] = useState(true);
    const [openDraw, setOpenDraw] = useState(false);
    const [openModalOTP, setModalOTP] = useState(false);
    const [listIdAddress, setIdAddress] = useState({});
    const [emailVerify, setEmailVerify] = useState("");
    const [form] = Form.useForm();
    const { setLoading } = useContext(ThemeContext);
    const loading = useSelector(fetchInsertUserSelector)
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const userRegister = searchParams.get('emailVerify');

    interface DataNodeType {
        value: string;
        label: string;
        children?: DataNodeType[];
    }

    useEffect(() => {
        if (userRegister) {
            setEmailVerify(userRegister);
            setModalOTP(true);
        }
    }, [userRegister]);

    useEffect(() => {
        setLoading(loading)
    }, [loading]);

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
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

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+84</Option>
                <Option value="87">+85</Option>
            </Select>
        </Form.Item>
    );

    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

    const onWebsiteChange = (value: string) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));

    const appendQueryParam = (params: any) => {
        const newQuery = { ...params };
        const queryString = new URLSearchParams(newQuery).toString();
        router.push("/login?" + queryString);
    };

    const onLoginSuccess = (response: any) => {
        const { message, email } = response
        myNotificationWithIcon('success', message);
        appendQueryParam({ emailVerify: email })
        setModalOTP(true);
        setMinutes(5);
        setSeconds(59);
        setOpen(false);
    };
    const onLoginFailure = (response: any) => {
        myNotificationWithIcon('error', response.message);
    };

    const onFinish = (values: any) => {
        values = {
            ...values,
            location_pickup: listIdAddress
        }
        dispatch(fetchInsertUserStart({
            onSuccess: onLoginSuccess,
            onFailure: onLoginFailure,
            ...values
        }));
    };

    const validatePhoneNumber = (_: any, value: any) => {
        // Regular expression for Vietnamese phone numbers
        const phoneNumberRegex = /^[0-9]{9}$/;
        if (!phoneNumberRegex.test(value)) {
            return Promise.reject(new Error('Please enter a valid Vietnamese phone number'));
        }
        return Promise.resolve();
    };

    const validatePassportNumber = (_: any, value: any) => {
        // Regular expression for validating passport numbers (adjust as needed)
        const passportNumberRegex = /^[A-Za-z0-9]{6,9}$/;

        if (!passportNumberRegex.test(value)) {
            return Promise.reject(new Error('Please enter a valid passport number'));
        }
        return Promise.resolve();
    };

    const validatePassword = (_: any, value: any) => {
        const upperCaseRegex = /[A-Z]/;
        const lowerCaseRegex = /[a-z]/;
        const digitRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if (!upperCaseRegex.test(value)) {
            return Promise.reject(new Error('Password must contain at least one uppercase letter'));
        }
        if (!lowerCaseRegex.test(value)) {
            return Promise.reject(new Error('Password must contain at least one lowercase letter'));
        }
        if (!digitRegex.test(value)) {
            return Promise.reject(new Error('Password must contain at least one digit'));
        }
        if (!specialCharRegex.test(value)) {
            return Promise.reject(new Error('Password must contain at least one special character'));
        }
        if (value.length < 8) {
            return Promise.reject(new Error('Password must be at least 8 characters long'));
        }
        return Promise.resolve();
    };

    const showDrawer = () => {
        setOpenDraw(true);
    };

    const onClose = () => {
        setOpenDraw(false);
    };

    const onChangeCascader = (value: (string | number)[], selectedOptions: any) => {
        setIdAddress(selectedOptions)
    };

    const onOtpSuccess = (message: any) => {
        router.push("/login");
        myNotificationWithIcon('success', 'Created Success!')
        setModalOTP(false);
    };
    const onOtpFailure = (message: any) => {
        myNotificationWithIcon('error', message.message);
    };

    const dispatchOTP = (values: any) => {
        dispatch(fetchVerifyOTPStart({
            onSuccess: onOtpSuccess,
            onFailure: onOtpFailure,
            ...values
        }));
    };

    const onChange: GetProp<typeof Input.OTP, 'onChange'> = (text) => {
        const values = {
            email: emailVerify,
            otp: text
        }
        dispatchOTP(values)
    };

    const sharedProps = {
        onChange,
    };


    useEffect(() => {
        const countdown = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(countdown);
                    // Time's up, you can perform any action here when the countdown reaches zero
                    setIsvisibleButton(false)
                } else {
                    setMinutes(prevMinutes => prevMinutes - 1);
                    setSeconds(59);
                }
            } else {
                setSeconds(prevSeconds => prevSeconds - 1);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [minutes, seconds]);

    return (
        <>
            <Modal title={<div style={{ textAlign: "center" }}>Register</div>}
                open={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                centered={true}
            >

                <Drawer title="User Agreement" open={openDraw} onClose={onClose} >
                    <Typography>
                        <Title level={5}>1. Thông tin và dữ liệu chính xác:</Title>
                        <Paragraph>
                            Chúng tôi cam kết cung cấp thông tin và dữ liệu chính xác và đầy đủ khi sử dụng Dịch vụ UTrans Express, bao gồm thông tin về người gửi, người nhận, địa chỉ giao hàng, và các thông tin khác liên quan đến quá trình vận chuyển.
                        </Paragraph>
                        <Title level={5}>2. Tuân thủ quy định và quy trình của UTrans Express::</Title>
                        <Paragraph>
                            Chúng tôi cam kết tuân thủ mọi quy định, quy trình và hướng dẫn của UTrans Express trong quá trình sử dụng Dịch vụ, bao gồm các quy định về đóng gói hàng hóa, thời gian giao hàng, và quy trình xử lý khi có sự cố.
                        </Paragraph>
                        <Title level={5}>3. Bảo mật thông tin:</Title>
                        <Paragraph>
                            Chúng tôi hiểu và đồng ý rằng UTrans Express sẽ sử dụng thông tin của chúng tôi chỉ cho mục đích vận chuyển hàng hóa và sẽ không chia sẻ thông tin này với bất kỳ bên thứ ba nào mà không có sự đồng ý của chúng tôi.
                        </Paragraph>
                        <Title level={5}>4. Chấp nhận các phí và chi phí:</Title>
                        <Paragraph>
                            Chúng tôi cam kết chấp nhận các phí và chi phí liên quan đến việc sử dụng Dịch vụ UTrans Express, bao gồm các khoản phí vận chuyển, phí bảo hiểm và các chi phí khác có thể phát sinh trong quá trình giao hàng.
                        </Paragraph>
                        <Paragraph>
                            <Text strong>
                                Chúng tôi cam kết cung cấp phản hồi và góp ý chân thành về chất lượng và trải nghiệm sử dụng Dịch vụ UTrans Express, nhằm hỗ trợ UTrans Express cải thiện và nâng cao chất lượng dịch vụ.
                                Bằng việc sử dụng Dịch vụ UTrans Express, chúng tôi cam kết tuân thủ các điều khoản và điều kiện được nêu trên và đồng ý chịu trách nhiệm về mọi hành động và thông tin được cung cấp trong quá trình sử dụng Dịch vụ.
                            </Text>
                        </Paragraph>
                    </Typography>
                </Drawer>

                <Spin spinning={loading}>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                    >
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
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                { validator: validatePassword }
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="kyc_fullname"
                            label="Full Name"
                            tooltip="What do you want others to call you?"
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="kyc_identity_address"
                            label="Address"
                            rules={[
                                { type: 'array', required: true, message: 'Please select your habitual residence!' },
                            ]}
                        >
                            <Cascader options={residences} onChange={onChangeCascader} />
                        </Form.Item>

                        <Form.Item
                            name="phone_number"
                            label="Phone Number"
                            rules={[
                                { required: true, message: 'Please input your phone number!' },
                                { validator: validatePhoneNumber }
                            ]}
                        >
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="kyc_identity_id"
                            label="Tax code/ Passport"
                            rules={[
                                { required: true, message: 'Please input your tax code/ passport!' },
                                { validator: validatePassportNumber }
                            ]}
                        >
                            <Input style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="shop_name"
                            label="Shop Name"
                            rules={[{ required: true, message: 'Please input your shop name!' }]}
                        >
                            <Input style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="website"
                            label="Website"
                            rules={[{ required: true, message: 'Please input website!' }]}
                        >
                            <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                                <Input />
                            </AutoComplete>
                        </Form.Item>

                        <Form.Item
                            name="industry_type"
                            label="Type Of Business"
                            rules={[{ required: true, message: 'Please select gender!' }]}
                        >
                            <Select placeholder="select your gender">
                                <Option value="quanao">Quần áo</Option>
                                <Option value="dientu">Điện tử</Option>
                                <Option value="nuochoa">Nước hoa</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true, message: 'Please select gender!' }]}
                        >
                            <Select placeholder="select your gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}
                            {...tailFormItemLayout}
                        >
                            <Checkbox>
                                I have read the <a onClick={showDrawer}>agreement</a>
                            </Checkbox>
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>

            </Modal>
            <Modal
                title="OTP Verification"
                open={openModalOTP}
                style={{ textAlign: "center" }}
                footer={null}
                closeIcon={null}
            >
                <Space direction='vertical' size='small'>
                    <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
                    <Title level={3}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Title>
                    <Button disabled={isvisibleButton}>Resend OTP</Button>
                </Space>
            </Modal>
        </>
    );
};