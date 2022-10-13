import { instance } from "./axios";

export const deleteBook = (bookID) =>
  instance
    .delete(`books/${bookID}/`)
    .then((res) => res)
    .catch((error) => {
      console.log("ErrorBooks:", error);
    });

export const getBooks = () =>
  instance.get("books").then((response) => response.data);

export const postBooks = (values) =>
  instance
    .post("books", values)
    .then((response) => response)
    .catch((error) => error);
