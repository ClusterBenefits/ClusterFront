import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, H3, Form } from "native-base";
import T from "prop-types";

import {
  MyLinearGradient,
  MainInput,
  SmallBlueButton,
  IconButton
} from "@components/AllComponents";

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
      <Container style={{ justifyContent: "center" }}>
        <H3 style={{ marginBottom: 10 }}>Contact administrator</H3>
        <Form>
          <MainInput
            placeholder="Subject"
            onChangeText={onChangeValue}
            name="subject"
            value={formCredentials.subject}
            error={formErrors["subject"]}
          />
          <MainInput
            placeholder={"Message"}
            onChangeText={onChangeValue}
            name="myComment"
            value={formCredentials.myComment}
            error={formErrors["myComment"]}
            style={{ textAlignVertical: "top", paddingTop: 5, height: 100 }}
            multiline={true}
          />
        </Form>
        <View style={styles.bottom}>
          <IconButton onPress={goBack} text={"Profile"} />
          <SmallBlueButton onPress={sendMessage} text={"Save"} />
        </View>
      </Container>
    </MyLinearGradient>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  }
});
