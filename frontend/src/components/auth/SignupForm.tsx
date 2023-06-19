import * as React from "react";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
}

interface SignupFormProps {
  pending: boolean;
  onSubmit: (data: SignupData) => void;
}

const rules = {
  email: [{ required: true, message: "Please input your email" }],
  password: [{ required: true, message: "Please input your password" }],
  fullName: [{ required: true, message: "Please input your full name" }],
};

const SignupForm: React.FC<SignupFormProps> = ({ pending, onSubmit }) => (
  <Form name="signup" layout="vertical" onFinish={onSubmit} autoComplete="off">
    <Title level={4} style={{ marginBottom: 30, textAlign: "center" }}>
      Create Your Account
    </Title>

    <Form.Item label="Email" name="email" rules={rules.email}>
      <Input />
    </Form.Item>

    <Form.Item label="Password" name="password" rules={rules.password}>
      <Input type="password" />
    </Form.Item>

    <Form.Item label="Full Name" name="fullName" rules={rules.fullName}>
      <Input />
    </Form.Item>

    <div style={{ textAlign: "center" }}>
      <Link to="/signin">Already have an account? Click here to sign in</Link>
    </div>

    <div style={{ textAlign: "center", margin: "15px 0" }}>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        shape="round"
        loading={pending}
      >
        {pending ? "Signing Up" : "Sign Up"}
      </Button>
    </div>
  </Form>
);

export default SignupForm;
