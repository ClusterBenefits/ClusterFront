import { Toast } from "native-base";
import { colors } from "../../constants";
import { isIphoneX } from "../../utils";

const marginBottom = isIphoneX ? 102 : 80;

export default function ShowToast(text) {
  Toast.show({
    text: `${text}`,
    buttonText: "Okay",
    duration: 2000,
    textStyle: { color: "white" },
    buttonTextStyle: { color: colors.mainBlue },
    style: { margin: 10, marginBottom: marginBottom, borderRadius: 8 }
  });
}
