import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
import {
  getGenres,
  getCurrency,
  putBook,
} from "../../API/instanceBook";
import "antd/dist/antd.css";
import style from "./editBook.module.css";

const { Option } = Select;

const EditBookForm = ({ book, id , books}) => {

  const navigate = useNavigate();
  const goToBooks = () => navigate("/books");

  const onFinish = (values) => {
    values.author = 1; // захардкодил

    putBook(id, values).then((res) => console.log("res:", res));

    // form.resetFields();
  };

  const [genres, setGenres] = useState([]);
  useEffect(() => {
    getGenres().then((res) => setGenres(res));
  }, []);

  const [currency, setСurrency] = useState([]);
  useEffect(() => {
    getCurrency().then((res) => setСurrency(res));
  }, []);

  const [form] = Form.useForm();


  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onFinish={onFinish}
      form={form}
      initialValues={{
        title: book.title,
        genres: book.genres,
        author: book.author.Name,
        rub_price: book.rub_price,
      }}
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
        <Input rub_price="price" />
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

      {/* <AlertAddBook response={addBook} /> */}
    </Form>
  );
};

export default EditBookForm;
