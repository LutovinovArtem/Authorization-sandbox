import React, { useState, useEffect } from "react";
import style from "./books.module.css";
import "antd/dist/antd.css";
import { Table } from "antd";
import { instance } from "../../API/axios";
import { AddButton } from "../../components/AddButton";
import { DeleteButton } from "../../components/DeleteButton";

const Books = () => {
  const [dataSource, setDataSource] = useState(null);

  const [requestData, setRequestData] = useState(new Date());

  // словарь
  const [mapGenres, setMapGenres] = useState(null); //

  // стейт жанров
  const [genresRetrieved, setGenresRetrieved] = useState([]);

  const genresBooks = new Map(
    genresRetrieved.map((genresMap) => [genresMap.id, genresMap.title])
  );

  useEffect(() => {
    // получение жанров
    instance
      .get(`genres`)
      .then((response) => {
        return setGenresRetrieved(response.data);
      })
      .catch((error) => {
        console.log("ErrorGenres:", error);
      });
    // получение книг
    instance
      .get(`books`)
      .then((response) => {
        const data = response.data;
        console.log("books:", data);
        const books = data.map((book) => ({
          title: book.title,
          // genres: book.genres.toString(),
          genres: genresBooks.get(book.genres.toString()), // ?????
          author: book.author.Name,
          rub_price: book.rub_price,
          actions: (
            <DeleteButton bookID={book.id} setRequestData={setRequestData} />
          ),
        }));
        // console.log("genres:", books);
        return setDataSource(books);
      })
      .catch((error) => {
        console.log("ErrorBooks:", error);
      });
  }, [requestData]);

  // const result = genresRetrieved.filter(id => books.genres)

  // валюты нет, т.к. она автоматически конвертируется в рубли на сервере. По крайней мере, так заявлено
  const columns = [
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
        <h1> Книги </h1>
        <AddButton />
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default Books;
