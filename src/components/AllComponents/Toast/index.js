import { Toast } from "native-base";
import { colors } from "../../../constants";

export default function ShowToast(text) {
  Toast.show({
    text: `${text}`,
    buttonText: "Okay",
    duration: 2000,
    textStyle: { color: "white" },
    buttonTextStyle: { color: colors.mainBlue },
    style: { margin: 10, marginBottom: 60, borderRadius: 8 }
  });
}
