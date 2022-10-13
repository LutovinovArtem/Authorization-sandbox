import React, { useState, useEffect } from "react";
import style from "./books.module.css";
import "antd/dist/antd.css";
import { Table, Space, Button } from "antd";
import { AddButton } from "../../components/AddButton";
import { deleteBook } from "../../API/instanceBook";
import { getBooks } from "../../API/instanceBook";
import { getGenres } from "../../API/getGenres";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);

  const formatBooks = (book) => {
    const newBooks = book.map((book) => ({
      id: book.id,
      key: book.id,
      title: book.title,
      genres: book.genres.toString(), // ?
      author: book.author.Name,
      rub_price: book.rub_price,
    }));
    // setBooks(newBooks);
    return newBooks;
  };

  useEffect(() => {
    getGenres().then((res) => setGenres(res));
    getBooks().then((res) => setBooks(formatBooks(res)));
  }, []);

  const handleDeleteClick = (id) => {
    // new Promise(() => deleteBook(id)).then(getBooks());
    //.then(res => setBooks(res));
    deleteBook(id).then(() => getBooks().then((res) => setBooks(formatBooks(res))));
    // deleteBook(id).then(getBooks().then((res) => setBooks(formatBooks(res))));
    // setBooks(books);
  };

  const columns = [
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
      // render: (title) => <a>{title}</a>,
    },
    {
      title: "Жанр",
      dataIndex: "genres",
      key: "genres",
      // render: (genres) => {},
    },
    {
      title: "Автор",
      dataIndex: "author",
      key: "author",
      // render: (author) => author.Name,
    },
    {
      title: "Цена в рублях",
      dataIndex: "rub_price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, book) => (
        <Space size="middle">
          <div>
            <Button
              type="primary"
              // onClick={}
            >
              Редактировать
            </Button>
          </div>

          <div>
            <Button
              danger
              type="primary"
              onClick={() => handleDeleteClick(book.id)}
            >
              Удалить bookID: {book.id}
            </Button>
          </div>
        </Space>
      ),
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
