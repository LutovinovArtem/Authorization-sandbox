import { instance } from "./axios";

export const registerUser = (values) => instance.post(`register`, values)
    

