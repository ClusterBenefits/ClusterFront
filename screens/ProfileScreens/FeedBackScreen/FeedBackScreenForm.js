import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { H3, Form } from "native-base";
import T from "prop-types";

import {
  MyLinearGradient,
  MainInput,
  SmallBlueButton,
  IconButton
} from "@components/AllComponents";

export default function commentsForm({
  goBack,
  onChangeValue,
  formCredentials,
  sendMessage,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          flexGrow: 1
        }}
        style={{ paddingHorizontal: 20, marginTop: 30, marginBottom: 20 }}
      >
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
      </ScrollView>
    </MyLinearGradient>
  );
}

commentsForm.propTypes = {
  goBack: T.func.isRequired,
  onChangeValue: T.func.isRequired,
  sendMessage: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 5
  }
});
