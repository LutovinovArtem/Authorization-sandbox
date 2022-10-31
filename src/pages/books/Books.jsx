import React, { useState, useEffect } from "react";
import style from "./books.module.css";
import "antd/dist/antd.css";
import { Table, Space, Button } from "antd";
import { AddButton } from "../../components/AddButton";
import { deleteBook, getBooks, getGenres } from "../../API/instanceBook";
import { useNavigate } from "react-router-dom";
import AlertResponse from "../../components/AlertResponse";

const Books = () => {
  const [books, setBooks] = useState([]);
  console.log("books: ", books);

  const asyncGetAndSetBooks = () => {
    (async () => {
      const genres = await getGenres();
      const books = await getBooks();
      setBooks(getBooksRAW(genres, books));
    })();
  };

  const getBooksRAW = (genres, books) => {
    return books.map((book) => ({
      key: book.id,
      ...book,
      genres: genres.reduce((acc, curr) => {
        if (book.genres.includes(curr.id)) {
          return [...acc, curr.title];
        }
        return acc;
      }, []),
    }));
  };

  useEffect(() => {
    asyncGetAndSetBooks();
  }, []);

  const [response, setResponse] = useState();
  console.log("setres: ", response);
  const handleDeleteClick = (id) => {
    deleteBook(id).then((res) => {
      asyncGetAndSetBooks();
      setResponse(res.status);
    });
  };

  const navigate = useNavigate();

  const goToEditBook = (id) => {
    navigate(`/editBook/${id}`);
  };

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
      // render: (genres) => {String(genres)},
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
      title: "Action",
      key: "action",
      render: (_, book) => (
        <Space size="middle">
          <div>
            <Button type="primary" onClick={() => goToEditBook(book.id)}>
              Редактировать {book.id}
            </Button>
          </div>

          <div>
            <Button
              danger
              type="primary"
              onClick={() => handleDeleteClick(book.id)}
            >
              Удалить {book.id}
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
      <Table dataSource={books} columns={columns} />
      <AlertResponse response={response} />
    </div>
  );
};

export default Books;
