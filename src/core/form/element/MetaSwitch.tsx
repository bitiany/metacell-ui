import React from "react";
import { Switch } from "antd";

export default class MetaSwitch extends React.Component<any> {
  state = {
    val: this.props.data ? this.props.data[this.props.apiKey] : true
  }
  componentDidMount = ()=>{
    let data = {}
    data[this.props.apiKey || ""] = this.state.val
    let that = this;
    setTimeout(()=>{
      that.props.setFieldValue(data)
      clearTimeout()
    }, 100)
  }
  onChange =(value: any) =>{
    let data = {}
    data[this.props.apiKey || ""] = value
    this.setState({val: value})
    this.props.setFieldValue(data, false)
  }
  render() {
    return (
      <Switch
        disabled={this.props.editabled}
        onChange={this.onChange}
        checked={ this.state.val}
        {...this.props.extInfo}
      />
    );
  }
}
