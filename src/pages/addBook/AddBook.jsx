import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Alert } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import style from "./addBook.module.css";
import { instance } from "../../API/axios";

const { Option } = Select;

const AlertItem = (props) => {
  let message = "", type = "";

  const responseAlert = props.responseAlert;

  if (responseAlert === 201) {
    message = "Книга успешно добавлена!";
    type = "success";
  } else if (responseAlert === 400) {
    message = "Ошибка валидации!";
    type = "warning";
  } else if (responseAlert === 500) {
    message = "Ошибка со стороны сервера!";
    type = "error";
  }

  return (
    <div className={style.alert}>
      {props.responseAlert && (
        <Alert message={message} type={type} showIcon closable />
      )}
    </div>
  );
};

const AddBook = () => {
  // кнопка "Назад"
  const navigate = useNavigate();
  const backToMain = () => navigate("/main");

  // ответ сервера
  const [addBookAlertResponse, setAddBookAlertResponse] = useState(null);
  
  // запуск
  const [form] = Form.useForm();
  const onFinish = (values) => {
    values.author = 1; // захардкодил по просьбе Борба

    // отправка новой книги
    instance
      .post(`books`, values)
      .then((response) => {
        setAddBookAlertResponse(response.request.status); // переделать
      })
      .catch((error) => {
        setAddBookAlertResponse(error.request.status); // переделать 
      });

    // очистка форм после отправки
    form.resetFields();
  };

  // получение жанров
  const [genresRetrieved, setGenresRetrieved] = useState([]);

  useEffect(() => {
    instance
      .get(`genres`)
      .then((response) => {
        return setGenresRetrieved(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  // получение валют
  const [currencyRetrieved, setСurrencyRetrieved] = useState([]);

  useEffect(() => {
    instance
      .get(`currency/`)
      .then((response) => {
        return setСurrencyRetrieved(response.data);
      })
      .catch((error) => {
        console.log("Error_currency:", error);
      });
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
          <Input rub_price="price" type="tel" />
        </Form.Item>

        <Form.Item label="Валюта" name="currency">
          <Select>
            {currencyRetrieved.map((curr) => (
              <Select.Option value={curr.id}> {curr.name} </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div className={style.buttons}>
          <Form.Item>
            <Button htmlType="submit">Сохранить</Button>
          </Form.Item>

          <Form.Item>
            <Button onClick={backToMain}>Назад</Button>
          </Form.Item>
        </div>

        <AlertItem responseAlert={addBookAlertResponse} />

      </Form>
    </div>
  );
};

export default AddBook;
