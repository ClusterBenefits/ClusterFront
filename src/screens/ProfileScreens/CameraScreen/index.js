import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

const initialState = {
  hasCameraPermission: null,
  type: Camera.Constants.Type.back
};

export default function CameraScreen() {
  const [{ hasCameraPermission, type }, setState] = useState({ initialState });

  useEffect(() => {
    const asyncFunction = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setState({ hasCameraPermission: status === "granted" });
    };
    asyncFunction();
  });

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={s.container}>
        <Camera style={s.camera} type={type}>
          <View style={s.closeContainer}>
            <TouchableOpacity>
              <View style={s.switchCameraIcon} />
              {/* <FastImage source={closeLightIcon} style={s.close} /> */}
            </TouchableOpacity>
          </View>
          <View style={s.buttonContainer}>
            <TouchableOpacity style={s.takePhotoIconButton}>
              <View style={s.switchCameraIcon} />
              {/* <FastImage source={takePhotoIcon} style={s.takePhotoIcon} /> */}
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={switchCamera}
              style={s.switchCameraIconButton}
            >
              {/* <FastImage source={switchCameraIcon} style={s.switchCameraIcon} /> */}
              <View style={s.switchCameraIcon} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}
const { width, height } = Dimensions.get("window");
export const DEFAULT_QUALITY = 0.8;
export const DEFAULT_SIZE_TAKE_PHOTO_ICON = 68;
export const DEFAULT_SIZE_SWITCH_CAMERA_ICON = 25;
export const DEFAULT_SIZE_CLOSE_ICON = 25;

const DEFAULT_BOTTOM_MARGIN_SWITCH_CAMERA = 50;
const DEFAULT_LEFT_POSITION = 45;

const s = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "black"
  },
  camera: {
    width,
    height
  },
  closeContainer: {
    position: "absolute",
    top: 0,
    left: 0
  },
  close: {
    margin: 16,
    width: DEFAULT_SIZE_CLOSE_ICON,
    height: DEFAULT_SIZE_CLOSE_ICON
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: DEFAULT_BOTTOM_MARGIN_SWITCH_CAMERA
  },
  takePhotoIcon: {
    height: DEFAULT_SIZE_TAKE_PHOTO_ICON,
    width: DEFAULT_SIZE_TAKE_PHOTO_ICON
  },
  switchCameraIcon: {
    height: DEFAULT_SIZE_SWITCH_CAMERA_ICON,
    width: DEFAULT_SIZE_SWITCH_CAMERA_ICON,
    backgroundColor: "yellow",
    overflow: "visible"
  },
  switchCameraIconButton: {
    height: DEFAULT_SIZE_SWITCH_CAMERA_ICON,
    width: DEFAULT_SIZE_SWITCH_CAMERA_ICON,
    marginLeft: DEFAULT_LEFT_POSITION
  },
  takePhotoIconButton: {
    position: "relative",
    marginLeft: DEFAULT_LEFT_POSITION * 1.5
  }
});
