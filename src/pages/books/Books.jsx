import React, { useState, useEffect } from "react";
import style from "./books.module.css";
import "antd/dist/antd.css";
import { Table, Space, Button } from "antd";
import { AddButton } from "../../components/AddButton";
import { deleteBook } from "../../API/instanceBook";
import { getGenres } from "../../API/getGenres";
import { getBooks } from "../../API/instanceBook";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then((res) => setGenres(res));
    getBooks().then((res) => setBooks(res));
  }, []);

  const handleDeleteClick = (id) => {
    // new Promise(() => deleteBook(id)).then(getBooks());
    deleteBook(id).then(getBooks())//.then(res => setBooks(res));
    
    // setBooks(books);
  };

  // const formatBooks = () => {
  //   console.log('books:', books);
  //   const newBooks = books.map((book) => ({
  //     id: book.id,
  //     title: book.title,
  //     // genres: genresBooks.get(book.genres.toString()), // ?????
  //     author: book.author.Name,
  //     rub_price: book.rub_price,
  //   }));

  //   setBooks(newBooks);
  // };

  // useEffect(() => {
  //   formatBooks();
  // }, [genres]);

  const columns = [
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
      render: (title) => <a>{title}</a>,
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
      render: (author) => author.Name,
    },
    {
      title: "Цена в рублях",
      dataIndex: "rub_price",
      key: "price",
    },
    // {
    //   title: "Действия",
    //   dataIndex: "actions",
    //   key: "actions",
    // },
    {
      title: "Action",
      key: "action",
      render: (_, book) => (
        <Space size="middle">
          <div> Редактировать </div>
          <div>
            <Button
              danger
              type="primary"
              onClick={() => handleDeleteClick(book.id)}
            >
              Удалить
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
