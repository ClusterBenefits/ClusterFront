import React from "react";
import { StyleSheet, TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import { Text } from "native-base";
import T from "prop-types";
import Barcode from "react-native-barcode-builder";

import { colors } from "../../constants";
import { FavoritesIcon, FavoritesIconOutLine } from "../../assets/svg";
import { BlurView } from "expo-blur";

const s = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "90%",
    backgroundColor: colors.mainWhite,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  topPartContainer: {
    width: "100%",
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15
  },
  discountStyle: {
    color: colors.mainGrey,
    lineHeight: 20,
    marginTop: 13,
    marginBottom: 8
  },
  imageContainer: {
    marginHorizontal: 10,
    maxHeight: 62,
    maxWidth: "90%",
    justifyContent: "center"
  },
  companyName: {
    fontSize: 20,
    fontWeight: "500"
  },
  leftItem: {
    width: 20
  },
  flexMax: {
    flex: 1
  }
});

export default function BarcodeItem({ item: { fields = {}, featured = false }, hideModal }) {
  return (
    <BlurView style={s.flexMax} tint="dark" intensity={100}>
      <TouchableOpacity style={s.modalContainer} onPress={hideModal} activeOpacity={1}>
        <TouchableWithoutFeedback>
          <View style={s.container}>
            <View style={s.topPartContainer}>
              <View style={s.leftItem} />
              <View style={s.imageContainer}>
                <Text style={s.companyName}>{fields.name}</Text>
              </View>
              {featured ? <FavoritesIcon fill={colors.mainRed} /> : <FavoritesIconOutLine />}
            </View>
            <Barcode value={`${fields.discount}`} format="CODE128" width={2} height={80} />
            <Text>{fields.card_number}</Text>
            <Text style={s.discountStyle}>{`Знижка ${fields.discount} %`}</Text>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </BlurView>
  );
}

BarcodeItem.propTypes = {
  item: T.object.isRequired,
  hideModal: T.func.isRequired
};
