import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import {
  Container,
  H2,
  H3,
  Header,
  Left,
  Text,
  Body,
  Right
} from "native-base";
import T from "prop-types";
import Barcode from "react-native-barcode-builder";

import { colors } from "../../../constants/Colors";
import { url } from "../../../actions/userActions";
import { MyLinearGradient, Icon, IconButton } from "@components/AllComponents";

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 0
  },
  header: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#c9c9c9",
    height: 40
  },
  top: {
    alignItems: "center"
  },
  big: {
    textAlign: "center",
    fontSize: 40,
    color: "white"
  },
  image: {
    height: 100,
    width: 100
  },
  h2: {
    marginTop: 5
  }
});

export default function BardCodeForm({
  goListingScreen,
  handleFavoriteChange,
  goCommentsScreen,
  item
}) {
  const height = Dimensions.get("window").height;
  return (
    <MyLinearGradient>
      <Container style={styles.container}>
        <Header noShadow style={styles.header}>
          <Left>
            <IconButton
              fontSize={16}
              onPress={goListingScreen}
              name="left"
              text={"Back"}
              size={20}
              marginLeft={0.1}
            />
          </Left>
          <Right>
            <TouchableOpacity onPress={() => handleFavoriteChange(item)}>
              <Icon
                name={item.featured ? "star" : "star-empty"}
                color={colors.orange}
                size={30}
              />
            </TouchableOpacity>
          </Right>
        </Header>
        <Body style={{ justifyContent: "space-around" }}>
          <View style={styles.top}>
            <Image
              source={{ uri: `${url}${item.image.tiny.url}` }}
              style={styles.image}
            />
            <H2 style={styles.h2}> {item.fields.name}</H2>
          </View>

          <View>
            <Barcode
              value={`${item.fields.discount}`}
              format="CODE128"
              width={3}
              height={height > 535 ? 200 : 140}
            />
            <Text style={styles.big}>{item.fields.discount} %</Text>
          </View>

          <TouchableOpacity onPress={() => goCommentsScreen(item)}>
            <H3>Comments</H3>
          </TouchableOpacity>
        </Body>
      </Container>
    </MyLinearGradient>
  );
}

BardCodeForm.propTypes = {
  goListingScreen: T.func.isRequired,
  handleFavoriteChange: T.func.isRequired,
  goCommentsScreen: T.func.isRequired,
  item: T.object.isRequired
};
