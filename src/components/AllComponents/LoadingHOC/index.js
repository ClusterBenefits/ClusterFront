import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { UserContext } from "../../../reducers/context";

function WithLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    const { state, dispatch } = useContext(UserContext);
    if (!isLoading)
      return <Component {...props} state={state} dispatch={dispatch} />;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };
}
export default WithLoading;
