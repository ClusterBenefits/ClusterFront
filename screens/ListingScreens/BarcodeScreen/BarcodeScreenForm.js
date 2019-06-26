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
  Button,
  H2,
  H3,
  Header,
  Left,
  Text,
  Body,
  Right
} from "native-base";
import Barcode from "react-native-barcode-builder";
import { url } from "../../../actions/userActions";
import { MyLinearGradient, Icon } from "@components/AllComponents";
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
  item
}) {
  const height = Dimensions.get("window").height;

  return (
    <MyLinearGradient>
      <Container style={styles.container}>
        <Header noShadow style={styles.header}>
          <Left>
            <Button onPress={goListingScreen} bordered style={styles.button}>
              <Icon name="left" color="white" size={20} />
              <Text uppercase={false} style={{ color: "white" }}>
                Back
              </Text>
            </Button>
          </Left>
          {/* <Body>
            <Title>Header</Title>
          </Body> */}
          <Right>
            <TouchableOpacity onPress={() => handleFavoriteChange(item)}>
              {item.featured ? (
                <Icon name="star" color="#ffcd02" size={30} />
              ) : (
                <Icon name="star-empty" color="#ffcd02" size={30} />
              )}
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
  button: {
    borderColor: "transparent",
    padding: 10
  },
  image: {
    height: 100,
    width: 100
  },
  h2: {
    marginTop: 5
  }
});
