import React from "react";
import { InputNumber } from "antd";

const MetaNumber = (props:any) => {
    const placeholder = "请输入" + props.label;
    const step = Math.pow(10, - props.extInfo?.decimal || 0);
    return (
      <InputNumber
        step={step}
        name={props.apiKey}
        placeholder={placeholder}
        disabled={props.editabled}
        {...props.extInfo}
        style={{ width: "100%" }}
      />
    );
}
export default MetaNumber
