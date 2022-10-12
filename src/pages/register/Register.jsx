import { Button, Form, Input } from "antd"; //message
import "antd/dist/antd.css";
import React from "react";
import style from "./register.module.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../API/register";

const Register = () => {
  const navigate = useNavigate();

  // const [registerResponseCode, setRegisterResponseCode] = useState(null);

  const onFinish = (values) => {
    registerUser(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const goToBack = () => {
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
      {/* <div className={style.alert}>
        {registerResponseCode === 201 && (
          <Alert
            message="Вы успешно зарегистрировались!"
            type="success"
            showIcon
            closable
          />
        )}

        {registerResponseCode === 400 && (
          <Alert
            message="Такой пользователь уже зарегистрирован!"
            type="warning"
            showIcon
            closable
          />
        )}
      </div> */}

      {/* {registerResponseCode === 201 &&
        message.success("Вы успешно зарегистрировались!")}

      {registerResponseCode === 400 &&
        message.warning("Такой пользователь уже зарегистрирован!")} */}

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
          <Button type="primary" htmlType="submit" className={style.register}>
            Регистрация
          </Button>
          <Button
            className={style.register}
            onClick={goToBack}
          >
            Назад
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Register;
