import React from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";

function WithLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , height: Dimensions.get('window').height, width:  Dimensions.get('window').width}}>
        <ActivityIndicator  size="large" />
      </View>
    );
  };
}
export default WithLoading;
