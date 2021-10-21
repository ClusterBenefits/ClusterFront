import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import T from "prop-types";
import UserAvatar from "react-native-user-avatar";
import { EditPenIcon } from "../../../assets/svg";
import { screens } from "../../../constants";
import { Container } from "../../../components";
import { CategoryItem } from "./components";
import { url } from "../../../constants";
import s from "./styles";


export default function ProfileForm({ redirectToScreen, signOutUser, userInfo }) {
  const {
    first_name: firstName = "Name",
    last_name: lastName = "LastName",
    position = "Position",
    company = "Organization",
    image = {}
  } = userInfo;

  const showImage = image.preview && !image.preview.stub;

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
          <UserAvatar
            size={80}
            name={`${firstName} ${lastName}`}
            {...(showImage && { src: `${url}${image.preview.url}` })}
          />

          <Text style={s.nameText}>{`${firstName} ${lastName}`}</Text>

          <View style={s.companyContainer}>
            <Text style={s.companyText}>{company}</Text>
            {position ? <Text style={s.positionText}>{position}</Text> : null}
          </View>
        </View>

        <View>
          <CategoryItem
            onPress={redirectToScreen}
            text="Змінити емайл"
            screenName={screens.ChangeEmailScreen}
          />
          <CategoryItem
            onPress={redirectToScreen}
            text="Змінити пароль"
            screenName={screens.ChangePasswordScreen}
          />
          <CategoryItem
            disable
            onPress={redirectToScreen}
            text="Інформація про підписку"
            screenName={screens.BillingInformationScreen}
          />
          <CategoryItem
            onPress={redirectToScreen}
            text="Політика конфіденційності"
            screenName={screens.PrivacyPolicyInProfileScreen}
          />
          <CategoryItem onPress={redirectToScreen} text="Підтримка" screenName={screens.FeedBackScreen} />
          <CategoryItem onPress={signOutUser} text="Вийти" screenName={screens.ChangeEmailScreen} />
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
