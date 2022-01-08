import React, { FC } from 'react'
import { Form, Row, Col } from "antd";
import { MetaLabel } from './MetaLabel';
import { MetaFormItemProps } from "@/core/types";

export const spanNum = (size?: number) => {
  return [6, 18]
}
const MetaItemWrapper: FC<MetaFormItemProps> = (props: MetaFormItemProps, data?: any) => {
  const Component = props.component
  return (<Row>
    <Col span={24}>
      <Form.Item name={props.apiKey} label={MetaLabel({ ...props })} style={{ marginBottom: "20px" }} required={props.required} validateFirst={false}
        rules={[{ required: props.required, message: `请输入${props.label}`}]} >
        <div className="meta-item-wrapper">
          <Col span={spanNum()[1]}>
            <React.Suspense fallback={<div>loading...</div>}>
              <Component {...props} key={props.apiKey}/>
            </React.Suspense>
          </Col>
        </div>
      </Form.Item>
    </Col>
  </Row>)
}

export default MetaItemWrapper