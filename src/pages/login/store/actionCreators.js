// import axios from 'axios';
import * as constants from './constants';

export const loginIn = (info) => ({
  type: constants.LOGIN_IN,
  info
});


export const loginOut = (info) => ({
  type: constants.LOGIN_OUT,
  info
});

// export const login = (account, password) => {
//   return (dispatch) => {
//     axios.get("http://localhost:3200/login.json?account=" + account + "&password=" + password)
//       .then((res) => {
//         // console.log(res);
//         const result = res.data.data;
//         if (result) {
//           dispatch(changeLogin());
//         } else {
//           alert('失败');
//         }
//       }).catch((err) => {
//         console.log(err);
//       });
//   }
// }