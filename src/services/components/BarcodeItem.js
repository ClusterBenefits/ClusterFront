import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View, TouchableWithoutFeedback, Image } from "react-native";
import { Text } from "native-base";
import T from "prop-types";
import Barcode from "react-native-barcode-expo";

import { colors } from "../../constants";
import { FavoritesIcon, FavoritesIconOutLine } from "../../assets/svg";
import { BlurView } from "expo-blur";
import { UserContext } from "../../reducers/context";
import { url } from "../../constants";

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
    marginHorizontal: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  companyName: {
    fontSize: 20,
    fontWeight: "500"
  },
  descriptionContainer: {
    paddingHorizontal: 25,
    paddingBottom: 10
  },
  descriptionText: {
    fontSize: 14,
    textAlign: "justify"
  },
  leftItem: {
    width: 10
  },
  flexMax: {
    flex: 1
  },
  imageCompanyContainer: {
    height: 94,
    width: 94,
    justifyContent: "center",
    marginBottom: 10
  },
  image: {
    height: 94,
    resizeMode: "contain",
    width: 94
  }
});

export default function BarcodeItem({ id, hideModal, handleFavoriteChange }) {
  const {
    state: { items }
  } = useContext(UserContext);

  const { fields = {}, is_favorite = false, image = {} } = items.data.find(item => item.id === id) || {};
  return (
    <BlurView style={s.flexMax} tint="dark" intensity={100}>
      <TouchableOpacity style={s.modalContainer} onPress={hideModal} activeOpacity={1}>
        <TouchableWithoutFeedback>
          <View style={s.container}>
            <View style={s.topPartContainer}>
              <View style={s.leftItem} />
              <View style={s.imageContainer}>
                <Text numberOfLines={2} style={s.companyName}>
                  {fields.name}
                </Text>
              </View>
              <TouchableOpacity onPress={handleFavoriteChange}>
                {is_favorite ? <FavoritesIcon fill={colors.mainRed} /> : <FavoritesIconOutLine />}
              </TouchableOpacity>
            </View>
            <View style={s.imageCompanyContainer}>
              <Image
                source={{ uri: `${url}${image.preview_list.url}` }}
                resizeMode={"contain"}
                style={s.image}
              />
            </View>
            <View style={s.descriptionContainer}>
              <Text style={s.descriptionText}>{fields.description}</Text>
            </View>
            <Barcode value={`${fields.card_number}`} format="CODE128" />
            <Text>{fields.card_number}</Text>
            <Text style={s.discountStyle}>{`Знижка ${fields.discount} %`}</Text>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </BlurView>
  );
}

BarcodeItem.propTypes = {
  id: T.number,
  handleFavoriteChange: T.func,
  hideModal: T.func
};
