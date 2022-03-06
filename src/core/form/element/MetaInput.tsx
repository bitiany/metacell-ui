import React, { useState,useEffect } from "react";
import { Input } from "antd";
import { MetaItem } from '@/core/types'

interface MetaInputProps extends MetaItem {
  value: string;
  data: any;
  apiKey: string;
  setFieldValue: (data: any, all: boolean) => void;
  editabled: boolean;
}

const MetaInput = (props: MetaInputProps) => {
  const [value, setValue] = useState(null)
  useEffect(() => {
    setValue(props.data && props.data[props.apiKey])
    // eslint-disable-next-line
  }, [props.data])
  const onChange = (e: any, value: any) => {
    let data = {}
    setValue(e.target.value)
    data[props.apiKey || ""] = e.target.value
    props.setFieldValue(data, false)

  }
  const placeholder = "请输入" + props.label;
  return (
    <Input
      allowClear
      name={props.apiKey}
      placeholder={placeholder}
      disabled={props.editabled}
      onChange={onChange}
      {...props.extInfo}
      value={value}
    />
  );
}
export default MetaInput;