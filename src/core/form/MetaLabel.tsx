import React from "react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { MetaItem } from "@/core/types";
export interface MetaInputProps extends MetaItem {
  editabled?: boolean;
  required?: boolean;
  defaultValue?: any;
  setFieldValue:(key:any, val:any, change?: boolean) => void;
}

export const MetaLabel = (item: any) => {
  return (
    <div className="meta-item-label">
      <div className="meta-item-label-name">
        {item.required ? <span className="meta-item-required">*</span> : <span className="meta-item-required" style={{marginLeft: '7px'}}></span>}
        <span className="meta-item-label-name">{item.label}</span>
        {item.helpText ? (
          <Tooltip placement="right" title={item.helpText}>
            <QuestionCircleOutlined className="meta-item-label-help" />
          </Tooltip>
        ) : null}
      </div>
    </div>
  );
};
