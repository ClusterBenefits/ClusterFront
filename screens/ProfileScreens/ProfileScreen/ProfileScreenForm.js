import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Container, H3, Text } from "native-base";
import T from "prop-types";

import { MyLinearGradient, Icon, IconButton } from "@components/AllComponents";

export default function ProfileForm({
  goProfileEditScreen,
  goChangeEmailScreen,
  goChangePasswordScreen,
  goAddCommentScreen,
  goBillingInformation,
  signOutUser,
  userInfo
}) {
  const {
    first_name = "first_name",
    last_name = "LastName",
    position = "Position",
    company = "Organization"
  } = userInfo;

  return (
    <MyLinearGradient>
      <Container style={styles.container}>
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <View>
            <View style={styles.row}>
              <H3 style={{ marginLeft: 0, flex: 1 }}>Profile</H3>
              <IconButton
                onPress={goProfileEditScreen}
                text={"Edit"}
                size={24}
                fontSize={20}
                name={"pencil"}
                marginLeft={-5}
              />
            </View>

            <View style={{ flexDirection: "row", margin: 15 }}>
              <View style={styles.test}>
                <Text style={styles.left}>FIRST NAME:</Text>
                <Text style={styles.left}>LAST NAME:</Text>
                <Text style={styles.left}>COMPANY:</Text>
                <Text style={styles.left}>POSITION:</Text>
              </View>
              <View style={styles.test}>
                <Text style={styles.left}>{first_name}</Text>
                <Text style={styles.left}>{last_name}</Text>
                <Text style={styles.left}>{company}</Text>
                <Text style={styles.left}>{position}</Text>
              </View>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={[styles.row, styles.main]}
              onPress={goChangeEmailScreen}
            >
              <View style={styles.icon}>
                <Icon name="mail-alt" color="white" size={30} />
              </View>
              <H3>Change email</H3>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.row, styles.main]}
              onPress={goChangePasswordScreen}
            >
              <View style={styles.icon}>
                <Icon color="white" name="key" size={30} />
              </View>
              <H3>Change password</H3>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.row, styles.main]}
              onPress={goBillingInformation}
            >
              <View style={styles.icon}>
                <Icon color="white" name="credit-card" size={30} />
              </View>
              <H3>Billing information</H3>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.row, styles.main]}
              onPress={goAddCommentScreen}
            >
              <View style={styles.icon}>
                <Icon name="paper-plane-1" color="white" size={30} />
              </View>
              <H3>Contact administrator</H3>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={signOutUser}>
              <View style={styles.icon}>
                <Icon name="logout" color="white" size={30} />
              </View>
              <H3>Logout</H3>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </MyLinearGradient>
  );
}

ProfileForm.propTypes = {
  goProfileEditScreen: T.func.isRequired,
  goChangeEmailScreen: T.func.isRequired,
  goChangePasswordScreen: T.func.isRequired,
  goAddCommentScreen: T.func.isRequired,
  goBillingInformation: T.func.isRequired,
  signOutUser: T.func.isRequired,
  userInfo: T.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  icon: {
    alignItems: "center",
    width: 50,
    marginRight: 20
  },
  left: {
    margin: 5
  },
  main: {
    borderColor: "#c9c9c9",
    borderBottomWidth: 2
  }
});
