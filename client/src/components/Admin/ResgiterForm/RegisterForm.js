import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./RegisterForm.scss";

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    email: "fran@prueba.es",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });

  const changeForm = (e) => {
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };
  const register = (e) => {
    e.preventDefault();
  };

  return (
    <Form className="register-form" onSubmit={register} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="email"
          name="email"
          placeholder="Email"
          className="register-form__input"
          value={inputs.email}
        />
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="password"
          name="password"
          placeholder="Password"
          className="register-form__input"
          value={inputs.password}
        />
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
          className="register-form__input"
          value={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox name="privacyPolicy" checked={inputs.privacyPolicy}>
          <span>He leido y acepto la politica de la privacidad</span>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          disabled="false"
          htmlType="submit"
          className="register-form__button"
        >
          <span>Create user</span>
        </Button>
      </Form.Item>
    </Form>
  );
}
