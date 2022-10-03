import { instance } from "./axios";

// возвращает не 201, а promise

export const registerUser = (values) =>
  instance.post(`register`, values).then((response) => response);
