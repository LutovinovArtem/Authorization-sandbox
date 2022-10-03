import { instance } from "./axios";

// export const registerUser = (values) => {
//   instance.post(`register`, values).then((response => response.data);
// };
// возвращает не 201, а promise

export const registerUser = (values) => instance.post(`register`, values).then(response => response.data)
