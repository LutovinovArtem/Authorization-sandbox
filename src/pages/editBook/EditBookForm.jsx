import React from "react";
import { Form, Input, Button, Select } from "antd";

const EditBookForm = () => {
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onFinish={onFinish}
      form={form}
      initialValues={{
        title: `${book.title}`,
        genres: `${book.genres}`,
        author: `${book.author}`,
        rub_price: `${book.rub_price}`,
        currency: `${book.currency}`,
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
