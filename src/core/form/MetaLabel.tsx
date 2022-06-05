import React from "react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { MetaItem } from "@/core/types";
export interface MetaInputProps extends MetaItem {
  editabled?: boolean;
  required?: boolean;
  defaultValue?: any;
  data?:any;
  setFieldValue:(key:any, val:any, change?: boolean) => void;
}

export const MetaLabel = (item: any) => {
  const style = item.required ? {} : {marginLeft: "10px"}
  return (
    <div className="meta-item-wrapper"  style={style}>
      <div className="meta-item-label">
        <div className="meta-item-label-name">
          <span className="meta-item-label-name">{item.label}</span>
          {item.helpText ? (
            <Tooltip placement="right" title={item.helpText}>
              <QuestionCircleOutlined className="meta-item-label-help" />
            </Tooltip>
          ) : null}
        </div>
      </div>
    </div>
  );
};
