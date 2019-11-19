import { Toast } from "native-base";
import { colors } from "../../constants";
import { isIphoneX } from "../../utils";

const marginBottom = isIphoneX ? 102 : 80;

export default function ShowToast(text, warning) {
  Toast.show({
    text: `${text}`,
    buttonText: "Ок",
    duration: warning ? 6000 : 2000,
    textStyle: { color: colors.mainWhite },
    buttonTextStyle: { color: warning ? colors.mainWhite : colors.mainBlue },
    style: { margin: 10, marginBottom: marginBottom, borderRadius: 8 },
    type: warning ? "danger" : null
  });
}
