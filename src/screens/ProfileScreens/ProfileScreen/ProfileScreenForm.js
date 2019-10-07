import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Text, ListItem } from "native-base";
import T from "prop-types";
import {
  EmailIcon,
  PasswordIcon,
  BillingInformationIcon,
  SupportIcon,
  LogOutIcon,
  InfoIcon,
  EditPenIcon
} from "../../../assets/svg";
import { MyLinearGradient } from "@components/AllComponents";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { url, colors } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    marginHorizontal: 15
  },
  bodyContainer: {
    justifyContent: "space-between",
    flex: 1
  },
  userInfoContainer: {
    alignItems: "center",
    marginTop: 35
  },
  companyContainer: {
    width: 280,
    height: 80,
    marginTop: 15,
    backgroundColor: colors.mainWhite,
    alignItems: "center",
    justifyContent: "center"
  },
  catagoryContainer: {
    height: 56,
    marginLeft: 0
  },
  touchableContainer: {
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
  lastItemMargin: {
    marginTop: 20
  },
  nameText: {
    fontSize: 16,
    fontWeight: "700"
  },
  companyText: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 8
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 15
  },
  extraMarginRight: {
    marginRight: 5
  }
});

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
    company = "Organization",
    image
  } = userInfo;
  const imageUrl = image && image.tiny;

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <InfoIcon />
        </TouchableOpacity>
        <Text style={styles.extraMarginRight}>Профіль</Text>
        <TouchableOpacity onPress={goProfileEditScreen}>
          <EditPenIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.userInfoContainer}>
          <Image
            source={
              imageUrl
                ? { uri: `${url}${imageUrl.url}` }
                : require("../../../assets/images/DefaultAvatar.png")
            }
            style={styles.image}
          />
          <Text style={styles.nameText}>{`${first_name} ${last_name}`}</Text>

          <View style={styles.companyContainer}>
            <Text style={styles.companyText}>{company}</Text>
            {position ? (
              <Text style={{ color: colors.mainGrey }}>{position}</Text>
            ) : null}
          </View>
        </View>

        <View>
          <ListItem style={styles.catagoryContainer}>
            <TouchableOpacity
              style={styles.touchableContainer}
              onPress={goChangeEmailScreen}
            >
              <View style={styles.icon}>
                <EmailIcon />
              </View>
              <Text>Змінити емайл</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem style={styles.catagoryContainer}>
            <TouchableOpacity
              style={styles.touchableContainer}
              onPress={goChangePasswordScreen}
            >
              <View style={styles.icon}>
                <PasswordIcon />
              </View>
              <Text>Змінити пароль</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem style={styles.catagoryContainer}>
            <TouchableOpacity
              style={styles.touchableContainer}
              onPress={goBillingInformation}
            >
              <View style={styles.icon}>
                <BillingInformationIcon />
              </View>
              <Text>Інформація про оплату</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem style={styles.catagoryContainer}>
            <TouchableOpacity
              style={styles.touchableContainer}
              onPress={goAddCommentScreen}
            >
              <View style={styles.icon}>
                <SupportIcon />
              </View>
              <Text>Підтримка</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem style={[styles.catagoryContainer, styles.lastItemMargin]}>
            <TouchableOpacity
              style={styles.touchableContainer}
              onPress={signOutUser}
            >
              <View style={styles.icon}>
                <LogOutIcon />
              </View>
              <Text>Вийти</Text>
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
