import axios from "axios";

// const token = JSON.parse(localStorage.getItem("token"));
const token = localStorage.getItem("token");

export const instance = axios.create({
  baseURL: "http://192.168.10.104/", // вынести в env file
  timeout: 1000,
  headers: { Authorization: "Bearer " + token }, 
});
