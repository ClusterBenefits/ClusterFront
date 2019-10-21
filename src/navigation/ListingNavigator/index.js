import { createStackNavigator } from "react-navigation";
import { ListingScreen } from "../../screens";
import { screens } from "../../constants";

export default createStackNavigator(
  {
    [screens.ListingScreen]: ListingScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
