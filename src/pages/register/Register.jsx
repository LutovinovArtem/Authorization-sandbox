import { Button } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import style from "./register.module.css";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../API/registerUser";
import { useForm } from "react-hook-form";
import { AlertResponse } from "../../components/AlertResponse";

const Register = () => {
  // const navigate = useNavigate();

  const [response, setResponse] = useState();

  const onSubmit = (values) => {
    registerUser(values)
      .then((res) => setResponse(res.request.status + 25))
      .catch((error) => {
        if (error.response) {
          setResponse(error.response.status + 25);
        }
      });

    reset();
  };

  // const goToBack = () => {
  //   navigate("/");
  // };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Регистрация</h1>

      <label>
        Логин:
        <br />
        <input
          {...register("username", {
            required: "Введите логин!",
            minLength: 1,
            maxLength: {
              value: 150,
              message: "Максимальное число символов 150.",
            },
            pattern: {
              value: /^[\w.@+-]+$/,
              message: "Обнаружен недопустимый символ!",
            },
          })}
        />
        <br />
      </label>
      <div style={{ height: 20 }}>
        {" "}
        {errors.username && <p> {errors.username.message || "Error!"} </p>}{" "}
      </div>

      <label>
        Пароль:
        <br />
        <input
          {...register("password", {
            required: "Введите пароль!",
            minLength: 1,
            maxLength: {
              value: 128,
              message: "Максимальное число символов 128.",
            },
          })}
        />
        <br />
      </label>
      <div style={{ height: 20 }}>
        {" "}
        {errors.password && (
          <p style={{ color: "red" }}>
            {" "}
            {errors.password.message || "Error!"}{" "}
          </p>
        )}{" "}
      </div>

      <br />
      <div className={style.buttonWrapper}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!isValid}
          className={style.register}
        >
          Регистрация
        </Button>
        <Link to="/">
          <Button className={style.register}>Назад</Button>
        </Link>
      </div>
      <br />
      <AlertResponse response={response} />
    </form>
  );
};

export default Register;
