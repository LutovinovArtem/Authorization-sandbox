import { Button, Form, Input } from "antd";
import React from "react";

import { getToken } from "../../API/token";
import "antd/dist/antd.css";

import style from "./login.module.css";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    getToken(values);
    navigate("/main");
  };

  const linkToRegister = () => navigate("/register");
  

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={style.formWrapper}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <div className={style.buttonWraper}>
          <Button type="primary" htmlType="submit" className={style.submit}>
            Авторизация
          </Button>

          <Button className={style.register} onClick={linkToRegister}>Регистрация</Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Login;
