import { Toast } from "native-base";

export default function ShowToast(text) {
  Toast.show({
    text: `${text}`,
    buttonText: "Okay",
    duration: 3000,
    textStyle: { color: "white" },
    buttonTextStyle: { color: "white" },
    buttonStyle: { backgroundColor: "#5cb85c" },
    style: { margin: 10, opacity: 0.8, marginBottom: 60 }
  });
}
