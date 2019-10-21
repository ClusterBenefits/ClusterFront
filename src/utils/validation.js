import Validator from "validatorjs";
import ua from "validatorjs/src/lang/ua";

const rules = {
  email: "required|email",
  password: "required|min:8",
  password_confirmation: "required|same:password|min:8",
  password_confirmation_email: "same:password_email",
  password_email: "required|same:password_confirmation_email",
  firstName: "required|min:3 ",
  lastName: "required|min:3",
  organization: "required|min:3",
  realPassword: "required|min:8",
  oldPassword: "required|same:realPassword",
  comment: "required|min:5",
  subject: "required",
  credit_card_number: ["required", "regex:/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14}))$/"],
  expiration: ["required", "regex:/^(0[1-9]|1[0-2])/?([0-9]{4}|[0-9]{2})$/"],
  cvv2: "required|min:3",
  city: "required|min:3",
  address: "required|min:3",
  postal_code: "required|min:3",
  checkBox: "accepted"
};

// /^(?:4[0-9]{12}(?:[0-9]{3})?)$/ visa regex,
//  /^(?:5[1-5][0-9]{14})$/   mastercard regex

Validator.setMessages("en", ua);

export const singleFieldValidation = ({ key, value }) => {
  const validationResponse = { isValid: true };

  if (rules[key]) {
    const validation = new Validator({ [key]: value }, { [key]: rules[key] });
    validationResponse.isValid = validation.passes();
    if (!validationResponse.isValid) {
      validationResponse.errors = validation.errors.all();
    }
  }
  return validationResponse;
};

export const allFieldsValidation = (data, errorMessages = {}) => {
  // making new rules for each request
  let newRules = {};
  Object.keys(data).forEach(e => {
    for (let key in rules) {
      if (key === e) {
        newRules[key] = rules[key];
      }
    }
  });
  const validation = new Validator(data, newRules, errorMessages);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};
