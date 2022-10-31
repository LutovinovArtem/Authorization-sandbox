import { Button } from "antd";
import React from "react";
import "antd/dist/antd.css";
import style from "./Authorization.module.css";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../API/getToken";
import { instanceSetHeader } from "../../API/axios";

import { useForm } from "react-hook-form";

const Authorization = () => {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    getToken(values).then(({ data: { access } }) => {
      localStorage.setItem("token", access);
      instanceSetHeader("Authorization", `Bearer ${access}`);
      navigate("/books");
      reset();
    });
  };

  const goToRegister = () => navigate("/register");

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
      <h1>Авторизация</h1>

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
        {errors.password && <p> {errors.password.message || "Error!"} </p>}{" "}
      </div>

      <br />
      <div className={style.buttonWrapper}>
        <Button type="primary" htmlType="submit" disabled={!isValid} className={style.submit}>
          Авторизация
        </Button>

        <Button className={style.register} onClick={goToRegister}>
          Регистрация
        </Button>
      </div>
    </form>
  );
};

export default Authorization;
