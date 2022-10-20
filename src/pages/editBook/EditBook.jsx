import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import style from "./editBook.module.css";
// import AlertAddBook from "../../components/AlertAddBook";
import {
  postBooks,
  getGenres,
  getCurrency,
  getOneBook,
} from "../../API/instanceBook";
import { useParams } from "react-router-dom";

const { Option } = Select;

const EditBook = () => {
  const navigate = useNavigate();
  const goToBooks = () => navigate("/books");

  const { id } = useParams;

  const [addEditBook, setAddEditBook] = useState();
  console.log("res:", addEditBook);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    // values.author = 1; // захардкодил

    postBooks(values)
      .then((res) => setAddEditBook(res.request.status))
      .catch((error) => setAddEditBook(error.request.status));

    // form.resetFields();
  };

  const [book, setBook] = useState();
  console.log("Book", book);

  useEffect(() => {
    getOneBook(id).then((res) => setBook(res));
  }, [id]);

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
          <Input title="title" defaultValue={`${book.title}`} />
        </Form.Item>

        <Form.Item
          name="genres"
          label="Жанр"
          rules={[{ required: true, type: "array" }]}
        >
        {/* пока не понял как с вложенными сделать. Сервер не работает, нужно посмотреть, что возвращает в книгах */}
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
          <Input author="author" defaultValue={`${book.author}`} />
        </Form.Item>

        <Form.Item label="Цена" name="rub_price">
          <Input rub_price="price" defaultValue={`${book.rub_price}`} />
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
