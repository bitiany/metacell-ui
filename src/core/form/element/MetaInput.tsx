import React from "react";
import {Input } from "antd";

export default class MetaInput extends React.Component<any> {
  state ={
    val: this.props.data ? this.props.data[this.props.apiKey] : null
  }
  onChange =(e:any, value: any) =>{
    let data = {}
    data[this.props.apiKey || ""] = e.currentTarget.value
    this.setState({val: e.currentTarget.value})
  }
  render() {
    const placeholder = "请输入" + this.props.label;

    return (
      <Input
        allowClear
        {...this.props.extInfo}
        name={this.props.apiKey}
        placeholder={placeholder}
        disabled={this.props.editabled}
        value={this.state.val}
        onChange={this.onChange}
      />
    );
  }
}