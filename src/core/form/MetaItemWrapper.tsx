import React, { FC, useMemo } from 'react'
import { Form, Col } from "antd";
import { MetaLabel } from './MetaLabel';
import { MetaFormItem } from "@/core/types";

export const spanNum = (size: number) => {
  const span = 24 / size;
  return [span, 24 - 8*(size%2)]
}
const MetaItemWrapper: FC<MetaFormItem> = (props: MetaFormItem, data?: any) => {
  const Component = props.component
  const {colspan} = props;
  const span = useMemo(() => {
    return spanNum(colspan || 1)
  }, [colspan])
  return (<Col span={span[0]}>
      <Form.Item name={props.apiKey} label={MetaLabel({ ...props })} style={{ marginBottom: "20px" }}  validateFirst={false}
        rules={[{ required: props.required, message: `请输入${props.label}`}]} >
        <div className="meta-item-wrapper">
          <Col span={span[1]}>
            <React.Suspense fallback={<div>loading...</div>}>
                <Component {...props} key={props.apiKey}/>
            </React.Suspense>
          </Col>
        </div>
      </Form.Item>
    </Col>)
}
export default MetaItemWrapper