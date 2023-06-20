import * as React from "react";
import { Outlet } from "react-router-dom";
import { Col, Layout, Row, notification } from "antd";

const { Content } = Layout;

const contentStyle = {
  padding: "20px 25px",
  minHeight: "calc(100vh - 64px)",
};

const containerStyle = {
  maxWidth: 800,
  margin: "auto",
};

const AppLayout: React.FC = () => {
  const [, contextHolder] = notification.useNotification();

  return (
    <Layout className="layout">
      <Content style={contentStyle}>
        <div style={containerStyle}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Outlet />
            </Col>
          </Row>
        </div>
      </Content>

      {contextHolder}
    </Layout>
  );
};

export default AppLayout;
