import {
  Image, Row, Col, Popover, Space, Badge, List,
  Avatar, Typography, Card, Switch, Flex, Segmented
} from 'antd';
import {
  SettingOutlined, EditOutlined, SmileTwoTone, StarTwoTone,
  BellFilled, LogoutOutlined, ThunderboltTwoTone, FireTwoTone
} from '@ant-design/icons';
import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContext";
import EditAccount from './Drawer/account';
import { myNotificationWithIcon } from '../helper/notification';
const { Meta } = Card;
const { Text, Title } = Typography;

const Profile = (props: any) => {
  const { setLoading } = useContext(ThemeContext);
  const [openAccount, setOpenAccount] = useState(false);
  const logout = () => {
    setLoading(true);
    myNotificationWithIcon("success", "Đăng xuất thành công!")
    localStorage.removeItem('persist:root');
    setTimeout(() => {
      window.location.replace('/login');
    }, 400);
  }
  const { dataUser } = props;
  const { kyc_fullname, username } = dataUser;
  return (
    <>
      <EditAccount open={openAccount} setOpenAccount={setOpenAccount} />
      <Card
        style={{ width: 300, padding: 0 }}
        bordered={false}
        cover={
          <Image
            // alt={shop_name}
            src="../assets/img/baobaoshop.jpg"
            preview={true}
            height={150}
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" onClick={() => setOpenAccount(true)} />,
          <LogoutOutlined onClick={logout} key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="../assets/img/avatar-baobao.jpg" />}
          title={kyc_fullname}
          description={username}
        />
      </Card>
    </>


  )
}


const checkIcon = (value: any) => {
  console.log("123123" + value);
  switch (value) {
    case "smile":
      return <SmileTwoTone style={{ fontSize: "1.5rem" }} />
    case "star":
      return <StarTwoTone twoToneColor="#FFFF00" style={{ fontSize: "1.5rem" }} />
    case "thunder":
      return <ThunderboltTwoTone twoToneColor="#FF0F63" style={{ fontSize: "1.5rem" }} />
    default:
      return <FireTwoTone style={{ fontSize: "1.5rem" }} />
  }
}
interface NotificationItem {
  _id: string;
  title: string;
  content: string;
  icon: string;
}

interface NotificationProps {
  notifications: NotificationItem[];
}

const Notification: React.FC<NotificationProps> = (props) => {
  const { notifications } = props
  return (
    <List
      style={{ width: 300, padding: 0 }}
      itemLayout="horizontal"
      dataSource={notifications}
      renderItem={(item, index) => (
        // <a key={item?._id}>
        <Card.Grid style={{ width: "100%" }} key={item?._id}>
          <List.Item className="focus-notification">
            <List.Item.Meta
              avatar={checkIcon(item?.icon)}
              title={<a href="https://ant.design">{item?.title}
                <div
                  style={{
                    borderRadius: '50%',
                    background: '#F24049',
                    width: '8px',
                    height: '8px',
                    float: 'right',
                  }}
                ></div>
              </a>}
              description={item?.content}
            />
          </List.Item>
        </Card.Grid>
        // </a>
      )}
    />

  )
}

export default function HeaderContent(props: any) {
  const { dataUser, isMobile,
    darkMode, setDarkMode, notifications } = props;
  const [visibleHeader, setVisibleHeader] = useState("")
  useEffect(() => {
    if (isMobile) { setVisibleHeader("none") }
  }, [isMobile])
  return (
    <Card style={{
      margin: "1rem 1rem 0 1rem",
      borderRadius: "10px",
      height: "100px",
      display: visibleHeader
    }} >
      <Row>
        <Col span={14}>
          <Space direction='vertical' size='small'>
            <Title level={4}>
              Xin chào {dataUser?.kyc_fullname} !
            </Title>
            <Text style={{ paddingTop: 0 }}>
              Chúc bạn một ngày tốt lành.
            </Text>
          </Space>
        </Col>
        <Col span={10}>
          <Flex style={{ height: "100%", float: "right" }} align='center'>
            <Space size='large' style={{ float: "right" }} >
              <Switch
                checkedChildren={'Dark'}
                unCheckedChildren={'Light'}
                onChange={setDarkMode}
              />
              <Segmented options={[
                { label: <Text strong>VI</Text>, value: 'VI' },
                { label: 'EN', value: 'EN', disabled: true },
              ]} />
              <Badge count={3}>
                <Popover
                  trigger="click"
                  placement="leftTop"
                  content={<Notification notifications={notifications} />}
                >
                  <BellFilled style={{ fontSize: '1.5rem' }} />
                </Popover>
              </Badge>
              <Popover content={<Profile dataUser={dataUser} />}
                placement="leftTop"
                trigger="click"
                id="profile-popover"
              >
                <Avatar src="../assets/img/avatar-baobao.jpg" />
              </Popover>
            </Space>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
}
