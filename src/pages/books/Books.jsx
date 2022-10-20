import React, { useState, useEffect } from "react";
import style from "./books.module.css";
import "antd/dist/antd.css";
import { Table, Space, Button } from "antd";
import { AddButton } from "../../components/AddButton";
import { deleteBook, getBooks, getGenres } from "../../API/instanceBook";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();

  const goToEditBook = () => {
    navigate("/EditBook");
  };

  const [books, setBooks] = useState([]);

  // const formatBooks = (books) => {
  //   const newBook = books.map((book) => ({
  //     id: book.id,
  //     key: book.id,
  //     title: book.title,
  //     // genres: book.genres.toString(), // ?
  //     genres: book.genres,
  //     // genres: genresDict.get(...book.genres),
  //     author: book.author.Name,
  //     rub_price: book.rub_price,
  //   }));
  //   return newBook;
  // };

  // const getBooksRAW = (genres, books) => {
  //   return books.map((book) => ({
  //     key: book.id,
  //     ...book,
  //     genres: genres.reduce((acc, { id, title }) => {
  //       if (book.genres.includes(id)) {
  //         return [...acc, title];
  //       }
  //       return acc;
  //     }, []),
  //   }));
  // };

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
    (async () => {
      const genres = await getGenres();
      const books = await getBooks();
      setBooks(getBooksRAW(genres, books));
    })();
  }, []);

  // const handleDeleteClick = (id) => {
  //   deleteBook(id).then(() =>
  //     getBooks().then((res) => setBooks(formatBooks(res))) // Заменить 
  //   );

  const handleDeleteClick = (id) => {
      deleteBook(id).then(() => {
        const books = getBooks();
        setBooks(books);
      }
      );
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
      // render: (genres) => {},
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
            <Button type="primary" onClick={goToEditBook}>
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
      <Table dataSource={books} columns={columns} />;
    </div>
  );
};

export default Books;
