import React, { useState, useEffect, useCallback } from "react";
import style from "./books.module.css";
import "antd/dist/antd.css";
import { Table, Space, Button } from "antd";
import { AddButton } from "../../components/AddButton";
import { Loader } from "../../components/Loader/Loader";
import { deleteBook, getBooks, getGenres } from "../../API/instanceBook";
import { useNavigate } from "react-router-dom";
import { AlertResponse } from "../../components/AlertResponse";
import { useDispatch, useSelector } from "react-redux";
import { updateBooks } from "../../store/bookSlice";
import { updateLoader } from "../../store/loaderSlice";

const Books = () => {
  const books = useSelector((state) => state.books.books);
  const isLoading = useSelector((state) => state.loader.isLoading);

  const getBooksRAW = (genres, books) => {
    return books.map((book) => ({
      key: book.id,
      ...book,
      author: book.author.Name,
      genres: genres.reduce((acc, curr) => {
        if (book.genres.includes(curr.id)) {
          return [...acc, curr.title];
        }
        return acc;
      }, []),
    }));
  };

  const dispatch = useDispatch();
  const asyncGetAndSetBooks = useCallback(() => {
    (async () => {
      const genres = await getGenres();
      const books = await getBooks();
      const newBooks = getBooksRAW(genres, books);
      dispatch(updateBooks(newBooks));
      dispatch(updateLoader(false));
    })();
  }, [books]);

  useEffect(() => {
    asyncGetAndSetBooks();
  }, []);

  const [response, setResponse] = useState();
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
      title: "Действия",
      key: "action",
      render: (_, book) => (
        <Space size="middle">
          <div>
            <Button type="primary" onClick={() => goToEditBook(book.id)}>
              Редактировать
            </Button>
          </div>

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
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={style.table}>
          <div className={style.tableHeader}>
            <h1> Книги </h1>
            <AlertResponse response={response} />
            <AddButton />
          </div>
          <Table dataSource={books} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default Books;
