import { instance } from "./axios";

// export const registerUser = (values) =>
//   instance.post(`register`, values).then((response) => response);

// export const registerUser = (values) =>
//   instance
//     .post(`register`, values)
//     .then((response) => response)
//     .catch(function(error) {
//       if (error.response) {
//         // Request made and server responded
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log("Error", error.message);
//       }
//     });

// export const registerUser = (values) =>
//   instance.post(`register`, values).then((response) => response.status).catch((error) => error.response.status);

export const registerUser = (values) => {
  instance.post(`register`, values).then((response) => response.status).catch((error) => error.message) ;}
   
    
