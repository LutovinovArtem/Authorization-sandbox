import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import style from "./addBook.module.css";

// console.log(":", );

const AddBook = () => {
  const navigate = useNavigate();
  const backToMain = () => navigate("/main");

  const [title, setTitle] = useState(null);
  const [genres, setGenres] = useState(null);
  const [author, setAuthor] = useState(null);
  const [rub_price, setRub_price] = useState(null);
  const [currency, setCurrency] = useState(null);

  const onFinish = (e) => {
    const newBookParam = { title, genres, author, rub_price, currency }; // параметры новой книги
    // console.log("Book:", newBookParam);
  };
  
  return (
    <div>
      <h1>Добавление книги</h1>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item label="Название">
          <Input
            title="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Жанр">
          <Input
            genres="genres"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Автор">
          <Input
            author="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Цена">
          <Input
            rub_price="rub_price"
            type="tel"
            value={rub_price}
            onChange={(e) => setRub_price(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Валюта">
          <Input
            currency="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </Form.Item>
        <div className={style.buttons}>
          <Form.Item>
            <Button onClick={onFinish}>Сохранить</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={backToMain}>Назад</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default () => <AddBook />;
