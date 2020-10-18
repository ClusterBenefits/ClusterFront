import axios from "axios";
import { url } from "../constants";
import { ShowToast } from "../components";

const errorHandler = ({ response }) => {
  // check if response error has nested lvls or no
  let textError;
  if (response) {
    textError =
      typeof response.data.error === "string"
        ? response.data.error //error right here
        : response.data.error[Object.keys(response.data.error)[0]];
  } else {
    textError = "Виникла непередбачувана помилка";
  }

  ShowToast(textError, true);
};

export const postTokenToServer = async ({ expoToken, token }) => {
  let response = axios
    .post(
      `${url}/user/attach-token`,
      { token: expoToken },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token
        }
      }
    )
    .then(response => {
      return response.data;
    })
    .catch(({ response }) => {});

  return response;
};

///////// AUTH
export const login = ({ email, password }) => {
  let response = axios
    .post(`${url}/login`, { email, password }, { headers: { "Content-Type": "application/json" } })
    .then(response => {
      return response.data.token;
    })
    .catch(errorHandler);

  return response;
};

export const register = ({ email, password, password_confirmation }) => {
  let data = {
    email,
    password,
    password_confirmation
  };
  let response = axios
    .post(`${url}/register`, data, {
      headers: { Accept: "application/json" }
    })
    .then(response => {
      return response.data.token;
    })
    .catch(errorHandler);
  return response;
};

///////// AUTH

///////// Password/Email Reset

export const forgotPassword = ({ email, resend }) => {
  let response = axios
    .post(`${url}/password/forgot`, { email }, { headers: { Accept: "application/json" } })
    .then(response => {
      resend && ShowToast("Код успішно відправлений");
      return response.data;
    })
    .catch(errorHandler);
  return response;
};

export const confirmCodeFromEmail = ({ email, code }) => {
  let response = axios
    .post(`${url}/password/confirm`, { email, code })
    .then(response => {
      return response.data.token;
    })
    .catch(errorHandler);
  return response;
};

export const resetPassword = ({ email, token, password, password_confirmation }) => {
  let data = { email, token, password, password_confirmation };
  let response = axios
    .post(`${url}/api/password/reset`, data)
    .then(response => {
      return response.data;
    })
    .catch(errorHandler);
  return response;
};

///////// Password/Email Reset

//////// User

export const showUserInformation = token => {
  let response = axios
    .get(`${url}/user`, { headers: { Authorization: "Bearer " + token } })
    .then(response => {
      return response.data;
    })
    .catch(err => console.log(err));
  return response;
};

export const updateUserInformation = ({ token, data }) => {
  let response = axios
    .post(`${url}/user`, data, {
      headers: { Accept: "application/json", Authorization: "Bearer " + token }
    })
    .then(response => {
      return response.data;
    })
    .catch(errorHandler);
  return response;
};

export const changeUserEmail = ({ token, email }) => {
  let response = axios
    .post(
      `${url}/user/change-email`,
      { email },
      {
        headers: { Authorization: "Bearer " + token }
      }
    )
    .then(response => {
      ShowToast("Ваш емейл успішно оновлено!");
      return response.data;
    })
    .catch(errorHandler);
  return response;
};

export const changeUserPassword = async ({
  token,
  old_password,
  new_password,
  new_password_confirmation
}) => {
  let data = { old_password, new_password, new_password_confirmation };
  let response = await axios
    .post(`${url}/user/change-password`, data, {
      headers: { Authorization: "Bearer " + token, Accept: "application/json" }
    })
    .then(response => {
      ShowToast("Ваш пароль успішно оновлено!");
      return response.data;
    })
    .catch(errorHandler);
  return response;
};

/////// User

/////// Favoriter

export const listFavoritesCompanies = ({ token, page }) => {
  let results = axios
    .get(`${url}/companies/favorites?page=${page}`, {
      headers: { Authorization: "Bearer " + token }
    })
    .then(response => {
      return response.data;
    })
    .catch(e => console.log("failed to load favorite items", e));
  return results;
};

export const attachToFavorites = ({ token, id }) => {
  let data = { company_id: id };
  let response = axios
    .post(`${url}/companies/favorites`, data, {
      headers: { Accept: "application/json", Authorization: "Bearer " + token }
    })
    .then(response => {
      ShowToast("Додано до улюбленого списку");
      return response;
    })
    .catch(e => console.log("failed to add", e));

  return response;
};

export const removeFromFavorites = ({ token, id }) => {
  let response = axios
    .delete(`${url}/companies/favorites/${id}`, {
      headers: { Accept: "application/json", Authorization: "Bearer " + token }
    })
    .then(response => {
      ShowToast("Видалено з улюбленого списку");
      return response;
    })
    .catch(e => console.log("error removing ", e));
  return response;
};

//////////// Favoriter

////////////Companies

export const listOfCompanies = ({ token, page }) => {
  let response = axios
    .get(`${url}/companies?page=${page}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      // console.log("companies", response);
      return response.data;
    })
    .catch(({ response }) => console.log("failed to load items", response.data));

  return response;
};

////////////Companies

// Send Messages

export const sendMessageToAdmins = ({ name, email, subject, comment, token }) => {
  let response = axios
    .post(
      `${url}/feedback`,
      { name, email, subject, comment },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token
        }
      }
    )
    .then(response => {
      ShowToast("Запит надіслано успішно!");
      return response.data;
    })
    .catch(errorHandler);

  return response;
};

// Send Messages

// CreditCard Api

//get data and signature info from api
export const getInfoForBillingSubscription = token => {
  let response = axios
    .get(`${url}/payment/subscribe/59`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("error axiosFetch", err);
    });
  return response;
};

export const checkBillingSubscription = token => {
  let response = axios
    .get(`${url}/payment/subscribe/info`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      console.log("res", response.data.status);
      return response.data;
    })
    .catch(({ response }) => {
      console.log("check bill err", response);
    });
  return response;
};

// export const addBillingSubscription = ({ ...props }) => {
//   let response = axios
//     .post(`${url}/payment/subscribe`, props.data, {
//       headers: {
//         Accept: "application/json",
//         Authorization: "Bearer " + props.token
//       }
//     })
//     .then(response => {
//       console.log("response add subscription", response.data);
//       ShowToast(response.data.message);
//       return response.data;
//     })
//     .catch(({ response }) => {
//       ShowToast(response.data.message);
//       console.log("addbillingsub error");
//     });
//   return response;
// };

export const deleteBillingSubscription = ({ token }) => {
  let response = axios
    .delete(`${url}/payment/subscribe`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      console.log(response.data);
      ShowToast(`${response.data.message}`);
      return response.data;
    })
    .catch(({ response }) => {
      console.log(response);
      ShowToast(`${response.data.error}`);
    });
  return response;
};

// CreditCard Api
