import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

const baseURL = "http://192.168.10.104/token";

const Authorization = () => {
  const instance = axios.create({
    baseURL: "http://192.168.10.104/",
    timeout: 1000,
  });

  const onFinish = (values) => {
    console.log("Success:", values);

    instance.post(`token/`, values).then((response) => {
      console.log("Response:", response.data);
      localStorage.setItem("responseSave", JSON.stringify(response));
    });
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Authorization;
