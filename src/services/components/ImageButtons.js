import React, { useState, useEffect, useCallback, useContext } from "react";
import { Modal, StyleSheet, View, TouchableOpacity, TouchableHighlight, Image } from "react-native";

import T from "prop-types";
import { H3, Text, Button } from "native-base";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { BlurView } from "expo-blur";
import { colors, screens } from "../../constants";
import { postUserAvatar } from "../../actions/userActions";
import { UserContext } from "../../reducers/context";

const s = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.modalBg
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 15,
    marginBottom: 10
  },
  buttonStyle: {
    backgroundColor: colors.mainWhite,
    height: 60
  },
  imageButtonStyle: {
    borderTopStartRadius: 13,
    borderTopRightRadius: 13
  },
  cameraButtonStyle: {
    borderTopWidth: 1,
    borderTopColor: colors.mainGrey,
    borderBottomStartRadius: 13,
    borderBottomRightRadius: 13
  },
  cancelButtonStyle: {
    borderRadius: 13,
    marginTop: 10
  },

  buttonText: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "600",
    color: colors.mainBlue
  },
  flexMax: {
    flex: 1
  }
});

export default function ImageButtons({ hideModal, navigation = {} }) {
  const { state, dispatch } = useContext(UserContext);

  const { token } = state;

  const [image, setImage] = useState(null);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const _pickImage = async () => {
    getPermissionAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [3, 3]
    });

    console.log(result, "result here");

    if (result.cancelled) {
      // setImage({ image: result.uri });
      // console.log(result);
      return;
    }

    const uriParts = result.uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    const payloadKey = "file"; // Define PayloadKey here Ex. 'file'
    const formData = new FormData();

    formData.append(payloadKey, {
      id: "avatar",
      name: "avatar",
      uri: result.uri,
      // name: result.uri.split("/").pop(),
      type: `image/${fileType}`
    });

    console.log("hererere", formData);

    await postUserAvatar({
      dispatch,
      token: state.token,
      data: formData
    });

    hideModal();
  };

  const _showCamera = () => {
    navigation.navigate(screens.CameraScreen);
    hideModal();
  };

  return (
    <View style={s.modalContainer}>
      <View style={s.flexMax} />

      <View style={s.buttonContainer}>
        <Button full onPress={() => _pickImage()} style={[s.buttonStyle, s.imageButtonStyle]}>
          <Text style={s.buttonText}>Обрати фото</Text>
        </Button>
        <Button full onPress={() => _showCamera()} style={[s.buttonStyle, s.cameraButtonStyle]}>
          <Text style={s.buttonText}>Відкрити камеру</Text>
        </Button>

        <Button full onPress={() => hideModal()} style={[s.buttonStyle, s.cancelButtonStyle]}>
          <Text style={s.buttonText}>Скасувати</Text>
        </Button>
      </View>
    </View>
  );
}

ImageButtons.propTypes = {
  navigation: T.object,
  hideModal: T.func.isRequired
};
