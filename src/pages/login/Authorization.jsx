import { Button, Form, Input } from "antd";
import React from "react";
import { getToken } from "../../API/token";
import "antd/dist/antd.css";
import style from "./Authorization.module.css";
import { useNavigate } from "react-router-dom";

const Authorization = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    getToken(values);
    navigate("/books");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const goToRegister = () => navigate("/register");
  
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
        label="Логин"
        name="username"
        rules={[
          {
            required: true,
            message: "Введите логин!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Введите пароль!",
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
        <div className={style.buttonWrapper}>
          <Button type="primary" htmlType="submit" className={style.submit}>
            Авторизация
          </Button>

          <Button className={style.register} onClick={goToRegister}>
            Регистрация
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Authorization;
