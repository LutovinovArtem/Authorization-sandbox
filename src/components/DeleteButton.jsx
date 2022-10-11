import React, { useEffect } from "react";
import { Button } from "antd";
import { instance } from "../API/axios";


export const DeleteButton = (props) => {
  const bookID = props.bookID;

  const deleteBook = () => {
    instance
      .delete(`books/${bookID}`)
      .then((response) => {
        if(response.status === 204) {props.setRequestData(new Date());}
        // console.log("response:", response);
      })
      .catch((error) => {
        console.log("ErrorBooks:", error);
      });
    };
    // {bookID}  для наглядной нумерации
    return (
      <Button type="primary" htmlType="submit" onClick={deleteBook}>
        Удалить {bookID}
      </Button>
    );
  
};
