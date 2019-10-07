import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  TouchableWithoutFeedback
} from "react-native";
import { Text } from "native-base";
import T from "prop-types";
import Barcode from "react-native-barcode-builder";

import { colors, url } from "../../constants";
import { FavoritesIcon, FavoritesIconOutLine } from "../../assets/svg";
import { BlurView } from "expo-blur";

const s = StyleSheet.create({
  container: {
    height: 250,
    width: 340,
    backgroundColor: colors.mainWhite,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  discountStyle: {
    color: colors.mainGrey,
    lineHeight: 20,
    marginTop: 15,
    marginBottom: 8
  },
  imageContainer: {
    marginLeft: 22,
    maxHeight: 64,
    maxWidth: 132,
    justifyContent: "center"
  },
  image: {
    height: 64,
    width: 64
  }
});

export default function BarcodeItem({
  item: { fields = {}, image = {} },
  hideModal
}) {
  return (
    <BlurView style={{ flex: 1 }} tint="dark" intensity={100}>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onPress={hideModal}
      >
        <TouchableWithoutFeedback>
          <View style={s.container}>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 25,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 15
              }}
            >
              <View />
              <View style={s.imageContainer}>
                <Image
                  source={{ uri: `${url}${image.tiny.url}` }}
                  style={s.image}
                />
              </View>
              {true ? (
                <FavoritesIcon fill={colors.mainRed} />
              ) : (
                <FavoritesIconOutLine />
              )}
            </View>
            <Barcode
              value={`${fields.discount}`}
              format="CODE128"
              width={2}
              height={80}
            />
            <Text>{fields.discount} %</Text>
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
