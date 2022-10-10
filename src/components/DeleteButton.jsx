import React from "react";
import { Button } from "antd";
import { instance } from "../API/axios";

export const DeleteButton = (props) => {
  const bookID = props.bookID;
  console.log("bookID:", bookID);

  const deleteBook = () => {
    instance
      .delete(`books`, bookID) // как-то передать уникальный id
      .then((response) => {
        console.log("response:", response);
      })
      .catch((error) => {
        console.log("ErrorBooks:", error);
      });
    };
    return (
      <Button type="primary" htmlType="submit" onClick={deleteBook}>
        Удалить
      </Button>
    );
  
};
