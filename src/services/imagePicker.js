import React, { useState, useContext } from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
  Image,
  Button
} from "react-native";

import { MyLinearGradient, Header } from "@components/AllComponents";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
// import { UserContext } from "./reducers/context";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  catagoryContainer: {
    height: 56,
    marginLeft: 0
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  icon: {
    alignItems: "center",
    width: 50,
    marginRight: 20
  },
  left: {
    margin: 5
  },
  lastItemMargin: {
    marginTop: 20
  }
});

let mainModal;

export function ImagePickerFunction() {
  // const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState(null);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  getPermissionAsync();

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      setImage({ image: result.uri });
    }
  };

  _pickImage();
  // return (
  //   <MyLinearGradient withScroll style={styles.container}>
  //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //       <Button title="Pick an image from camera roll" onPress={_pickImage} />
  //       {image && (
  //         <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
  //       )}
  //     </View>

  //   </MyLinearGradient>
  // );
  return image;
}
