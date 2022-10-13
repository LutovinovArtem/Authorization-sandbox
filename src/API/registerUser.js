import { instance } from "./axios";

export const registerUser = (values) => instance.post(`register`, values)
    .then((response) => {
      console.log("Response:", response);
    })
    .catch((error) => {
      console.log("Error:", error);
    });

