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
      `${url}/api/user/attach-token`,
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
    .post(`${url}/api/login`, { email, password }, { headers: { "Content-Type": "application/json" } })
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
    .post(`${url}/api/register`, data, {
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
    .post(`${url}/api/password/forgot`, { email }, { headers: { Accept: "application/json" } })
    .then(response => {
      resend && ShowToast("Код успішно відправлений");
      return response.data;
    })
    .catch(errorHandler);
  return response;
};

export const confirmCodeFromEmail = ({ email, code }) => {
  let response = axios
    .post(`${url}/api/password/confirm`, { email, code })
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
  console.log("fetching userInfo data");
  let response = axios
    .get(`${url}/api/user`, { headers: { Authorization: "Bearer " + token } })
    .then(response => {
      return response.data;
    })
    .catch(err => console.log(err));
  return response;
};

export const updateUserInformation = ({ token, data }) => {
  let response = axios
    .post(`${url}/api/user`, data, {
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
      `${url}/api/user/change-email`,
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
    .post(`${url}/api/user/change-password`, data, {
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
    .get(`${url}/api/companies/favorites?page=${page}`, {
      headers: { Authorization: "Bearer " + token }
    })
    .then(response => {
      return response.data;
    })
    .catch(e => console.log("failed to load favorite items", e));
  return results;
};

export const attachToFavorites = ({ token, id }) => {
  console.log("adding item", id);
  let data = { company_id: id };
  let response = axios
    .post(`${url}/api/companies/favorites`, data, {
      headers: { Accept: "application/json", Authorization: "Bearer " + token }
    })
    .then(response => {
      console.log("attachedfavorite response");
      ShowToast("Додано до улюбленого списку");
      return response;
    })
    .catch(e => console.log("failed to add", e));

  return response;
};

export const removeFromFavorites = ({ token, id }) => {
  console.log("removing item id = ", id);
  let response = axios
    .delete(`${url}/api/companies/favorites/${id}`, {
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
    .get(`${url}/api/companies?page=${page}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
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
      `${url}/api/feedback`,
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

export const checkBillingSubscription = token => {
  let response = axios
    .get(`${url}/api/user/payment/subscribe`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(({ response }) => {
      console.log("check bill err ");
    });
  return response;
};

export const addBillingSubscription = ({ ...props }) => {
  console.log(props.data);
  let response = axios
    .post(`${url}/api/user/payment/subscribe`, props.data, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + props.token
      }
    })
    .then(response => {
      console.log("response add subscription", response.data);
      ShowToast(response.data.message);
      return response.data;
    })
    .catch(({ response }) => {
      ShowToast(response.data.message);
      console.log("addbillingsub error");
    });
  return response;
};

export const deleteBillingSubscription = ({ token }) => {
  let response = axios
    .delete(`${url}/api/user/payment/subscribe`, {
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
