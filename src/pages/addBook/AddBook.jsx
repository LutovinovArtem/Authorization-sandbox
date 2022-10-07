import React, { useState, useEffect } from "react";
import { Form, Input, Button, Cascader, Select } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import style from "./addBook.module.css";
import { instance } from "../../API/axios";

const { Option } = Select;

// разобраться как получить значения с каскадного импута
// преобразовать полученные значения в newBookParam
// пройтись map по newBookParam и привести всё к виду, который принимает бэк. Затем передать

const AddBook = () => {
  // "Назад"
  const navigate = useNavigate();
  const backToMain = () => navigate("/main");

  // как-то много стейтов, узнать как преобразовать всё в один
  const [titleInput, setTitleInput] = useState(null);
  // const [genresInput, setGenresInput] = useState(null);
  const [authorInput, setAuthorInput] = useState(null);
  const [rub_priceInput, setRub_priceInput] = useState(null);
  const [genresInput, setGenresInput] = useState([]);
  // const [currency, setCurrency] = useState(null);

  // параметры новой книги
  const newBookParam = { titleInput, genresInput, authorInput, rub_priceInput };

  // const handleChange = (e) => {
  //   setGenresInput({
  //     genresInput: [...e.target.selectedOptions].map((o) => o.value),
  //   });
  // };

  const addGenresInput = (e) => {
    console.log(e.target.value);
    setGenresInput((arr) => [...arr, e.target.value]);
    console.log(genresInput);
  };

  // получение жанров
  const [genresRetrieved, setGenresRetrieved] = useState([]);
  useEffect(() => {
    instance
      .get(`genres`)
      .then((response) => {
        const data = response.data;
        const genres = data.map((step) => step.title);
        return setGenresRetrieved(genres);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []); // '[]' чтобы не спамило запросами

  // запуск
  const onFinish = (e) => {
    console.log("genres:", genresRetrieved);
    console.log("newBookParam:", newBookParam);
    console.log("genresInput:", genresInput);
    // instance
    //   .post(`books`, newBookParam)
    //   .then((response) => {
    //     console.log("Response:", response);
    //   })
    //   .catch((error) => {
    //     console.log("Error:", error);
    //   });
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
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </Form.Item>

        {/* <Form.Item label="Жанр">
          <Input
            
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
          />
        </Form.Item> */}

        {/* <Form.Item label="Жанр">
          <Cascader
            genres="genres"
            isMulti
            options={[
              {
                value: "1",
                label: `${genresGet[0]}`,
              },
              {
                value: "2",
                label: `${genresGet[1]}`,
              },
              {
                value: "3",
                label: `${genresGet[2]}`,
              },
            ]}
          />
        </Form.Item> */}

        <Form.Item
          genres="genres"
          label="Жанр"
          rules={[{ required: true, type: "array" }]}
          onChange={(e) => addGenresInput(e)}
        >
          <Select mode="multiple">
            <Option value="genres1"> {genresRetrieved[0]} </Option>
            <Option value="genres2"> {genresRetrieved[1]} </Option>
            <Option value="genres3"> {genresRetrieved[2]} </Option>
          </Select>
        </Form.Item>

         {/* импута не должно быть, захардкодить отправление единицы */}
        <Form.Item label="Автор">
          <Input
            author="author"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
          />
        </Form.Item> 

        <Form.Item label="Цена">
          <Input
            rub_price="rub_price"
            type="tel"
            value={rub_priceInput}
            onChange={(e) => setRub_priceInput(e.target.value)}
          />
        </Form.Item>

        {/* <Form.Item label="Валюта">
          <Input
            currency="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </Form.Item> */}

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
