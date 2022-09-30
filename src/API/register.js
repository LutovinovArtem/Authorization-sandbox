import { instance } from "./axios";

export const registerUser = (values) => {
  return instance.post(`register`, values).then((response) => {
    return response.status;
    
  });
};
