import { useState,useEffect } from "react";
import { Input } from "antd";
import { MetaFormItem } from '@/core/types'
import { empty } from '@/utils/toolkit'
interface MetaInputProps extends MetaFormItem {
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
  const {data , editabled} = props
  return (
    <Input
      allowClear
      name={props.apiKey}
      placeholder={placeholder}
      onChange={onChange}
      {...props.extInfo}
      readOnly={!empty(data) && editabled !== undefined && !props.editabled}
      value={value}
    />
  );
}
export default MetaInput;