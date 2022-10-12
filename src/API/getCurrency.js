import { instance } from "./axios";

export const getCurrency = (values) => {
  instance
    .get("currency/")
    .then((response) => {
    //   setСurrency(response.data);
    })
    .catch((error) => {
      console.log("Error_currency:", error);
    });
};
