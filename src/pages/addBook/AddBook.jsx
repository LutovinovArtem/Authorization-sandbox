import React from "react";
import style from "./addBook.module.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Select } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { AlertResponse } from "../../components/AlertResponse";
import { useDispatch, useSelector } from "react-redux";
import { addBookAsync } from "../../store/bookSlice";
import { selectGenres, selectCurrency } from "../../store/selectors";

const { Option } = Select;

const AddBook = () => {
  // const [response, setResponse] = useState();
  // const navigate = useNavigate();
  // const goToBooks = () => navigate("/books");
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const genres = useSelector(selectGenres);
  const currency = useSelector(selectCurrency);

  const onFinish = (values) => {
    values.author = 1; // захардкодил

    dispatch(addBookAsync(values));

    form.resetFields();
  };

  return (
    <>
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
            <Link to="/books">
              <Button> Назад </Button>
            </Link>
          </Form.Item>
        </div>
        <AlertResponse /> {/* response={response} */}
      </Form>
    </>
  );
};

export default AddBook;
