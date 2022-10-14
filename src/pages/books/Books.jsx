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
  console.log("books", books);
  const [genres, setGenres] = useState([]);
  console.log("genres", genres);

  const genreOnlyTitle = genres.map((genre) => genre.title);
  // console.log('genreOnlyTitle', genreOnlyTitle[books.genres]);

  const formatBooks = (book) => {
    const newBooks = book.map((book) => ({
      id: book.id,
      key: book.id,
      title: book.title,
      // genres: book.genres.toString(), // ?
      genres: book.genres,
      // genres: genreOnlyTitle[1],
      author: book.author.Name,
      rub_price: book.rub_price,
    }));
    return newBooks;
  };

  useEffect(() => {
    getGenres().then((res) => setGenres(res));
    getBooks().then((res) => setBooks(formatBooks(res)));
  }, []);

  const handleDeleteClick = (id) => {
    deleteBook(id).then(() =>
      getBooks().then((res) => setBooks(formatBooks(res)))
    );
  };

  // че бля?
  // Array.prototype.multiget = function() {
  //   const args = Array.apply(null, arguments);
  //   let result = [];
  //   for (let i = 0; i < args.length; i++) {
  //     result.push(this[args[i]]);
  //   }
  //   return result;
  // };

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
      // render: (genres) => genreOnlyTitle[genres] // работает, если приходит 1 жанр

      // render: (genres) => {
      //   let result = [];
      //   for (let i = 0; i < genres.length; i++) {
      //     result.push(genreOnlyTitle[i]);
      //   }
      //   return result;
      // },

      render: (genres) => {
        // всё, тут шиза пошла

        // let genresLength = "";
        // for (let i = 0; i < genres.length; i++) {
        //   genresLength += `${i},`;
        // }
        // genresLength = genresLength.slice(0, genresLength.length - 1);

        // // const result = genres.multiget().join(","); // должен принимать 1,2,3 в зависимости от количества элементов массива
        // // console.log('genres1', result);
        // return genreOnlyTitle.multiget(genresLength).join(",");
      },
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
