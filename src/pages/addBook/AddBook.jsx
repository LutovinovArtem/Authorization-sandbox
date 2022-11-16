import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import style from "./addBook.module.css";
import { AlertResponse } from "../../components/AlertResponse";
import { getGenres, getCurrency } from "../../API/instanceBook";
import { useDispatch } from "react-redux";
// import { updateResponse } from "../../store/responseSliсe";
import { addBook } from "../../store/bookSlice";

const { Option } = Select;

const AddBook = () => {
  const navigate = useNavigate();
  const goToBooks = () => navigate("/books");
  const dispatch = useDispatch();

  const [response, setResponse] = useState();

  const [form] = Form.useForm();
  const onFinish = (values) => {
    values.author = 1; // захардкодил

    // postBooks(values)
    //   .then((res) => setResponse(res.request.status))
    //   .catch((error) => setResponse(error.request.status));
    
    dispatch(addBook(values));

    form.resetFields();
  };

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

        <AlertResponse response={response}/>
      </Form>
    </div>
  );
};

export default AddBook;
