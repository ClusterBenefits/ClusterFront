import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
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
import { url, colors, screens } from "../../../constants";
import { MyLinearGradient } from "../../../components";
import s from "./styles";

export default function ProfileForm({ redirectToScreen, signOutUser, userInfo }) {
  const {
    firstName = "Name",
    lastName = "LastName",
    position = "Position",
    company = "Organization",
    image
  } = userInfo;
  const imageUrl = image && image.tiny;

  return (
    <MyLinearGradient withScroll style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => {}}>
          <InfoIcon />
        </TouchableOpacity>
        <Text style={s.extraMarginRight}>Профіль</Text>
        <TouchableOpacity onPress={() => redirectToScreen(screens.ProfileEditScreen)}>
          <EditPenIcon />
        </TouchableOpacity>
      </View>

      <View style={s.bodyContainer}>
        <View style={s.userInfoContainer}>
          <Image
            source={
              imageUrl
                ? { uri: `${url}${imageUrl.url}` }
                : require("../../../assets/images/DefaultAvatar.png")
            }
            style={s.image}
          />
          <Text style={s.nameText}>{`${firstName}${lastName}`}</Text>

          <View style={s.companyContainer}>
            <Text style={s.companyText}>{company}</Text>
            {position ? <Text style={s.positionText}>{position}</Text> : null}
          </View>
        </View>

        <View>
          <ListItem style={s.categoryContainer}>
            <TouchableOpacity
              style={s.touchableContainer}
              onPress={() => redirectToScreen(screens.ChangeEmailScreen)}
            >
              <View style={s.icon}>
                <EmailIcon />
              </View>
              <Text>Змінити емайл</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem style={s.categoryContainer}>
            <TouchableOpacity
              style={s.touchableContainer}
              onPress={() => redirectToScreen(screens.ChangePasswordScreen)}
            >
              <View style={s.icon}>
                <PasswordIcon />
              </View>
              <Text>Змінити пароль</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem style={s.categoryContainer}>
            <TouchableOpacity
              style={s.touchableContainer}
              onPress={() => redirectToScreen(screens.BillingInformationScreen)}
            >
              <View style={s.icon}>
                <BillingInformationIcon />
              </View>
              <Text>Інформація про оплату</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem style={s.categoryContainer}>
            <TouchableOpacity
              style={s.touchableContainer}
              onPress={() => redirectToScreen(screens.FeedBackScreen)}
            >
              <View style={s.icon}>
                <SupportIcon />
              </View>
              <Text>Підтримка</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem style={[s.categoryContainer, s.lastItemMargin]}>
            <TouchableOpacity style={s.touchableContainer} onPress={signOutUser}>
              <View style={s.icon}>
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
  redirectToScreen: T.func.isRequired,
  signOutUser: T.func.isRequired,
  userInfo: T.object.isRequired
};
