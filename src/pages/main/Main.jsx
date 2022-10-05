import React from "react";
import style from "./main.module.css";
import "antd/dist/antd.css";
import { Table } from "antd";

import { getBooks } from "../../API/books";

const Main = () => {
  getBooks()
  // сами книги
  const dataSource = [
    {
      key: "1",
      title: "Война и мир",
      genres: 'roman',
      author: 'Tolstoy',
      rub_price: '100',
      currency: 'Rub',
    },
  ];
  // параметры таблицы
  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title", 
    },
    {
      title: "genres",
      dataIndex: "genres",
      key: "genres", 
    },
    {
      title: "author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "rub_price",
      dataIndex: "rub_price",
      key: "price",
    },
    {
      title: "Валюта",
      dataIndex: "currency",
      key: "currency",
    },
  ];

  return (
    <div className={style.table}>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default Main;
