import Validator from "validatorjs";
import en from "validatorjs/src/lang/en";

const rules = {
  email: "required|email",
  password: "required|min:8|max:30",
  password_confirmation: "same:password|required",
  password_confirmation_email: "same:password_email",
  password_email: "required|same:password_confirmation_email|min:8",
  firstName: "required|max:30",
  lastName: "required|max:30",
  organization: "required|max:30",
  position: "required|max:30",
  realPassword: "required|min:8",
  oldPassword: "required|same:realPassword",
  email1: "required",
  email2: "required",
  email3: "required",
  email4: "required",
  email5: "required",
  myComment: "required|min:5",
  subject: "required",
  creditCardNumber: [
    "required",
    "regex:/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12}))$/"
  ],
  expiration: ["required", "regex:/^(0[1-9]|1[0-2])/?([0-9]{4}|[0-9]{2})$/"],
  cvv2: "required"
};

// /^(?:4[0-9]{12}(?:[0-9]{3})?)$/ visa regex,
//  /^(?:5[1-5][0-9]{14})$/   mastercard regex

Validator.setMessages("en", en);

export const singleFieldValidation = ({ key, value }) => {
  const validationResponse = { isValid: true };
  // if (key == "oldPassword") {
  //   return (validationResponse.isValid = true);
  // }
  if (rules[key]) {
    const validation = new Validator({ [key]: value }, { [key]: rules[key] });
    validationResponse.isValid = validation.passes();
    if (!validationResponse.isValid) {
      validationResponse.errors = validation.errors.all();
    }
  }
  return validationResponse;
};

export const allFieldsValidation = data => {
  // making new rules for each request
  let newRules = {};
  Object.keys(data).forEach(e => {
    for (let key in rules) {
      if (key === e) {
        newRules[key] = rules[key];
      }
    }
  });
  const validation = new Validator(data, newRules, {
    required: "Please fill required field ",
    same: "Password field doesn't match"
  });
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};
