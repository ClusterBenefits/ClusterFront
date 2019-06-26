import React, { PureComponent } from "react";
import { Toast as BaseToast } from "native-base";

const duration = 3000;
const position = "top";
const buttonText = "OK";

export default function withToast(WrappedComponent) {
  return class extends PureComponent {
    showToast(text) {
      BaseToast.show({
        buttonText: "Okay",
        text: text,
        textStyle: { color: "white" },
        buttonTextStyle: { color: "white" },
        buttonStyle: { backgroundColor: "#5cb85c" },
        style: { margin: 10, opacity: 0.8 }
      });
    }
    success(text) {
      BaseToast.show({
        type: "success",
        text: text,
        duration,
        // position,
        buttonText
      });
    }

    warning(text) {
      BaseToast.show({
        type: "warning",
        text: text,
        duration,
        // position,
        buttonText
      });
    }

    error(text) {
      BaseToast.show({
        type: "danger",
        text: text,
        duration,
        // position,
        buttonText
      });
    }

    render() {
      return (
        <WrappedComponent
          showToast={this.showToast}
          showSuccess={this.success}
          showError={this.error}
          showWarning={this.warning}
          {...this.props}
        />
      );
    }
  };
}
