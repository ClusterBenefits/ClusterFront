import React, { useState } from "react";
import { Modal } from "react-native";

import { BarcodeItem } from "./components";
import ImageButtons from "./components/ImageButtons";

let mainModal;

export function MainModalComponent() {
  const [{ isVisible, navigation, item }, setState] = useState({
    isVisible: false,
    item: null
  });

  const showModal = ({ navigation, item }) =>
    setState({ isVisible: true, navigation, item });
  const hideModal = () => setState({ isVisible: false, item: null });

  mainModal = {
    showModal,
    hideModal
  };

  return (
    <Modal
      animationType="slide"
      useNativeDriver
      transparent={true}
      position={"bottom"}
      visible={isVisible}
    >
      <>
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
  showModal: ({ navigation, item }) =>
    mainModal.showModal({ navigation, item }),
  hideModal: () => mainModal.hideModal()
};
