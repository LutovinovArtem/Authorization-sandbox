import React from "react";
import { Alert } from "antd";

const AlertAddBook = (props) => {
  let message = "";
  let type = "";

  const response = props.response;

  if (response === 201) {
    message = "Книга успешно добавлена!";
    type = "success";
  } else if (response === 400) {
    message = "Ошибка валидации!";
    type = "warning";
  } else if (response === 500) {
    message = "Ошибка со стороны сервера!";
    type = "error";
  }

  return (
    <div >
      {props.response && (
        <Alert message={message} type={type} showIcon closable />
      )}
    </div>
  );
};

export default AlertAddBook;
