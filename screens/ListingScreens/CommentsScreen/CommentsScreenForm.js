import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
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
  Title
} from "native-base";
import { MyLinearGradient, Icon, MainComment } from "@components/AllComponents";
import T from "prop-types";

commentsForm.propTypes = {
  goBarcodeScreen: T.func,
  goAddCommentsScreen: T.func,
  userInfo: T.object
};

export default function commentsForm({
  goBarcodeScreen,
  goAddCommentsScreen,
  handleLoadMore,
  comments,
  refreshing
}) {
  return (
    <MyLinearGradient>
      <Container style={styles.container}>
        <Header noShadow style={styles.header}>
          <Left>
            <Button onPress={goBarcodeScreen} bordered style={styles.button}>
              <Icon name="left" color="white" size={20} />
              <Text uppercase={false} style={{ color: "white" }}>
                Back
              </Text>
            </Button>
          </Left>
          <Body>
            <Title />
          </Body>
        </Header>
        <Body style={{ width: "100%" }}>
          <H3>Comments</H3>
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {Object.keys(comments).length > 1 && comments.data.length > 0 ? (
              <FlatList
                data={comments.data}
                keyExtractor={item => Math.random().toString()}
                renderItem={({ item }) => <MainComment item={item} />}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
              />
            ) : (
              <View
                style={{
                  alignSelf: "flex-start",
                  marginLeft: 10
                }}
              >
                <H3>No comments yet</H3>
              </View>
            )}

            {refreshing ? (
              <ActivityIndicator size="large" color="white" />
            ) : null}
            <TouchableOpacity onPress={goAddCommentsScreen}>
              <H3
                style={{
                  marginTop: 10
                }}
              >
                Add Comment
              </H3>
            </TouchableOpacity>
          </View>
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
  button: {
    borderColor: "transparent",
    padding: 10
  }
});
