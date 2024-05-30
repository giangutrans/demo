import {
    Input, Modal, Form, Cascader, Checkbox, Drawer,
    Select, AutoComplete, Button, Typography, Spin, notification
} from 'antd';

const { Option } = Select;

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="86">+84</Option>
            <Option value="87">+85</Option>
        </Select>
    </Form.Item>
);


export {
    prefixSelector,
}