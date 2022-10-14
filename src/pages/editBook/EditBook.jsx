import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import style from "./editBook.module.css";
// import AlertAddBook from "../../components/AlertAddBook";
import { postBooks, getGenres, getCurrency, getBooks } from "../../API/instanceBook";

const { Option } = Select;

const EditBook = () => {
  const navigate = useNavigate();
  const goToBooks = () => navigate("/books");

  const [addEditBook, setAddEditBook] = useState();

  const [form] = Form.useForm();
  const onFinish = (values) => {
    // values.author = 1; // захардкодил

    postBooks(values)
      .then((res) => setAddEditBook(res.request.status))
      .catch((error) => setAddEditBook(error.request.status));

    // form.resetFields();
  };

  const [selectedBooks, setSelectedBooks] = useState();
  console.log('selectedBooks', selectedBooks);
  
  useEffect(() => {
    getBooks().then((res) => setSelectedBooks(res))
  }, []);

  const [genres, setGenres] = useState([]);
  useEffect(() => {
    getGenres().then((res) => setGenres(res));
  }, []);

  const [currency, setСurrency] = useState([]);
  useEffect(() => {
    getCurrency().then((res) => setСurrency(res));
  }, []);

  return (
    <div>
      <h1>Редактирование книги</h1>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item label="Название" name="title">
          <Input title="title" defaultValue="1"/>
        </Form.Item>

        <Form.Item
          name="genres"
          label="Жанр"
          rules={[{ required: true, type: "array" }]}
        >
          <Select mode="multiple" defaultValue="2">
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
          <Input author="author" defaultValue="3" />
        </Form.Item>

        <Form.Item label="Цена" name="rub_price">
          <Input rub_price="price" defaultValue="4" />
        </Form.Item>

        <Form.Item label="Валюта" name="currency">
          <Select defaultValue="5">
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
    </div>
  );
};

export default EditBook;
