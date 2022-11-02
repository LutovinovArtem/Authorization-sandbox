import axios from "axios";



export const instance = axios.create({
  baseURL: "http://192.168.10.104/", 
  timeout: 1000,
});

// export function instanceSetHeader (name, value) {
//   if (value) {
//     instance.defaults.headers[name] = value;
//   }
// };

// if (token) {
//   instanceSetHeader('Authorization', `Bearer ${token}`);
// }

const requestInterceptor = (config) => {
  const token = localStorage.getItem("token");
  if(token) {
    return { ...config, headers: { ...config.headers, 'Authorization': `Bearer ${token}` }} 
  }
}

instance.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error))


// export const instance = axios.create({
//   baseURL: "http://192.168.10.104/", // вынести в env file
//   timeout: 1000,
//   headers: { Authorization: "Bearer " + token }, 
// });