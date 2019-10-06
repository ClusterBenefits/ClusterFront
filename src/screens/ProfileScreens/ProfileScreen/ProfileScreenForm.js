import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Button
} from "react-native";
import { H3, Text, ListItem } from "native-base";
import T from "prop-types";
import {
  EmailIcon,
  PasswordIcon,
  BackArrow,
  CustomUserIcon,
  BillingInformationIcon,
  SupportIcon,
  LogOutIcon,
  InfoIcon,
  EditPenIcon
} from "../../../assets/svg";
import { MyLinearGradient, Header } from "@components/AllComponents";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { ButtonModal } from "../../../services/mainModal";
import { url } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  catagoryContainer: {
    height: 56,
    marginLeft: 0
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
  lastItemMargin: {
    marginTop: 20
  },
  image: {
    height: 100,
    width: 100
  }
});

export default function ProfileForm({
  goProfileEditScreen,
  goChangeEmailScreen,
  goChangePasswordScreen,
  goAddCommentScreen,
  goBillingInformation,
  signOutUser,
  userInfo,
  navigation
}) {
  const {
    first_name = "first_name",
    last_name = "LastName",
    position = "Position",
    company = "Organization",
    image: { tiny = {} }
  } = userInfo;

  useEffect(() => {
    const getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
    getPermissionAsync();
  });

  return (
    <MyLinearGradient withScroll style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 40,
          marginHorizontal: 15
        }}
      >
        <TouchableOpacity onPress={() => {}}>
          <InfoIcon />
        </TouchableOpacity>
        <Text>Профіль</Text>
        <TouchableOpacity onPress={goProfileEditScreen}>
          <EditPenIcon />
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View>
          <TouchableOpacity onPress={() => ButtonModal.showModal(navigation)}>
            <Text>Open Camere or image picker )</Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: `${url}${tiny.url}` }} style={styles.image} />
        <View>
          <ListItem style={styles.catagoryContainer}>
            <TouchableOpacity
              style={[styles.row, styles.main]}
              onPress={goChangeEmailScreen}
            >
              <View style={styles.icon}>
                <EmailIcon />
              </View>
              <H3>Change email</H3>
            </TouchableOpacity>
          </ListItem>

          <ListItem style={styles.catagoryContainer}>
            <TouchableOpacity
              style={[styles.row, styles.main]}
              onPress={goChangePasswordScreen}
            >
              <View style={styles.icon}>
                <PasswordIcon />
              </View>
              <H3>Change password</H3>
            </TouchableOpacity>
          </ListItem>

          <ListItem style={styles.catagoryContainer}>
            <TouchableOpacity
              style={[styles.row, styles.main]}
              onPress={goBillingInformation}
            >
              <View style={styles.icon}>
                <BillingInformationIcon />
              </View>
              <H3>Billing information</H3>
            </TouchableOpacity>
          </ListItem>

          <ListItem style={styles.catagoryContainer}>
            <TouchableOpacity style={[styles.row]} onPress={goAddCommentScreen}>
              <View style={styles.icon}>
                <SupportIcon />
              </View>
              <H3>Contact administrator</H3>
            </TouchableOpacity>
          </ListItem>

          <ListItem style={[styles.catagoryContainer, styles.lastItemMargin]}>
            <TouchableOpacity style={styles.row} onPress={signOutUser}>
              <View style={styles.icon}>
                <LogOutIcon />
              </View>
              <H3>Logout</H3>
            </TouchableOpacity>
          </ListItem>
        </View>
      </View>
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
