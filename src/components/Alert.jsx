// import { Alert } from "antd";
// import React from "react";

// export default function Alert() {
//   const onClose = (e) => {
//     console.log(e, "I was closed.");
//   };

//   const [registerResponseCode, setRegisterResponseCode] = useState(null); // использую состояния

//   return (
//     <div className={style.alert}>
//       {registerResponseCode && registerResponseCode === 201 && (
//         <Alert
//           message="Вы успешно загеристрировались!"
//           type="success"
//           showIcon
//           closable
//         />
//       )}

//       {registerResponseCode && registerResponseCode === 400 && (
//         <Alert
//           message="Такой пользователь уже зарегистрирован!"
//           type="warning"
//           showIcon
//           closable
//         />
//       )}
//     </div>
//   );
// }
