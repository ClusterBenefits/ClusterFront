import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Form, View, H1, Text } from "native-base";
import CheckBox from 'react-native-check-box'
//import { Text } from "react-native"; 
import T from "prop-types";
import { BlueButton, Header, MainInput, Container } from "../../../components";
import { colors } from "../../../constants";

const s = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    flex: 1
  },
  flexMax: {
    flex: 1
  },
  wrapper: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: 'row'
  },
  textWrapper: {
    flexDirection: "row",
    height: 60,
  },
  text: {
    marginLeft: 5,
    fontSize: 13,
    height: '100%',
    width: Dimensions.get('window').width - 40,
    textAlignVertical: 'center'
  },
  link: {
    color: "#009fe3",
    borderColor: 'black',
    borderWidth: 1,
    height: 15,
    width: 20
  },
  checkBox: {
    marginLeft: -15,
    width: 24,
    minHeight: 20,
    paddingRight: 5,
  },
  checkboxWrapper: {
    height: 80
  },
  error: {
    marginLeft: -15,
    color: colors.mainRed,
    fontSize: 13
  }
});

export default function SignUpScreenForm({
  signUpUser,
  onChangeValue,
  formCredentials,
  navigation,
  formErrors,
  openPrivacyPolicy,
  toggleHandlePersonalData,
  isHandlePersonalData,
  togglePrivacy,
  isPolicy
}) {
  return (
    <Container withScroll>
      <Header navigation={navigation} />
      <View style={s.container}>
        <H1>Реєстрація</H1>
        <Form>
          <MainInput
            placeholder="Емейл"
            onChangeText={onChangeValue}
            name="email"
            value={formCredentials.email}
            error={formErrors["email"]}
          />
          <MainInput
            placeholder="Пароль"
            secureTextEntry={true}
            onChangeText={onChangeValue}
            name="password"
            value={formCredentials.password}
            error={formErrors["password"]}
          />
          <MainInput
            placeholder="Повторіть пароль"
            secureTextEntry={true}
            onChangeText={onChangeValue}
            name="password_confirmation"
            value={formCredentials.password_confirmation}
            error={formErrors["password_confirmation"]}
          />


          <View style={s.checkboxWrapper}>

            <View style={s.wrapper}>
              <CheckBox 
                onClick={togglePrivacy}
                style={s.checkBox}
                rightTextStyle={s.textWrapper}
                isChecked={isPolicy}
                checkBoxColor='#45a0f3'
                uncheckedCheckBoxColor="#45a0f3"
                />
              <View style={s.textWrapper}>
                <Text style={s.text}>Надаю згоду на обробку персональних даних та погоджуюсь з      
                  <Text 
                  onPress={openPrivacyPolicy}
                  style={[s.text, s.link]}> політикою конфіденційності</Text>
                </Text>
              </View>
            </View>
            <Text style={s.error}>{formErrors['isPolicy']}</Text>
          </View>

        <View style={s.checkboxWrapper}>
          <View style={s.wrapper}>
            <CheckBox   
              isChecked={isHandlePersonalData} 
              onClick={toggleHandlePersonalData}
              style={s.checkBox}
              uncheckedCheckBoxColor="#45a0f3"
              checkBoxColor='#45a0f3'/>

              <View rightTextStyle={s.textWrapper}>
                <Text onPress={openPrivacyPolicy} style={s.text}>Ознайомлений(а) з      
                  <Text 
                  style={[s.text, s.link]}> угодою користування</Text>
                </Text>
              </View>
          </View>
          <Text style={s.error}>{formErrors['isHandlePersonalData']}</Text>
        </View>

          
        </Form>
    
        <View style={s.flexMax} />
        <BlueButton text=" Продовжити" onPress={signUpUser} />
      </View>
    </Container>
  );
}

SignUpScreenForm.propTypes = {
  signUpUser: T.func.isRequired,
  onChangeValue: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired,
  navigation: T.object.isRequired
};
