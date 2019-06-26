import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../../constants/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { Container, Button, H3, Form } from "native-base";
import { MyLinearGradient, MainInput } from "@components/AllComponents";
import T from "prop-types";

commentsForm.propTypes = {
  goBack: T.func,
  onChangeValue: T.func,
  userInfo: T.object
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
          <Button onPress={goBack} bordered style={styles.button}>
            <Icon
              style={{ marginRight: 10 }}
              name="md-arrow-back"
              color="white"
              size={25}
            />
            <Text style={{ fontSize: 18, color: "white" }}>Profile</Text>
          </Button>
          <Button
            style={styles.button2}
            onPress={sendMessage}
            textTransform="none"
          >
            <Text style={{ color: "white", fontSize: 18 }}>Send</Text>
          </Button>
        </View>
      </Container>
    </MyLinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: "transparent",
    padding: 10
  },
  button2: {
    borderRadius: 3,
    backgroundColor: `${colors.blue}`,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  }
});
