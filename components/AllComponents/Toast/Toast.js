import { Toast } from "native-base";
import T from "prop-types";

ShowToast.propTypes = {
  text: T.string
};

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
