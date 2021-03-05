/* eslint-disable no-debugger */
import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";
import { signUpApi } from "../../../api/user";
import "./RegisterForm.scss";

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });

  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
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

    if (type === "checkbox") {
      setFormValid({
        ...formValid,
        [name]: e.target.checked,
      });
    }
  };

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
  const register = async () => {
    const passwordvalue = inputs.password;
    const repeatPasswordValue = inputs.repeatPassword;
    const emailValue = inputs.email;
    const privacyValue = inputs.privacyPolicy;

    if (
      !emailValue ||
      !passwordvalue ||
      !repeatPasswordValue ||
      !privacyValue
    ) {
      notification["error"]({
        message: "All values are requeried",
        duration: 3,
      });
    } else {
      if (passwordvalue !== repeatPasswordValue) {
        notification["error"]({
          message: "Passwords have to be the same",
          duration: 3,
        });
      } else {
        try {
          const result = await signUpApi(inputs);
          if (result?.ok) {
            notification["success"]({
              message: result.msg,
              duration: 3,
            });
            resetForm();
          } else {
            notification["error"]({
              message: result.msg,
            });
          }
        } catch (err) {
          alert(err);
        }
      }
    }
  };

  const resetForm = () => {
    const inputsForm = document.getElementsByTagName("input");

    for (let i = 0; i < inputsForm.length; i++) {
      inputsForm[i].classList.remove("success");
      inputsForm[i].classList.remove("error");
    }
    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
    });

    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false,
    });
  };

  return (
    <Form className="register-form" onFinish={register} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="register-form__input"
          value={inputs.email}
          onChange={inputValidation}
        />
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="register-form__input"
          value={inputs.password}
          onChange={inputValidation}
        />
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          placeholder="Repeat Password"
          className="register-form__input"
          value={inputs.repeatPassword}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          checked={inputs.privacyPolicy}
          onChange={inputValidation}
        >
          <span>He leido y acepto la politica de la privacidad</span>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          <span>Create user</span>
        </Button>
      </Form.Item>
    </Form>
  );
}
