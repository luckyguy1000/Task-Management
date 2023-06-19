import * as React from "react";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

export interface SigninData {
  email: string;
  password: string;
}

interface SigninFormProps {
  pending: boolean;
  onSubmit: (data: SigninData) => void;
}

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: 'Please input your ${label}!',
  types: {
    email: '${label} is not a valid email!',
  }
};
/* eslint-enable no-template-curly-in-string */

const SigninForm: React.FC<SigninFormProps> = ({ pending, onSubmit }) => (
  <Form name="signin" layout="vertical" onFinish={onSubmit} autoComplete="off" validateMessages={validateMessages}>
    <Title level={4} style={{ marginBottom: 30, textAlign: "center" }}>
      Sign In
    </Title>

    <Form.Item label="Email" name="email" rules={[{required: true, type:"email"},]}>
      <Input />
    </Form.Item>

    <Form.Item label="Password" name="password" rules={[{required: true},]}>
      <Input type="password" />
    </Form.Item>

    <div style={{ textAlign: "center" }}>
      <Link to="/signup">New to our site? Click here to sign up</Link>
    </div>

    <div style={{ textAlign: "center", margin: "15px 0" }}>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        shape="round"
        loading={pending}
      >
        {pending ? "Signing In" : "Sign In"}
      </Button>
    </div>
  </Form>
);

export default SigninForm;
