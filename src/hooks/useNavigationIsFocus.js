import { useEffect } from "react";

function useNavigationIsFocus(navigation, callback) {
  return useEffect(() => {
    callback(navigation.isFocused());

    const subscribeBlur = navigation.addListener("didBlur", () => {
      callback(false);
    });
    const subscribeFocus = navigation.addListener("didFocus", () => {
      callback(true);
    });
    return () => {
      subscribeBlur.remove();
      subscribeFocus.remove();
    };
  }, [callback]);
}

export default useNavigationIsFocus;
