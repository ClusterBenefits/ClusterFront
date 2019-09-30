import React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Container, H3, Text, ListItem } from "native-base";
import T from "prop-types";
import {
  EmailIcon,
  PasswordIcon,
  PaymentDetailsIcon,
  BackArrow,
  CustomUserIcon,
  BillingInformationIcon,
  SupportIcon,
  LogOutIcon,
  InfoIcon,
  EditPenIcon
} from "../../../assets/svg";
import {
  MyLinearGradient,
  Icon,
  IconButton,
  Header
} from "@components/AllComponents";

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
    company = "Organization"
  } = userInfo;

  return (
    <MyLinearGradient>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "space-between",
          flex: 1
        }}
        style={styles.container}
        indicatorStyle={"white"}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 40,
            marginHorizontal: 15
          }}
        >
          <InfoIcon />
          <Text>Профіль</Text>
          <EditPenIcon />
        </View>
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <View>
            <View style={styles.row}>
              <H3 style={{ marginLeft: 0, flex: 1 }}>Profile</H3>
              <H3 style={{ marginLeft: 0, flex: 1, fontWeight: "800" }}>
                Profile
              </H3>
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
              <TouchableOpacity
                style={[styles.row]}
                onPress={goAddCommentScreen}
              >
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
      </ScrollView>
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
