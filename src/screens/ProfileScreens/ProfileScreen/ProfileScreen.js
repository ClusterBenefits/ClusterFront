import React, {useCallback, useContext, useState} from 'react';

import {UserContext} from '../../../reducers/context';
import {clearUserLocal, dispatchTypes} from '../../../actions/userActions';
import ProfileScreenForm from './ProfileScreenForm';
import {screens, navigation as navName} from '../../../constants';
import {useBackButton} from '../../../hooks';

import * as ImagePicker from 'expo-image-picker';
import {
  changeImage,
  uploadImage,
  removeImage,
} from '../../../actions/axiosFetchs';

export default function ProfileScreen({navigation}) {
  const {
    state: {userInfo, token},
    dispatch,
  } = useContext(UserContext);

  const [isModal, toggleModal] = useState(false);

  useBackButton(true);

  const redirectToScreen = (screenName, props) => {
    if (screenName === screens.BillingInformationScreen) {
      toggleModal(true);
    } else {
      navigation.navigate(screenName, {props});
    }
  };

  const signOutUser = async () => {
    const response = await clearUserLocal({dispatch});
    if (response === 'Yes')
      navigation.reset({
        index: 0,
        routes: [{name: navName.WelcomeNavigator}],
      });
  };

  const onUploadToServer = useCallback(
    async file => {
      if (file && !file.cancelled) {
        let uriParts = file.uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        const fd = new FormData();

        // console.log(result.type);

        fd.append('type', 'user');
        fd.append('file', {
          uri: file.uri,
          type: `image/${fileType}`,

          // type: 'user',
          name: file.uri.replace(/(.*\/)/gi, ''),
          // base64: result.base64,
        });

        const user = await uploadImage({
          token,
          data: fd,
        });

        console.log(user, 'ffff');

        dispatch({
          type: dispatchTypes.ADD_USERINFO,
          payload: user,
        });

        // const data = await changeImage({token, covertToken});

        // console.log(data);
      }
    },
    [userInfo, token],
  );

  const change = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
        // base64: true,
      });

      onUploadToServer(result);
    } catch (e) {
      console.log(`error upload img ${e}`);
    }
  }, [userInfo, token]);

  // console.log(userInfo);

  const remove = useCallback(async () => {
    try {
      const response = await removeImage({
        token,
      });

      console.log(response);
      dispatch({type: dispatchTypes.ADD_USERINFO, payload: response});
    } catch (e) {
      console.log(`error remove image ${e}`);
    }
  }, [userInfo, token]);

  return (
    <ProfileScreenForm
      hideModal={() => toggleModal(false)}
      isModal={isModal}
      redirectToScreen={redirectToScreen}
      signOutUser={signOutUser}
      userInfo={userInfo}
      changeImage={change}
      removeImage={remove}
    />
  );
}
