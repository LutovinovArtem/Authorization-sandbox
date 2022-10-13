import React from "react";
import { Button } from "antd";
import { deleteBook } from "../API/instanceBook";

export const DeleteButton = (props) => {
  const bookID = props.bookID;

  deleteBook();

  return (
    <Button danger type="primary" onClick={deleteBook}>
      Удалить
    </Button>
  );
};
