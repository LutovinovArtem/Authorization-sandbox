import style from "./books.module.css";
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Button } from "antd";
import { AddButton } from "../../components/AddButton";
import { Loader } from "../../components/Loader/Loader";
import { AlertResponse } from "../../components/AlertResponse";
import { getBooks, deleteBook } from "../../store/bookSlice";
import {
  // selectBooks,
  // selectIsLoading,
  // selectError,
  selectFromBookSlice,
} from "../../store/selectors";

const Books = () => {
  // const [response, setResponse] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { books, isLoading, error } = useSelector(selectFromBookSlice);

  // const books = useSelector(selectBooks);
  // const error = useSelector(selectError);
  // const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  const handleDeleteClick = (id) => {
    dispatch(deleteBook(id));
  };

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
      render: (
        _,
        { id } // book => id
      ) => (
        <Space size="middle">
          <div>
            <Button type="primary" onClick={() => goToEditBook(id)}>
              Редактировать
            </Button>
          </div>

          <div>
            <Button danger type="primary" onClick={() => handleDeleteClick(id)}>
              Удалить
            </Button>
          </div>
        </Space>
      ),
    },
  ];

  if (error) {
    return <h2> Error: {error}</h2>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={style.table}>
      <div className={style.tableHeader}>
        <h1> Книги </h1>
        <AlertResponse />
        <AddButton />
      </div>
      <Table dataSource={books} columns={columns} />
    </div>
  );
};

export default Books;
