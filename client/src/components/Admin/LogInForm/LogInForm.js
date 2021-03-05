/* eslint-disable no-debugger */
import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";
import { signInApi } from "../../../api/user";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { ACCESS_TOKEN, RESFRESH_TOKEN } from "../../../utils/constants";
import "./LogInForm.scss";

export default function LogInForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
  });

  const inputValidation = (e) => {
    const { name, type } = e.target;

    if (type === "email") {
      setFormValid({
        ...formValid,
        [name]: emailValidation(e.target),
      });
    }
    if (type === "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target),
      });
    }
  };

  const changeForm = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const login = async () => {
    const email = inputs.email;
    const password = inputs.password;

    if (!email || !password) {
      notification["error"]({
        message: "Email or password empty",
      });
    } else {
      try {
        const res = await signInApi(inputs);

        if (res.message) {
          notification["error"]({
            message: res.message,
          });
        } else {
          const { accessToken, refreshToken } = res;

          localStorage.setItem(ACCESS_TOKEN, accessToken);
          localStorage.setItem(RESFRESH_TOKEN, refreshToken);

          window.location.href = "/admin";
        }
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <Form className="login-form" onChange={changeForm} onFinish={login}>
      <Form.Item>
        <div className="content-item">
          <UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="login-form__input"
            value={inputs.email}
            onChange={inputValidation}
          />
        </div>
        <div className="content-item">
          <LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="login-form__input"
            value={inputs.password}
            onChange={inputValidation}
          />
        </div>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form__button">
          <span>Log In</span>
        </Button>
      </Form.Item>
    </Form>
  );
}
