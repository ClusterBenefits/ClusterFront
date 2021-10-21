import React, { useState } from "react";
import { Modal, View, StatusBar, BackHandler } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { useBackButton } from "../hooks";

import { BarcodeItem } from "./components";

let mainModal;

export function MainModalComponent({}) {
  const [{ isVisible, item, handleFavoriteChange }, setState] = useState({
    isVisible: false,
    item: {},
    handleFavoriteChange: () => {}
  });

  const showModal = ({ item, handleFavoriteChange }) =>
    setState({ isVisible: true, item, handleFavoriteChange });
  const hideModal = () => setState({ isVisible: false, item: {} });

  mainModal = {
    showModal,
    hideModal
  };

  return (
    <Modal
      onRequestClose={() => hideModal()}
      propagateSwipe={true}
      animationType="slide"
      useNativeDriver
      transparent={true}
      position={"bottom"}
      visible={isVisible}
    >
      <>
        {/* with expo , while you have modal opened , status bar disappears and turns into a whiteBar same height ,
       thats why we have this view with statusBar style here  */}
        <View>
          <StatusBar translucent barStyle="dark-content" backgroundColor={"rgba(0,0,0,0.6)"} />
        </View>
        {item && (
          <BarcodeItem
            id={item.id}
            hideModal={hideModal}
            handleFavoriteChange={() => handleFavoriteChange(item)}
          />
        )}
      </>
    </Modal>
  );
}

export const ButtonModal = {
  showModal: ({ item, handleFavoriteChange }) => mainModal.showModal({ item, handleFavoriteChange }),
  hideModal: () => mainModal.hideModal()
};
