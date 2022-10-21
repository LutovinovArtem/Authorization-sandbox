import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import "antd/dist/antd.css";
import { useNavigate, useParams } from "react-router-dom";
import style from "./editBook.module.css";
// import AlertAddBook from "../../components/AlertAddBook";
import {
  getGenres,
  getCurrency,
  getOneBook,
  putBook,
} from "../../API/instanceBook";

const { Option } = Select;

const EditBook = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const goToBooks = () => navigate("/books");

  // const [addEditBook, setAddEditBook] = useState();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    values.author = 1; // захардкодил

    putBook(id, values).then((res) => console.log("res:", res));

    // form.resetFields();
  };

  const [book, setBook] = useState(null);
  useEffect(() => {
    (async () => {
      const book = await getOneBook(id);
      setBook(book);
    })();
  }, []);

  const [genres, setGenres] = useState([]);
  useEffect(() => {
    getGenres().then((res) => setGenres(res));
  }, []);

  const [currency, setСurrency] = useState([]);
  useEffect(() => {
    getCurrency().then((res) => setСurrency(res));
  }, []);

  const [value, setValue] = useState()
  console.log('value: ', value);
  

  return (
    <div>
      <h1>Редактирование книги</h1>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        form={form}
        initialValues={{ title: `${book.title}`, genres: `${book.genres}`,  author: `${book.author}`, rub_price: `${book.rub_price}`, currency: `${book.currency}`}}

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
    </div>
  );
};

export default EditBook;
