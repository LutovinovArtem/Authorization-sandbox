import { instance } from "./axios";

export const getCurrency = () => instance.get("currency/").then((response) => response.data);
