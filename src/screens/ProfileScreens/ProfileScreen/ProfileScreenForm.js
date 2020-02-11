import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, ListItem } from "native-base";
import T from "prop-types";
import {
  EmailIcon,
  PasswordIcon,
  BillingInformationIcon,
  SupportIcon,
  LogOutIcon,
  EditPenIcon
} from "../../../assets/svg";
import { screens } from "../../../constants";
import { Container } from "../../../components";
import UserAvatar from "react-native-user-avatar";
import s from "./styles";

export default function ProfileForm({ redirectToScreen, signOutUser, userInfo }) {
  const {
    first_name: firstName = "Name",
    last_name: lastName = "LastName",
    position = "Position",
    company = "Organization"
  } = userInfo;

  return (
    <Container withScroll style={s.container}>
      <View style={s.header}>
        <View style={s.emptySpace} />
        <Text style={s.extraMarginRight}>Профіль</Text>
        <TouchableOpacity hitSlop={s.hitSlop} onPress={() => redirectToScreen(screens.ProfileEditScreen)}>
          <EditPenIcon />
        </TouchableOpacity>
      </View>

      <View style={s.bodyContainer}>
        <View style={s.userInfoContainer}>
          <UserAvatar size="60" name={`${firstName} ${lastName}`} />

          <Text style={s.nameText}>{`${firstName} ${lastName}`}</Text>

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
              <Text>Інформація про підписку</Text>
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
    </Container>
  );
}

ProfileForm.propTypes = {
  redirectToScreen: T.func.isRequired,
  signOutUser: T.func.isRequired,
  userInfo: T.object.isRequired
};
