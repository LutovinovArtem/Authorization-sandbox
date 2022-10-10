import React, { useState, useEffect } from "react";
import style from "./books.module.css";
import "antd/dist/antd.css";
import { Table } from "antd";
import { instance } from "../../API/axios";
import { AddButton } from "../../components/AddButton";
import { DeleteButton } from "../../components/DeleteButton";
const Books = () => {
  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    instance
      .get(`books`)
      .then((response) => {
        const data = response.data;
        const books = data.map((book, index) => ({
          title: book.title,
          genres: book.genres.toString(),
          author: book.author.Name,
          rub_price: book.rub_price,
          actions: <DeleteButton bookID={index+1} />,
        }));

        return setDataSource(books);
      })
      .catch((error) => {
        console.log("ErrorBooks:", error);
      });
  }, []);


  // параметры таблицы

  // валюты нет, т.к. она автоматически конвертируется в рубли на сервере. По крайней мере, так заявлено

  const columns = [
    // в документации сказано, что key не нужен, если dataIndex уникальный
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Жанр",
      dataIndex: "genres",
      key: "genres",
    },
    {
      title: "Автор",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Цена в рублях",
      dataIndex: "rub_price",
      key: "price",
    },
    {
      title: "Действия",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  return (
    <div className={style.table}>
      <div className={style.tableHeader}>
        <h1> Атрибуты </h1>
        <AddButton />
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default Books;
