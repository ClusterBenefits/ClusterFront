import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, H3, Header, Left, Body, Title, Form } from "native-base";
import T from "prop-types";

import { MyLinearGradient, MainInput, SmallBlueButton, IconButton } from "@components/AllComponents";

export default function commentsForm({ goBack, onChangeValue, addComment, formCredentials, formErrors }) {
  return (
    <MyLinearGradient>
      <Container style={styles.container}>
        <Header noShadow style={styles.header}>
          <Left>
            <IconButton fontSize={16} onPress={goBack} name="left" text={"Back"} size={20} marginLeft={0.1} />
          </Left>
          <Body>
            <Title />
          </Body>
        </Header>
        <Container style={{ paddingTop: 10 }}>
          <H3 style={{ marginBottom: 10 }}>Leave comment below</H3>
          <Form>
            <MainInput
              placeholder={"Comment"}
              onChangeText={onChangeValue}
              name="myComment"
              value={formCredentials.myComment}
              error={formErrors["myComment"]}
              style={{
                textAlignVertical: "top",
                paddingTop: 5,
                height: 100
              }}
              multiline={true}
            />
          </Form>
          <View style={{ alignSelf: "flex-end" }}>
            <SmallBlueButton onPress={addComment} text={"Send"} />
          </View>
        </Container>
      </Container>
    </MyLinearGradient>
  );
}
commentsForm.propTypes = {
  goBack: T.func.isRequired,
  onChangeValue: T.func.isRequired,
  addComment: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired
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
