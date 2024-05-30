import {
    Input, Modal, Form, Cascader, Checkbox, Drawer,
    Select, AutoComplete, Button, Typography, Spin,
    Space
} from 'antd';

export default function OtpRegister(props: any) {
    return (
        <Modal
            // title="OTP Verification"
            // open={openModalOTP}
            // style={{ textAlign: "center" }}
            // footer={null}
            // closeIcon={null}
        >
            <Space direction='vertical' size='small'>
                {/* <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
                <Title level={3}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Title>
                <Button disabled={isvisibleButton}>Resend OTP</Button> */}
            </Space>
        </Modal>
    )
}