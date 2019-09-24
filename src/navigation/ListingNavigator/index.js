import { createStackNavigator } from "react-navigation";
import {
  ListingScreen,
  BarcodeScreen,
  CommentsScreen,
  AddCommentsScreen
} from "../../screens";
import { screens } from "../../constants";

export default createStackNavigator(
  {
    [screens.ListingScreen]: ListingScreen,
    [screens.BarcodeScreen]: BarcodeScreen,
    [screens.CommentsScreen]: CommentsScreen,
    [screens.AddCommentsScreen]: AddCommentsScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
