import { Button, Form, Input } from "antd";
import React from "react";
import "antd/dist/antd.css";
import style from "./register.module.css";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../API/register";

const Register = () => {
  const navigate = useNavigate();

//   const registerStatus = localStorage.getItem("registerStatus");

  const onFinish = (values) => {
    
    const registerStatus = setTimeout(registerUser(values), 1000)

    if (registerStatus === "201") {
      navigate("/RegisterAlert");
    }
    //   localStorage.removeItem("registerStatus");
     //else if (registerStatus === "A user with that username already exists.") {
    //   navigate("/оповещение о уже зареганом пользователе");
    //   console.log("Status:", registerStatus);
    // 
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
      //   initialValues={{
      //     remember: true,
      //   }}
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
        <Button type="primary" htmlType="submit" className={style.register}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
