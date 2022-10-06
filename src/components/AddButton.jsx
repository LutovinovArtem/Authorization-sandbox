import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";


export const AddButton = () => {
  const navigate = useNavigate();

  const linkAddBook = () => {
    navigate("/addBook");
  };

  return (
    <Button type="primary" htmlType="submit" onClick={linkAddBook}>
      + Добавить
    </Button>
  );
};
