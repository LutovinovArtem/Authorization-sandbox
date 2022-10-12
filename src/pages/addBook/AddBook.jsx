import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import style from "./addBook.module.css";
import { instance } from "../../API/axios";
import AlertAddBook from "../../components/AlertAddBook";
import { postBooks } from "../../API/postBooks";
import { getBooks } from "../../API/getBooks";
import { getCurrency } from "../../API/getCurrency";

const { Option } = Select;

const AddBook = () => {
  // кнопка "Назад"
  const navigate = useNavigate();
  const goToBooks = () => navigate("/books");

  // ответ сервера
  const [addBook, setAddBook] = useState(null);

  // запуск
  const [form] = Form.useForm();
  const onFinish = (values) => {
    // values.author = 1; // захардкодил

    // отправка новой книги
    postBooks();

    form.resetFields();
  };

  // получение жанров
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    //   instance
    //     .get("genres")
    //     .then((response) => setGenres(response.data))
    //     .catch((error) => {
    //       console.log("Error:", error);
    //     });
    getBooks();
  }, []);

  // получение валют
  const [currency, setСurrency] = useState([]);

  useEffect(() => {
    // instance
    //   .get("currency/")
    //   .then((response) => {
    //     return setСurrency(response.data);
    //   })
    //   .catch((error) => {
    //     console.log("Error_currency:", error);
    //   });
    getCurrency();
  }, []);

  return (
    <div>
      <h1>Добавление книги</h1>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item label="Название" name="title">
          <Input title="title" />
        </Form.Item>

        <Form.Item
          name="genres"
          label="Жанр"
          rules={[{ required: true, type: "array" }]}
        >
          <Select mode="multiple">
            {genres.map((genre) => (
              <Option key={genre.id} value={genre.id}>
                {" "}
                {genre.title}{" "}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* импута не должно быть, захардкодить отправление единицы // выполнено */}
        <Form.Item label="Автор" name="author">
          <Input author="author" />
        </Form.Item>

        <Form.Item label="Цена" name="rub_price">
          <Input rub_price="price" type="tel" />
        </Form.Item>

        <Form.Item label="Валюта" name="currency">
          <Select>
            {currency.map((curr) => (
              <Select.Option key={curr.id} value={curr.id}>
                {" "}
                {curr.name}{" "}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div className={style.buttons}>
          <Form.Item>
            <Button htmlType="submit"> Сохранить </Button>
          </Form.Item>

          <Form.Item>
            <Button onClick={goToBooks}> Назад </Button>
          </Form.Item>
        </div>

        <AlertAddBook response={addBook} />
      </Form>
    </div>
  );
};

export default AddBook;
