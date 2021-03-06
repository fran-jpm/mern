import React from "react";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";
import Logo from "../../../assets/img/png/logo.png";
import RegisterForm from "../../../components/Admin/ResgiterForm";
import LogInForm from "../../../components/Admin/LogInForm";
import { getAccessToken } from "../../../api/auth";
import "./SignIn.scss";

export default function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  if (getAccessToken()) {
    return <Redirect to="/admin" />;
  }
  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img src={Logo} alt="Logo" />
        </h1>
        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span>Log In</span>} key="1">
              <LogInForm />
            </TabPane>
            <TabPane tab={<span>Sign In</span>} key="2">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
