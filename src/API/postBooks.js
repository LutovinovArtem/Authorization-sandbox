import { instance } from "./axios";

export const postBooks = (values) => {
  instance
    .post("books", values)
    .then((response) => {
      // setAddBook(response.request.status);
    })
    .catch((error) => {
      // setAddBook(error.request.status);
    });
};
