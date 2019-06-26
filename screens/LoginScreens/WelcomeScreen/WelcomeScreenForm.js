import React from "react";
import { StyleSheet } from "react-native";
import { Container, Form, Text, H1, H3 } from "native-base";
import {
  BlueButton,
  LogoImage,
  MyLinearGradient
} from "@components/AllComponents";
import T from "prop-types";

welcome.propTypes = {
  goProfileFillingScreen: T.func
};

export default function welcome({ goProfileFillingScreen }) {
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

const styles = StyleSheet.create({
  text3: {
    marginBottom: 10,
    marginLeft: 5
  }
});
