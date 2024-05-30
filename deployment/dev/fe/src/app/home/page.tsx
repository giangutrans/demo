"use client";

import { Image, Layout, Row, Col, Card, Statistic, List, Space, Tag, Table, Result, Button, Typography, notification } from "antd";
import MyLayout from "../components/_layout";
import { ArrowDownOutlined, ArrowUpOutlined, SmileOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { UserInfoAuthnSelector } from "@/lib/redux/slices/authenSlice/selector";
import type { TableProps } from 'antd';
const { Text } = Typography;
export default function HomePage() {
  // const [data, setData] = useState([]);
  const [useDesktop, setDesktop] = useState("none");
  const [useMobile, setMobile] = useState("none");
  const dataUser = useSelector(UserInfoAuthnSelector);
  const { shops } = dataUser;
  const { kyc_identity_address, kyc_identity_id } = dataUser;
  const { shop_name, email, shop_level_id, phone_number, loyaty } = shops[0];

  const dataList = [
    {
      title: 'Tên shop',
      content: shop_name
    },
    {
      title: 'Email',
      content: email
    },
    {
      title: 'Số điện thoại',
      content: "(+84) " + phone_number
    },
    {
      title: 'Địa chỉ',
      content: kyc_identity_address
    },
    {
      title: 'Mã số thuế',
      content: kyc_identity_id
    },
    {
      title: 'Điều kiện ứng COD',
      content: 'Đang xét duyệt hồ sơ'
    },
    {
      title: 'Hạng',
      content: shop_level_id
    },
    {
      title: 'Thông tin chiết khấu',
      content: loyaty
    }
  ];

  useEffect(() => {
    switch (isMobile) {
      case true:
        setMobile("");
        break;

      default:
        setDesktop("")
        break;
    }
  }, [])

  interface DataType {
    key: string;
    name: string;
    age: number;
    phone: string;
    address: string;
    tags: string[];
  }

  const datatable: DataType[] = [
    {
      key: '1',
      name: 'Tây Ninh',
      age: 32,
      phone: "0392248000",
      address: '86/1, Đường 3/2 thành phố Tây Ninh',
      tags: ['Hoạt Động'],
    },
    {
      key: '2',
      name: 'Gò vấp',
      phone: "0392248111",
      age: 42,
      address: 'Lê Quang định, Gò vấp, Thành phố Hồ Chí Minh',
      tags: ['Đóng cửa'],
    },
    {
      key: '3',
      name: 'Thủ Đức',
      phone: "0392248222",
      age: 32,
      address: 'Ehomes Phú Hữu , Thành Phố Thủ đức.',
      tags: ['Đang chuyển địa điêm'],
    },
    {
      key: '4',
      name: 'Phú nhuận',
      phone: "0392248444",
      age: 32,
      address: 'Phan Xích Long , Thành Phố Hồ Chí Minh',
      tags: ['Hoạt Động'],
    },
    {
      key: '5',
      name: 'Bạc Liêu',
      phone: "0392248555",
      age: 200,
      address: 'Thành phố Bạc Liêu , BẠc Liêu',
      tags: ['Sắp Mở Cửa'],
    },
  ];

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Kho',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Sản Phẩm',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Địa điểm',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Trạng thái',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = 'geekblue';
            if (tag === 'Đóng cửa') {
              color = 'volcano';
            }
            if (tag === 'Hoạt Động') {
              color = 'green';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    }
  ];

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: 'Chức năng đang được phát triển.',
      description:
        'Đang làm đợi xíu bé ơi!',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  return (
    <MyLayout>
      {contextHolder}
      <Layout style={{ display: useDesktop }} >
        {/* ------------------------------------ */}
        <Layout style={{ flex: 1, flexDirection: 'row' }} >
          <Layout style={{ flex: 2 }}>
            <Image
              src="assets/img/banner.png"
              preview={false}
              style={{
                width: '100%',
                borderRadius: '10px'
              }}
            />
            <Row gutter={16} style={{ textAlign: "center", marginTop: "1rem" }}>
              <Col span={12} style={{ height: "100%" }} >
                <Card bordered={false}>
                  <Statistic
                    title="Đơn hàng PickUp"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12} >
                <Card bordered={false}>
                  <Statistic
                    title="Đơn hàng Return"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
          </Layout>
          <Layout style={{ flex: 1, paddingLeft: '1rem' }}>
            <Card style={{ height: "100%" }}>
              <List
                itemLayout="horizontal"
                dataSource={dataList}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      title={<a href="https://ant.design">{item.title}</a>}
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Layout>
        </Layout>

        <Layout style={{ flex: 1, flexDirection: 'row', paddingTop: '1rem' }}>
          <Layout style={{ flex: 2 }}>
            <Card style={{ height: "100%" }}>
              <Table columns={columns} dataSource={datatable}
                size="large"
                style={{ width: "100%", height: "100%" }} pagination={false}
              />
            </Card>
          </Layout>
          <Layout style={{ flex: 1, paddingLeft: '1rem' }}>
            <Card style={{ height: "100%" }}>
              <Result
                status="warning"
                title={<Text strong>Bạn có <Text type="warning"> 3 đơn hàng </Text> quá thời hạn bàn giao vận chuyển .</Text>}
                extra={
                  <Button type="primary" key="console" onClick={openNotification}>
                    Xem chi tiết
                  </Button>
                }
              />
            </Card>
          </Layout>
        </Layout>
        {/* ---------------------------------------- */}
      </Layout>

      <Layout style={{ display: useMobile }}>
        <Space direction="vertical" size="large">
          <Image
            src="assets/img/banner.png"
            preview={false}
            style={{
              width: '100%',
              borderRadius: '10px'
            }}
          />
          <Row gutter={16} style={{ textAlign: "center" }}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Đơn hàng PickUp"
                  value={11}
                  precision={1}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12} >
              <Card bordered={false}>
                <Statistic
                  title="Đơn hàng Return"
                  value={9}
                  precision={1}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
          <Card >
            <List
              itemLayout="horizontal"
              dataSource={dataList}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Space>
      </Layout>

    </MyLayout >
  );
}
