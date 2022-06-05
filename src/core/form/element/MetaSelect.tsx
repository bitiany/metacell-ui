import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { MetaInputProps } from "../MetaLabel";
const { Option } = Select;

const renderOption = (options: any) => {
  return options?.map((option: any) => (
    <Option key={option.code} value={option.code}>
      {option.name}
    </Option>
  ));
};

const MetaSelect = (props: MetaInputProps) => {
  const {data, apiKey} = props;
  const [value, setValue] = useState([""])
  const mode = (props.extInfo?.selectType || 1) === 1 ? undefined : "multiple";

  useEffect(() => {
    setValue([data[apiKey]])
    if (!props.defaultValue) {
      onChange(defaultOption[0])
    }
    // eslint-disable-next-line
  }, [data])

  const onChange = (value: any) => {
    let data = {}
    data[apiKey || ""] = (props.extInfo?.selectType || 1) === 1 ? value : value
    props.setFieldValue(data, false)
  }

  const defaultOption =
    props.pickOptions
      ?.filter((option: any) => option.defaultOption)
      .map((option: any) => option.code) || [""];

  const placeholder = "请选择" + props.label;
  return (
    <Select
      mode={mode}
      allowClear
      defaultValue={defaultOption}
      placeholder={placeholder}
      disabled={!props.editabled}
      onChange={onChange}
      value={value}
    >
      {renderOption(props.pickOptions)}
    </Select>
  );
}
export default MetaSelect;
