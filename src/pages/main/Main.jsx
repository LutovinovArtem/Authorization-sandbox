import React, { useState, useEffect } from "react";
import style from "./main.module.css";
import "antd/dist/antd.css";
import { Table } from "antd";

// import { getBooks } from "../../API/books";
import { instance } from "../../API/axios";

const Main = () => {
  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    // getBooks().then((response) => setDataSource(response))
    // setDataSource()
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

        return setDataSource(books);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []); // [] чтобы не спамило запросами

  // сами книги
  //  const dataSource = [
  //   {
  //     key: "1",
  //     title: "Война и мир",
  //     genres: 'roman',
  //     author: 'Tolstoy',
  //     rub_price: '100',
  //     currency: 'Rub',
  //   },
  // ];
  // параметры таблицы
  const columns = [
    // в доке сказано, что key не нужен, если dataIndex уникальный
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
  ];

  return (
    <div className={style.table}>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default Main;
