import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text} from 'native-base';
import T from 'prop-types';
import UserAvatar from 'react-native-user-avatar';
import {EditPenIcon} from '../../../assets/svg';
import {imgUrl, screens} from '../../../constants';
import {Container} from '../../../components';
import {CategoryItem} from './components';
import {url} from '../../../constants';
import s from './styles';

export default function ProfileForm({
  redirectToScreen,
  signOutUser,
  userInfo,
  removeImage,
  changeImage,
}) {
  const {
    first_name: firstName = 'Name',
    last_name: lastName = 'LastName',
    position = 'Position',
    company = 'Organization',
    image = {},
    coverToken = null,
  } = userInfo;

  const showImage = image.preview && !image.preview.stub;

  console.log(position, company);

  // console.log(company, position);

  return (
    <Container withScroll style={s.container}>
      <View style={s.header}>
        <View style={s.emptySpace} />
        <Text style={s.extraMarginRight}>Профіль</Text>
        <TouchableOpacity
          hitSlop={s.hitSlop}
          onPress={() => redirectToScreen(screens.ProfileEditScreen)}>
          <EditPenIcon />
        </TouchableOpacity>
      </View>

      <View style={s.bodyContainer}>
        <View style={s.userInfoContainer}>
          {!coverToken ? (
            <UserAvatar
              size={80}
              name={`${firstName} ${lastName}`}
              {...(showImage && {src: `${url}${image.preview.url}`})}
            />
          ) : (
            <Image
              style={s.avatar}
              source={{uri: `${imgUrl}${image?.tiny?.url.slice(1)}`}}
            />
          )}

          {!coverToken ? (
            <TouchableOpacity
              style={{marginTop: 8}}
              onPress={changeImage}
              activeOpacity={0.7}>
              <Text style={s.link}>Завантажити фото</Text>
            </TouchableOpacity>
          ) : (
            <View style={s.linksWrapper}>
              <TouchableOpacity onPress={removeImage} activeOpacity={0.7}>
                <Text style={s.link}>Видалити фото</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={changeImage} activeOpacity={0.7}>
                <Text style={s.link}>Змінити фото</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={s.nameText}>{`${firstName} ${lastName}`}</Text>

          <Text style={s.companyContainer}>
            {!!position && (
              <Text style={s.positionText}>
                {company ? `${position} at` : position}
              </Text>
            )}
            <Text style={s.positionText}>{` ${company || ''}`}</Text>
          </Text>
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
          <CategoryItem
            onPress={redirectToScreen}
            text="Підтримка"
            screenName={screens.FeedBackScreen}
          />
          <CategoryItem
            onPress={signOutUser}
            text="Вийти"
            screenName={screens.ChangeEmailScreen}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={s.createdBy}>Powered by IT Cluster Ivano-Frankivsk</Text>
        </View>
      </View>
    </Container>
  );
}

ProfileForm.propTypes = {
  redirectToScreen: T.func.isRequired,
  signOutUser: T.func.isRequired,
  userInfo: T.object.isRequired,
};
