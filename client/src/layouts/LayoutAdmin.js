import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { Header, Content, Footer } = Layout;
  // eslint-disable-next-line react/prop-types
  const { routes } = props;

  return (
    <Layout>
      <h2>Menu Sider Admin</h2>
      <Layout>
        <Header>Header...</Header>
        <Content>
          <LoadRouters routes={routes} />
        </Content>
        <Footer>Fran Dev</Footer>
      </Layout>
    </Layout>
  );
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
