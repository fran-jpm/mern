import React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";

import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
  const { Content, Footer } = Layout;

  // eslint-disable-next-line react/prop-types
  const { routes } = props;

  return (
    <Layout>
      <h2>Menu Basic User</h2>
      <Layout>
        <Content>
          <LoadRoutes routes={routes} />
        </Content>
        <Footer>Fran Dev</Footer>
      </Layout>
    </Layout>
  );
}

// eslint-disable-next-line react/prop-types
function LoadRoutes({ routes = [] }) {
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
