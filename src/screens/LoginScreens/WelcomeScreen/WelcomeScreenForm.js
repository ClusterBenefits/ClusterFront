import React from "react";
import { StyleSheet } from "react-native";
import { Container, Form, Text, H1 } from "native-base";
import T from "prop-types";

import {
  BlueButton,
  LogoImage,
  MyLinearGradient
} from "@components/AllComponents";

export default function WelcomeForm({ goProfileFillingScreen }) {
  return (
    <MyLinearGradient>
      <Container>
        <LogoImage />
        <H1>Welcome</H1>
        <Text style={styles.text3}>
          Eu velit occaecat eu minim minim nostrud et sunt nostrud adipisicing
          ut aliqua sint. Exercitation qui Lorem ea qui fugiat eiusmod id velit.
          Nisi
        </Text>
        <BlueButton
          text="Complete registration"
          onPress={goProfileFillingScreen}
        />
        <Form />
      </Container>
    </MyLinearGradient>
  );
}

WelcomeForm.propTypes = {
  goProfileFillingScreen: T.func.isRequired
};

const styles = StyleSheet.create({
  text3: {
    marginBottom: 10,
    marginLeft: 5
  }
});
