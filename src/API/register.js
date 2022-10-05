import { instance } from "./axios";
// import { message } from "antd";
// export const registerUser = (values) =>
//   instance.post(`register`, values).then((response) => response);





export const registerUser = (values) => {
  instance
    .post(`register`, values)
    .then((response) => {
      console.log("Response:", response);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};
