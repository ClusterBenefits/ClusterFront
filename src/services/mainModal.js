import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from "react-native";
import { H3, Text, Button } from "native-base";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { colors, screens } from "../constants";

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
  }
});

let mainModal;

export function MainModalComponent() {
  const [{ isVisible, navigation }, setState] = useState({ isVisible: false });

  const showModal = navigation => setState({ isVisible: true, navigation });
  const hideModal = () => setState({ isVisible: false });

  mainModal = {
    showModal,
    hideModal
  };

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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      setImage({ image: result.uri });
    }
    hideModal();
  };

  const _showCamera = () => {
    navigation.navigate(screens.CameraScreen);
    hideModal();
  };

  return (
    <Modal
      animationType="slide"
      useNativeDriver
      transparent={true}
      position={"bottom"}
      onDismiss={hideModal}
      visible={isVisible}
    >
      <View style={s.modalContainer}>
        <View style={{ flex: 1 }} />

        <View style={s.buttonContainer}>
          <Button
            full
            onPress={() => _pickImage()}
            style={[s.buttonStyle, s.imageButtonStyle]}
          >
            <Text style={s.buttonText}>Обрати фото</Text>
          </Button>
          <Button
            full
            onPress={() => _showCamera()}
            style={[s.buttonStyle, s.cameraButtonStyle]}
          >
            <Text style={s.buttonText}>Відкрити камеру</Text>
          </Button>

          <Button
            full
            onPress={() => hideModal()}
            style={[s.buttonStyle, s.cancelButtonStyle]}
          >
            <Text style={s.buttonText}>Скасувати</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

export const ButtonModal = {
  showModal: navigation => mainModal.showModal(navigation),
  hideModal: () => mainModal.hideModal()
};
