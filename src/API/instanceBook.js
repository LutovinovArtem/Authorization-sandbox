import { instance } from "./axios";

export const deleteBook = (bookID) =>
  instance
    .delete(`books/${bookID}/`)
    .then((response) => response)
    .catch((error) => {
      console.log("ErrorBooks:", error);
    });

export const getGenres = () => instance.get(`genres`).then((response) => response.data);

export const getBooks = () =>
  instance.get("books").then((response) => response.data);

export const getOneBook = (id) =>
  instance.get(`books/${id}`).then((response) => response.data);

export const postBooks = (values) =>
  instance
    .post("books", values)
    .then((response) => response)
    .catch((error) => error);

export const putBook = (id, values) => instance.put(`books/${id}/`, values); 


export const getCurrency = () =>
  instance.get("currency/").then((response) => response.data);
