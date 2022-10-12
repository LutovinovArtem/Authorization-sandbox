import React, { useState, useEffect } from "react";
import style from "./books.module.css";
import "antd/dist/antd.css";
import { Table } from "antd";
import { instance } from "../../API/axios";
import { AddButton } from "../../components/AddButton";
import { DeleteButton } from "../../components/DeleteButton";
import { getGenres } from "../../API/getGenres";
import { getBooks } from "../../API/getBooks";

const Books = () => {
  const [books, setBooks] = useState(null);
  const [genres, setGenres] = useState();

  useEffect(() => {
    getGenres().then((res) => setGenres(res));
   getBooks().then((res) => setBooks(res));
  }, []);

  const formatBooks = () => {
    const books = books.map((book) => ({
      id: book.id,
      title: book.title,
      genres: genresBooks.get(book.genres.toString()), // ?????
      author: book.author.Name,
      rub_price: book.rub_price,
      actions: <DeleteButton bookID={book.id} />,
    }));


    setBooks(books);
  };

  useEffect(() => {
      formatBooks();
  }, [genres]); // ?


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
      <Table dataSource={books} columns={columns} />;
    </div>
  );
};

export default Books;
