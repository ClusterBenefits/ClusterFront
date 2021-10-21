import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Linking,
  Alert
} from "react-native";
import { Text } from "native-base";
import T from "prop-types";
import Barcode from "react-native-barcode-expo";

import { colors, imgUrl } from "../../constants";
import { FavoritesIcon, FavoritesIconOutLine } from "../../assets/svg";
import { BlurView } from "expo-blur";
import { UserContext } from "../../reducers/context";

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
    height: "35%",
    paddingHorizontal: 35,
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
  },
  site: {
    textAlign: "left"
  },
  hyperlink: {
    color: colors.mainBlue
  },
  siteContainer: {
    marginTop: 10,
    paddingHorizontal: 35,
    width: "100%"
  }
});

export default function BarcodeItem({ id, hideModal, handleFavoriteChange }) {
  const {
    state: { items }
  } = useContext(UserContext);

  const { fields = {}, is_favorite = false, image = {} } = items?.data?.find(item => item?.id === id) || {};

  const _goToURL = () =>
    Linking.canOpenURL(fields.site).then(supported => {
      if (supported) {
        Linking.openURL(fields.site);
      } else {
        Alert.alert("Don't know how to open URI: " + fields.site);
      }
    });

    console.log(image.preview_list.url);

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
                source={{ uri: `${imgUrl}${image.preview_list.url}` }}
                resizeMode={"contain"}
                style={s.image}
              />
            </View>
            <ScrollView style={s.descriptionContainer}>
              <View onStartShouldSetResponder={() => true}>
                <Text style={s.descriptionText}>{fields.description}</Text>
              </View>
            </ScrollView>
            <View style={s.siteContainer}>
              <Text>
                {fields.site && (
                  <Text style={s.site}>
                    <Text>Веб-сайт: </Text>
                    <Text style={s.hyperlink} onPress={_goToURL}>
                      {fields.site}
                    </Text>
                  </Text>
                )}
              </Text>
            </View>
            <Barcode value={fields.card_number} format="CODE128" />
            <Text>{fields.card_number}</Text>
            <Text style={s.discountStyle}>{`Знижка ${fields.discount}`}</Text>
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
