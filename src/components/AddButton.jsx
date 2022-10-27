import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const AddButton = () => {
  const navigate = useNavigate();

  const goToAddBook = () => {
    navigate("/addBook");
  };
 
  return (
    <Button type="primary" onClick={goToAddBook}>
      + Добавить
    </Button>
  );
};
