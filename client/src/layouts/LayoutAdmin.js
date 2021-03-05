import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutAdmin.scss";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn";
import useAuth from "../hooks/useAuth";

export default function LayoutAdmin(props) {
  const { Header, Content, Footer } = Layout;
  // eslint-disable-next-line react/prop-types
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { user, isLoading } = useAuth();

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout className="layout-admin">
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            <LoadRouters routes={routes} />
          </Content>
          <Footer className="layout-admin__footer">Fran Dev</Footer>
        </Layout>
      </Layout>
    );
  }

  return null;
}

// eslint-disable-next-line react/prop-types
function LoadRouters({ routes = [] }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
