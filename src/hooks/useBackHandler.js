import { useEffect } from "react";
import { BackHandler, Alert } from "react-native";

const handleBackButton = status => {
  Alert.alert(
    "Exit App",
    "Exiting the application?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => BackHandler.exitApp()
      }
    ],
    {
      cancelable: false
    }
  );
  return true;
};

function useBackButton(status) {
  useEffect(() => {
    status
      ? BackHandler.addEventListener("hardwareBackPress", handleBackButton)
      : BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    return () => {
      status
        ? BackHandler.removeEventListener("hardwareBackPress", handleBackButton)
        : BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);
}

export default useBackButton;
