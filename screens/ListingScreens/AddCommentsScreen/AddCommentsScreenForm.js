import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";
import {
  Container,
  Button,
  H3,
  Header,
  Left,
  Body,
  Title,
  Form,
  Text
} from "native-base";

import { MyLinearGradient, Icon, MainInput } from "@components/AllComponents";
import T from "prop-types";

commentsForm.propTypes = {
  goBack: T.func,
  onChangeValue: T.func,
  sendMessage: T.func,
  formCredentials: T.object,
  formErrors: T.object
};

export default function commentsForm({
  goBack,
  onChangeValue,
  formCredentials,
  sendMessage,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Container style={styles.container}>
        <Header noShadow style={styles.header}>
          <Left>
            <Button onPress={goBack} bordered style={styles.button}>
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
        <Container style={{ paddingTop: 10 }}>
          <H3 style={{ marginBottom: 10 }}>Leave comment below</H3>
          <Form>
            <MainInput
              placeholder={"Comment"}
              onChangeText={onChangeValue}
              name="myComment"
              value={formCredentials.myComment}
              error={formErrors["myComment"]}
              style={{ textAlignVertical: "top", paddingTop: 5, height: 100 }}
              multiline={true}
            />
          </Form>
          <Button style={styles.button2} onPress={sendMessage}>
            <Text
              uppercase={false}
              style={{
                color: "white",
                fontSize: 18
              }}
            >
              Send
            </Text>
          </Button>
        </Container>
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
  },
  button2: {
    borderRadius: 3,
    backgroundColor: `${colors.blue}`,
    padding: 10,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: "flex-end"
  }
});
