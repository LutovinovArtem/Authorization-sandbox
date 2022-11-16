import axios from "axios";

export const instance = axios.create({
  baseURL: "http://192.168.10.104/",
  timeout: 5000,
});

const requestInterceptor = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` },
    };
  }
};

instance.interceptors.request.use(requestInterceptor, (error) =>
  Promise.reject(error)
);
