import { Button, Checkbox, Form, Input } from "antd";
import React from "react";

import { getToken } from "../API/token";
import "antd/dist/antd.css";

import style from "./login.module.css";
import App from "../App";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
    getToken(values);
  };

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
      className={style.FormWrapper}
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
            Submit
          </Button>

          <Button type="primary" htmlType="submit" className={style.authorization}>
            Authorization
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Login;
