import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import $api from "@api";
import { AuthConsumer } from "@contexts";
import { withAnimation, withForm, withToast } from "@hoc";
import ContactForm from "./ContactForm";

class ContactScreen extends PureComponent {
  componentDidMount() {
    const { context } = this.props;

    if (context.isAuthenticated()) {
      this.props.setFormData({
        email: context.user.email,
        name:
          context.user.first_name && context.user.last_name
            ? ` ${context.user.first_name} ${context.user.last_name}`
            : "",
        phone: context.user.phone || ""
      });
    }
  }

  handleSubmit = () => {
    if (!this.props.validate()) {
      return;
    }

    this.props.startAnimation();

    const { formData } = this.props;

    // Send request to API.
    $api.contact
      .send(formData)
      .then(() => {
        this.props.clearForm();

        this.props.showSuccess("Message was sent!");
      })
      .catch(({ response }) => {
        if (response && response.status == 422) {
          this.props.setErrors(response.data);
        }
      })
      .finally(() => this.props.stopAnimation());
  };

  render() {
    return (
      <ContactForm
        formData={this.props.formData}
        errors={this.props.errors}
        animation={this.props.animation}
        onChangeValue={this.props.onChangeValue}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

ContactScreen.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  animation: PropTypes.bool.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
  startAnimation: PropTypes.func.isRequired,
  stopAnimation: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired
};

ContactScreen = AuthConsumer(ContactScreen);
ContactScreen = withAnimation(ContactScreen);
ContactScreen = withForm(ContactScreen, {
  email: "required|email",
  body: "required"
});
ContactScreen = withToast(ContactScreen);

export default ContactScreen;
