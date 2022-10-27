import { instance } from "./axios";

export const getToken = (values) => instance.post(`token/`, values)
