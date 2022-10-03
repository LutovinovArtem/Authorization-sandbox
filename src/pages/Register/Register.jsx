import { Button, Form, Input, Alert } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import style from "./register.module.css";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../API/register";

const Register = () => {
  const navigate = useNavigate();

  const [registerResponseCode, setRegisterResponseCode] = useState(null); // использую состояния 

  const onFinish = (values) => {
    registerUser(values).then((status) => { // ему вообще есть дело откуда брать этот статус? Респонс, кэтч? 
      setRegisterResponseCode(status); 
    });
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const linkBack = () => {
    navigate("/");
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={style.formWrapper}
    >
      
      {registerResponseCode && registerResponseCode === 201 && (
        <Alert
          message="Вы успешно загеристрировались!"
          type="success"
          showIcon
          closable
        />
      )}
      
      {registerResponseCode && registerResponseCode === 400 && (
        <Alert
          message="Такой пользователь уже зарегистрирован!"
          type="warning"
          showIcon
          closable
        />
      )}

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
          <Button type="primary" htmlType="submit" className={style.register}>
            Регистрация
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className={style.register}
            onClick={linkBack}
          >
            Назад
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Register;
