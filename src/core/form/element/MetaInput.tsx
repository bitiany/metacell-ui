import React from "react";
import {Input } from "antd";
import {MetaItem} from '@/core/types'

interface MetaInputProps extends MetaItem{
  value: string;
  data:any;
  apiKey:string;
  setFieldValue:(data:any, all: boolean)=>void;
  editabled: boolean;
}

export default class MetaInput extends React.Component<MetaInputProps, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      value: null
    }
  }
  
  onChange =(e:any, value: any) => {
    let data = {}
    this.setState({value: e.target.value})
    data[this.props.apiKey || ""] = e.target.value
    this.props.setFieldValue(data, false)
  }
  render() {
    const value = this.state.value || (this.props.data && this.props.data[this.props.apiKey])
    const placeholder = "请输入" + this.props.label;
    return (
      <Input
        allowClear
        name={this.props.apiKey}
        placeholder={placeholder}
        disabled={this.props.editabled}
        onChange={this.onChange}
        {...this.props.extInfo}
        value={value}
      />
    );
  }
}
