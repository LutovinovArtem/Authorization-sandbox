import { Button } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import style from "./Authorization.module.css";
import { useNavigate, Link } from "react-router-dom";
import { getToken } from "../../API/getToken";
import { useForm } from "react-hook-form";

const Authorization = () => {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    getToken(values).then(({ data: { access } }) => {
      localStorage.setItem("token", access);
      navigate("/books");
      reset();
    });
  };

  const [passwordType, setPasswordType] = useState("password");
  const [toggleText, setToggleText] = useState("show");

  const togglePasswordType = () => {
    if (passwordType === "password") {
      setToggleText("hide");
      setPasswordType("text");
    } else {
      setToggleText("show");
      setPasswordType("password");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Авторизация</h1>

      <label>
        Логин:
        <div>
          <input
            {...register("username", {
              required: "Введите логин!",
              minLength: 1,
              maxLength: {
                value: 150,
                message: "Максимальное число символов 150.",
              },
              pattern: {
                value: /^[\w.@+-]+$/i,
                message: "Обнаружен недопустимый символ!",
              },
            })}
          />
        </div>
      </label>
      <div style={{ height: 20 }}>
        {" "}
        {errors.username && (
          <p style={{ color: "red" }}>
            {" "}
            {errors.username.message || "Error!"}{" "}
          </p>
        )}{" "}
      </div>

      <label>
        Пароль:
        <div>
          <input
            type={passwordType}
            {...register("password", {
              required: "Введите пароль!",
              minLength: 1,
              maxLength: {
                value: 128,
                message: "Максимальное число символов 128.",
              },
            })}
          />
          <button
            className={style.toggleButton}
            onClick={() => togglePasswordType()}
          >
            {toggleText}
          </button>
        </div>
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

      <div className={style.buttonWrapper}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!isValid}
          className={style.submit}
        >
          Авторизация
        </Button>

        <Link to="/register">
          <Button className={style.register}>
            Регистрация
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default Authorization;
