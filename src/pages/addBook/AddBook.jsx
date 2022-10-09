import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import style from "./addBook.module.css";
import { instance } from "../../API/axios";

const { Option } = Select;

const AddBook = () => {
  // "Назад"
  const navigate = useNavigate();
  const backToMain = () => navigate("/main");

  // запуск
  const [form] = Form.useForm();
  const onFinish = (values) => {
    values.author = 1; // захардкодил по просьбе Борба
    console.log("onFinish:", values);

    // отправка новой книги
    // instance
    //   .post(`books`, values)
    //   .then((response) => {
    //     console.log("Response:", response);
    //   })
    //   .catch((error) => {
    //     console.log("Error:", error);
    //   });
  };

  // получение жанров
  const [genresRetrieved, setGenresRetrieved] = useState([]);

  useEffect(() => {
    instance
      .get(`genres`)
      .then((response) => {
        // const data = response.data;
        // const genres = data.map((step) => step.title);
        // return setGenresRetrieved(genres);
        return setGenresRetrieved(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
      // получение валют - не работает, ошибка на беке
    instance
      .get(`currency/`)
      .then((response) => {
        console.log("currency:", response);
        // const data = response.data;
        // const genres = data.map((step) => step.title);
        // return setGenresRetrieved(genres);
        // return setGenresRetrieved(response.data);
      })
      .catch((error) => {
        console.log("Error_currency:", error);
      });
  }, []); // '[]' чтобы не спамило запросами

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
            {/* <Option value={genresRetrieved[0]}> {genresRetrieved[0]} </Option> */}

            {genresRetrieved.map((genre) => (
              <Option value={genre.id}> {genre.title} </Option>
            ))}

          </Select>
        </Form.Item>

        {/* импута не должно быть, захардкодить отправление единицы // выполнено */}
        <Form.Item label="Автор" name="author">
          <Input author="author" />
        </Form.Item>

        <Form.Item label="Цена" name="rub_price">
          <Input rub_price="rub_price" type="tel" />
        </Form.Item>

          {/* добавить валюты */}

        <div className={style.buttons}>
          <Form.Item>
            <Button htmlType="submit">Сохранить</Button>
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
