import { AsyncStorage } from "react-native";

export const saveDataToLocalStorage = async ({ email, password }) => {
  try {
    email && (await AsyncStorage.setItem("email", email));
    password && (await AsyncStorage.setItem("password", password));
  } catch (error) {
    console.log(error.message);
  }
};

export const getDataFromLocalStorage = async () => {
  let email = (await AsyncStorage.getItem("email")) || "none";
  let password = (await AsyncStorage.getItem("password")) || "none";
  return { email, password };
};
