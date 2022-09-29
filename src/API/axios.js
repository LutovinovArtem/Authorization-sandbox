import axios from "axios";

export const instance = axios.create({
    baseURL: "http://192.168.10.104/", // вынести в env file
    timeout: 1000,
  });

