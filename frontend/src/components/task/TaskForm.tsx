import * as React from "react";
import { Button, Form, Input, DatePicker, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export interface TaskData {
  title: string;
  detail: string;
  scheduled_date: any;
}

interface TaskFormProps {
  pending: boolean;
  onSubmit: (data: TaskData) => void;
  action: string;
  task?: TaskData;
}

const rules = {
  title: [{ required: true, message: "Please input your task title" }],
  detail: [{ required: true, message: "Please input your task detail" }],
  scheduled_date: [
    { required: true, message: "Please input your task scheduled date" },
  ],
};

const TaskForm: React.FC<TaskFormProps> = ({
  pending,
  onSubmit,
  action,
  task,
}) => {
  const nagivate = useNavigate();
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue(task);
  }, [form, task]);

  return (
    <Form
      form={form}
      name="signup"
      layout="vertical"
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Title level={4} style={{ marginBottom: 30, textAlign: "center" }}>
        {action} Task
      </Title>

      <Form.Item label="Title" name="title" rules={rules.title}>
        <Input />
      </Form.Item>

      <Form.Item label="Detail" name="detail" rules={rules.detail}>
        <Input.TextArea
          rows={4}
          placeholder="maxLength is 2000"
          maxLength={2000}
        />
      </Form.Item>

      <Form.Item
        label="Scheduled Date"
        name="scheduled_date"
        rules={rules.scheduled_date}
      >
        <DatePicker showTime style={{ width: "100%" }} />
      </Form.Item>

      <div style={{ textAlign: "center", margin: "15px 0" }}>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            shape="round"
            loading={pending}
          >
            {pending ? "..." : action}
          </Button>

          <Button
            type="default"
            size="large"
            shape="round"
            onClick={() => nagivate(-1)}
          >
            Back
          </Button>
        </Space>
      </div>
    </Form>
  );
};

export default TaskForm;
