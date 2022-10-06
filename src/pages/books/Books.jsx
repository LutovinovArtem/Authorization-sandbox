import React, { useState, useEffect } from "react";
import style from "./books.module.css";
import "antd/dist/antd.css";
import { Table } from "antd";
import { instance } from "../../API/axios";
import { AddButton } from "../../components/AddButton";

const Books = () => {
  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    instance
      .get(`books`)
      .then((response) => {
        const data = response.data;
        const books = data.map((book) => ({
          title: book.title,
          genres: book.genres.toString(),
          author: book.author.Name,
          rub_price: book.rub_price,
        }));
        // console.log("Books:", books);
        return setDataSource(books);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []); // '[]' чтобы не спамило запросами

  // useEffect(() => {
  //   setDataSource() // передать параметры новой книги
  // }, []);
  
  // сами книги (как пример)
  //  const dataSource = [
  //   {
  //     key: "1",
  //     title: "Война и мир",
  //     genres: 'roman',
  //     author: 'Tolstoy',
  //     rub_price: '100',
  //   },
  // ];
  // параметры таблицы
  const columns = [
    // в документации сказано, что key не нужен, если dataIndex уникальный
    {
      title: "title",
      dataIndex: "title",
      // key: "title",
    },
    {
      title: "genres",
      dataIndex: "genres",
      // key: "genres",
    },
    {
      title: "author",
      dataIndex: "author",
      // key: "author",
    },
    {
      title: "rub_price",
      dataIndex: "rub_price",
      // key: "price",
    },
    // {
    //   title: "currency",
    //   dataIndex: "currency",
    //   key: "currency",
    // },
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
