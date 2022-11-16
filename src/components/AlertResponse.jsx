import React from "react";
import { updateMessage, updateType } from "../store/alertSlice";
import { Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";

export const AlertResponse = ({ response }) => {
  const dispatch = useDispatch();

  const { message } = useSelector((state) => state.message)
  const { type } = useSelector((state) => state.message)

  const alertMessageAndType = (messageText, typeText) => {
    dispatch(updateMessage(messageText));
    dispatch(updateType(typeText));
  }

  switch (response) {
    case 201:
      alertMessageAndType("Книга успешно добавлена!", "success");
      break;
    case 400:
      alertMessageAndType("Ошибка валидации!", "warning");
      break;
    case 500:
      alertMessageAndType("Ошибка со стороны сервера!", "error");
      break;
    case 204:
      alertMessageAndType("Книга успешно удалена!", "success");
      break;
    case 226: // 226 тк в получении захардкодил + 25 и не было пересечения с книгами // регистрация
      alertMessageAndType("Вы успешно зарегистрированы!", "success");
      break;
    case 425: // 425 тк в получении захардкодил + 25 и не было пересечения с книгами // регистрация
      alertMessageAndType("Такой пользователь уже существует!", "error");
      break;
    default:
      return null;
  }

  return (
    <div>
      {response && <Alert message={message} type={type} showIcon closable />}
    </div>
  );
};