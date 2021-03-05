/* eslint-disable no-unused-vars */
import React from "react";
import FranLogo from "../../../assets/img/png/logo.png";
import { logout } from "../../../api/auth";
import "./MenuTop.scss";
import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

export default function MenuTop(props) {
  // eslint-disable-next-line react/prop-types
  const { menuCollapsed, setMenuCollapsed } = props;

  const logOutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={FranLogo}
          alt="Fran Dev"
          onClick={() => setMenuCollapsed(!menuCollapsed)}
        />
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={logOutUser}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
