import React from "react";
import "antd/dist/antd.css";
import { useParams } from "react-router-dom";
import style from "./editBook.module.css";
import { Form, Input, Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editBook } from "../../store/bookSlice";
import {
  // selectBook,
  selectGenres,
  selectCurrency,
} from "../../store/selectors";

const { Option } = Select;

const EditBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const goToBooks = () => navigate("/books");

  const [form] = Form.useForm();

  // нужен ли тут useEffect ?
  const book = useSelector((state) =>
    state.books.books.find(({ id: bookID }) => bookID === id)
  );

  const genres = useSelector(selectGenres);
  const currency = useSelector(selectCurrency);

  const onFinish = (values) => {
    values.author = 1; // захардкодил
    dispatch(editBook({ values, id: book.id }));
    form.resetFields();
  };

  return (
    <>
      <h1>Редактирование книги</h1>
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

        {/* импута не должно быть, захардкодить отправление единицы */}
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
    </>
  );
};

export default EditBook;
