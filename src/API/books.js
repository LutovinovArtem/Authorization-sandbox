import { instance } from "./axios";

export const getBooks = () => {
  instance
    .get(`books`)
    .then((response) => response.data)
    .catch((error) => {
        console.log("Error:", error);
    });
};
