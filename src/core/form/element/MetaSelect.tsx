import React from "react";
import { Select } from "antd";
import { MetaInputProps } from "../MetaLabel";
const { Option } = Select;

const renderOption = (options: any) => {
  return options?.map((option:any) => (
    <Option key={option.code} value={option.code}>
      {option.name}
    </Option>
  ));
};

export default class MetaSelect extends React.Component<MetaInputProps, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      extInfo: this.props.extInfo,
      pickOptions: this.props.pickOptions,
    };
  }
  onChange =(value: any) =>{
    let data = {}
    data[this.props.apiKey || ""] =(this.state.extInfo?.selectType || 1) === 1 ? value : value
    this.props.setFieldValue(data, false)
  }
  render() {
    const placeholder = "请输入" + this.props.label;
    const defaultOption =
      this.state.pickOptions
        ?.filter((option:any) => option.defaultOption)
        .map((option:any) => option.code) || [];
    if (!this.props.defaultValue) {
      this.onChange(defaultOption[0])
    }
    const mode =
      (this.state.extInfo?.selectType || 1) === 1 ? undefined : "multiple";
    return (
      <Select
        mode={mode}
        allowClear
        defaultValue={defaultOption}
        placeholder={placeholder}
        disabled={this.props.editabled}
        onChange={this.onChange}
      >
        {renderOption(this.props.pickOptions)}
      </Select>
    );
  }
}
