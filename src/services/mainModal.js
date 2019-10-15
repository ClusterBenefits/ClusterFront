import React, { useState } from "react";
import { Modal, View, StatusBar } from "react-native";

import { BarcodeItem } from "./components";
import ImageButtons from "./components/ImageButtons";
// import {  } from "../components/AllComponents";

let mainModal;

export function MainModalComponent() {
  const [{ isVisible, navigation, item }, setState] = useState({
    isVisible: false,
    item: null
  });

  const showModal = ({ navigation, item }) => setState({ isVisible: true, navigation, item });
  const hideModal = () => setState({ isVisible: false, item: null });

  mainModal = {
    showModal,
    hideModal
  };

  return (
    <Modal animationType="slide" useNativeDriver transparent={true} position={"bottom"} visible={isVisible}>
      <>
        {/* with expo , while you have modal opened , status bar disappears and turns into a whiteBar same height ,
       thats why we have this view with statusBar style here  */}
        <View>
          <StatusBar translucent barStyle="dark-content" backgroundColor={"rgba(0,0,0,0.6)"} />
        </View>
        {item ? (
          <BarcodeItem item={item} hideModal={hideModal} />
        ) : (
          <ImageButtons hideModal={hideModal} navigation={navigation} />
        )}
      </>
    </Modal>
  );
}

export const ButtonModal = {
  showModal: ({ navigation, item }) => mainModal.showModal({ navigation, item }),
  hideModal: () => mainModal.hideModal()
};
