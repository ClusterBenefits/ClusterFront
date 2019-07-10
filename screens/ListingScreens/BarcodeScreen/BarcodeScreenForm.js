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
import { colors } from "../../../constants/Colors";
import Barcode from "react-native-barcode-builder";
import { url } from "../../../actions/userActions";
import { MyLinearGradient, Icon, IconButton } from "@components/AllComponents";
import T from "prop-types";

barcode.propTypes = {
  goListingScreen: T.func,
  handleFavoriteChange: T.func,
  goCommentsScreen: T.func,
  item: T.object
};

export default function barcode({
  goListingScreen,
  handleFavoriteChange,
  goCommentsScreen,
  item,
  subscription
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

          {subscription ? (
            <View>
              <Barcode
                value={`${item.fields.discount}`}
                format="CODE128"
                width={3}
                height={height > 535 ? 200 : 140}
              />
              <Text style={styles.big}>{item.fields.discount} %</Text>
            </View>
          ) : (
            <Text>Buy subscription</Text>
          )}
          <TouchableOpacity onPress={() => goCommentsScreen(item)}>
            <H3>Comments</H3>
          </TouchableOpacity>
        </Body>
      </Container>
    </MyLinearGradient>
  );
}

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
