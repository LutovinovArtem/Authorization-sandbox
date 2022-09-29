import { instance } from "./axios";

export const getToken = (values) => {
  instance.post(`token/`, values).then((response) => {
    localStorage.setItem("token", JSON.stringify(response.data.access));
  });
};
