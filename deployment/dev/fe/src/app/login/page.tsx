"use client";
import theme_token from "@/theme/themeConfig";
import { GoogleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState, useEffect, useMemo } from "react";
import {
  Watermark, Button, Checkbox, ConfigProvider, Form,
  Input, Layout, Space, Image, Typography, Spin, Segmented
} from "antd";
import "./page.module.css";
import { useRouter, usePathname } from "next/navigation";
import { fetchListAuthenStart } from "@/lib/redux";
import { useDispatch, useSelector } from "react-redux";
import Register from "../components/Modal/register";
import { tokenSelector, fechAuthenSelector } from "@/lib/redux/slices/authenSlice/selector";
import { ThemeContext } from "../../context/ThemeContext"
import { myNotificationWithIcon } from "../helper/notification";

const { Text, Link } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const token = useSelector(tokenSelector);
  const fetchSelector = useSelector(fechAuthenSelector);
  const [loading, setLoading] = useState(fetchSelector);
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)
    if (token && pathname === "/login") {
      router.push('/home');
    } else {
      setLoading(false)
    }
  }, [token]);

  const onLoginSuccess = (message: any) => {
    myNotificationWithIcon('success', 'Đăng nhập thành công !')
    setTimeout(() => {
      router.push("/home", { scroll: false });
    }, 400);
  };

  const onLoginFailure = (message: any) => {
    myNotificationWithIcon('error', message.message);
  };

  const onFinish = (values: any) => {
    dispatch(fetchListAuthenStart({
      onSuccess: onLoginSuccess,
      onFailure: onLoginFailure,
      ...values
    }));
  };

  const showModal = () => {
    setOpen(true);
  };
  const preferences = useMemo(() => ({ loading, setLoading }), [setLoading]);

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

  return (
    <ThemeContext.Provider value={preferences}>
      <ConfigProvider theme={theme_token}>
        <Register isOpen={isOpen} setOpen={setOpen}></Register>
        <Watermark
          content="Universal Tranport"
          gap={[250, 250]}
        >
          <Spin spinning={loading} fullscreen indicator={
            <LoadingOutlined style={{
              fontSize: "2rem",
            }} spin />
          } />

          <Layout
            style={{
              height: "100vh",
              width: "100vw",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "rgb(251, 252, 254)",
            }}
          >
            <Segmented defaultValue={'EN'} options={[
              { label: 'VI', value: 'VI', disabled: true },
              { label: <Text strong>EN</Text>, value: 'EN' },
            ]} />
            <div style={{ marginBottom: "1rem" }}>
              <Image
                width={200}
                src="assets/img/LogoSvg.png"
                preview={false}
                style={{ marginBottom: "1rem" }}
              />
              <Text strong>Utrans Shop System</Text>
            </div>

            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
              >
                <Input placeholder="Please input Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }, { validator: validatePassword }]}
              >
                <Input.Password placeholder="Please input Password" />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>
              <Form.Item>
                <Space direction="vertical" size="middle">
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                  <Link >
                    Login With Gmail <GoogleOutlined />
                  </Link>
                  <div>
                    Or <a onClick={showModal} >register now!</a>
                  </div>
                </Space>
              </Form.Item>
            </Form>
          </Layout>
        </Watermark>
      </ConfigProvider >
    </ThemeContext.Provider>
  );
}
