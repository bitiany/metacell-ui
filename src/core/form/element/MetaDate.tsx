import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

export default class MetaInput extends React.Component<any> {
  onChange =(value: any) =>{
    let data = {}
    data[this.props.apiKey || ""] = moment(value).toDate().getTime()
    this.props.setFieldValue(data, false)
  }
  render() {
    const placeholder = "请输入" + this.props.label;
    const showTime = this.props.extInfo?.dateType === 2;
    return (
      <DatePicker
        allowClear
        name={this.props.apiKey}
        showTime={showTime}
        placeholder={placeholder}
        disabled={this.props.editabled}
        onChange={this.onChange}
        style={{ width: "100%" }}
      />
    );
  }
}
