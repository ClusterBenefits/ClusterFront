import axios from "axios";
import { ShowToast } from "@components/AllComponents";
import { url } from "../constants";

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
      console.log("response", response.data);
      return response.data;
    })
    .catch(({ response }) => {
      console.log("err", response);
    });

  return response;
};

// export const pushNotification = async () => {
//   let response = axios
//     .post(
//       "https://exp.host/--/api/v2/push/send",
//       [
//         {
//           to: "ExponentPushToken[xMo4G5DbkdyE--CE8Yo1nK]",
//           sound: "default",
//           body: "myyy nigggaa!"
//         },
//         {
//           to: "ExponentPushToken[OBaTB3JjiFEITrOYskPVV8]",
//           sound: "default",
//           body: "myyy nigggaa!"
//         }
//       ],
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json"
//         }
//       }
//     )
//     .then(response => {
//       console.log(response.data);
//       return response;
//     })
//     .catch(err => console.log(err));
//   return response;
// };

///////// AUTH
export const login = ({ email, password }) => {
  let response = axios
    .post(
      `${url}/api/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    )
    .then(response => {
      return response.data.token;
    })
    .catch(({ response }) => {
      console.log(response.data);
      ShowToast(`error: ${response.data.error}`);
    });

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
    .catch(({ response }) => {
      console.log(response);
      ShowToast(`error: ${response.data.error.email}`);
    });
  return response;
};

///////// AUTH

///////// Password/Email Reset

export const forgotPassword = ({ email, resend }) => {
  let response = axios
    .post(
      `${url}/api/password/forgot`,
      { email },
      { headers: { Accept: "application/json" } }
    )
    .then(response => {
      resend && ShowToast("Код успішно відправлений");
      return response.data;
    })
    .catch(({ response }) => {
      ShowToast(`error: ${response.data.error.email}`);
    });
  return response;
};

export const confirmCodeFromEmail = ({ email, code }) => {
  let response = axios
    .post(`${url}/api/password/confirm`, { email, code })
    .then(response => {
      return response.data.token;
    })
    .catch(({ response }) => {
      console.log(response);
      ShowToast(`error: ${response.data.error.code}`);
    });
  return response;
};

export const resetPassword = ({
  email,
  token,
  password,
  password_confirmation
}) => {
  let data = { email, token, password, password_confirmation };
  let response = axios
    .post(`${url}/api/password/reset`, data)
    .then(response => {
      return response.data;
    })
    .catch(({ response }) => {
      ShowToast(`error: ${response.data.error}`);
    });
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
    .catch(({ response }) => {
      console.log("error", { response });
      ShowToast(`error: ${response.data.error}`);
    });
  return response;
};

export const updateUserAvatar = ({ token, data }) => {
  let response = axios
    .post(`${url}/api/common/files?type=user`, data, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => {
      // return response.data
      console.log(response);
    })
    .catch(({ response }) => {
      console.log({ response });
      ShowToast(`error: ${response.data.error}`);
    });
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
    .catch(({ response }) => {
      ShowToast(`error: ${response.data.error.email}`);
    });
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
      ShowToast("Your password has been changed successfully!");
      return response.data;
    })
    .catch(({ response }) => {
      ShowToast(`error: ${response.data.error.new_password}`);
    });
  return response;
};

/////// User

/////// Favoriter

export const listFavoritesCompanies = token => {
  let results = axios
    .get(`${url}/api/companies/favorites`, {
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
      ShowToast("Item added to favorite list", 2000);
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
      ShowToast("Item removed from favorite list", 2000);
      return response;
    })
    .catch(e => console.log("error removing ", e));
  return response;
};

//////////// Favoriter

////////////Companies

export const listOfCompanies = token => {
  let response = axios
    .get(`${url}/api/companies`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(({ response }) => console.log("failed to load items", response));

  return response;
};

////////////Companies

// Send Messages

export const getItemComments = ({ id, token, page }) => {
  let fetch;
  if (page) {
    fetch = `${url}/api/companies/${id}/comments?page=${page}`;
  } else {
    fetch = `${url}/api/companies/${id}/comments`;
  }
  let response = axios
    .get(fetch, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(({ response }) => {
      ShowToast(`error: ${response.data.error}`);
    });
  return response;
};

export const sendMessageToAdmins = ({
  name,
  email,
  subject,
  comment,
  token
}) => {
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
      ShowToast("Message has been sent successfully");
      return response.data;
    })
    .catch(({ response }) => {
      console.log("error", response);
      ShowToast(`error: ${response.data.error}`);
    });

  return response;
};
export const sendComments = ({ message, token, id }) => {
  let response = axios
    .post(
      `${url}/api/companies/comment`,
      { company_id: id, message },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token
        }
      }
    )
    .then(response => {
      ShowToast("Message has been sent successfully");
      return response;
    })
    .catch(({ response }) => {
      console.log("error", response);
      ShowToast(`error: ${response.data.error}`);
    });
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
  let response = axios
    .post(`${url}/api/user/payment/subscribe`, props.data, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + props.token
      }
    })
    .then(response => {
      console.log("response addsubscription", response.data);
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
      ShowToast(`error: ${response.data.error}`);
    });
  return response;
};

// CreditCard Api
