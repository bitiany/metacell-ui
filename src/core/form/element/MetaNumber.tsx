import React from "react";
import { InputNumber } from "antd";

export default class MetaInput extends React.Component<any> {
  render() {
    const placeholder = "请输入" + this.props.label;
    const step = Math.pow(10, -this.props.extInfo?.decimal || 0);

    return (
      <InputNumber
        step={step}
        name={this.props.apiKey}
        placeholder={placeholder}
        disabled={this.props.editabled}
        {...this.props.extInfo}
        style={{ width: "100%" }}
      />
    );
  }
}
