import React from "react";
import { StyleSheet } from "react-native";
import { Container, Text, H1 } from "native-base";
import T from "prop-types";

import {
  BlueButton,
  LogoImage,
  MyLinearGradient
} from "@components/AllComponents";

const s = StyleSheet.create({
  H1: {
    marginBottom: 20
  },
  text3: {
    marginBottom: 10,
    flex: 1
  }
});

export default function WelcomeForm({ goProfileFillingScreen }) {
  return (
    <MyLinearGradient>
      <Container>
        <LogoImage noBg />
        <H1 style={s.H1}>Welcome!</H1>
        <Text style={s.text3}>
          Eu velit occaecat eu minim minim nostrud et sunt nostrud adipisicing
          ut aliqua sint. Exercitation qui Lorem ea qui fugiat eiusmod id velit.
          Nisi
        </Text>
        <BlueButton text="Гаразд" onPress={goProfileFillingScreen} />
      </Container>
    </MyLinearGradient>
  );
}

WelcomeForm.propTypes = {
  goProfileFillingScreen: T.func.isRequired
};
