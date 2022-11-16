import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { useParams } from "react-router-dom";
// import AlertAddBook from "../../components/AlertAddBook";
import { getOneBook } from "../../API/instanceBook";
import EditBookForm from "./EditBookForm";
import { getGenres } from "../../API/instanceBook";

const EditBook = () => {
  const { id } = useParams();

  const getBooksRAW = (genres, bookRAW) => {
    return {
      ...bookRAW,
      genres: genres.reduce((acc, { id, title }) => { // current => id, title
        if (bookRAW.genres.includes(id)) {
          return [...acc, title];
        }
        return acc;
      }, []),
    };
  };

  const [book, setBook] = useState(null);

  useEffect(() => {
    (async () => {
      const book = await getOneBook(id);
      const genres = await getGenres();
      setBook(getBooksRAW(genres, book));
    })();
  }, []);

  return (
    <div>
      <h1>Редактирование книги</h1>
      {book && <EditBookForm book={book} id={id} />}
    </div>
  );
};

export default EditBook;
