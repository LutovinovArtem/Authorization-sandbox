import React from "react";
import { Button } from "antd";
import { deleteBook } from "../API/deleteBook";

export const DeleteButton = (props) => {
  const bookID = props.bookID;

  deleteBook();

  return (
    <Button type="primary" onClick={deleteBook}>
      Удалить
    </Button>
  );
};
