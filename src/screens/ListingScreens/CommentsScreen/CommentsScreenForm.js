import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { Container, H3, Header, Left, Body, Title } from "native-base";
import T from "prop-types";

import { MyLinearGradient, MainComment, IconButton } from "../../../components";

export default function commentsForm({
  goBarcodeScreen,
  goAddCommentsScreen,
  handleLoadMore,
  comments,
  refreshing
}) {
  return (
    <MyLinearGradient>
      {/* <Container style={styles.container}>
        <Header noShadow style={styles.header}>
          <Left>
            <IconButton
              fontSize={16}
              onPress={goBarcodeScreen}
              name="left"
              text={"Back"}
              size={20}
              marginLeft={0.1}
            />
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
      </Container> */}
    </MyLinearGradient>
  );
}

commentsForm.propTypes = {
  goBarcodeScreen: T.func.isRequired,
  goAddCommentsScreen: T.func.isRequired,
  handleLoadMore: T.func.isRequired,
  comments: T.object.isRequired,
  refreshing: T.bool.isRequired
};

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
  }
});
