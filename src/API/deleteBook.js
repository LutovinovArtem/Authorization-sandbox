import { instance } from "./axios";

export const deleteBook = (values) => {
  instance
    .delete(`books/${values}`)
    .then((response) => {
      // if (response.status === 204) {
        // props.setRequestData(new Date());
      // }
    })
    .catch((error) => {
      console.log("ErrorBooks:", error);
    });
};
