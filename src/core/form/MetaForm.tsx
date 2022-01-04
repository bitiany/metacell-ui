import { useRef, useEffect,forwardRef } from "react";
import { Form } from "antd";
import MetaItemWrapper from './MetaItemWrapper'
import { ItemType, MetaFormItemProps, MetaForm, MetaFormItem } from "@/core/types";
import MetaElements from './element';
import getComponent from '@/components';
import '@/assets/form.less'

const MetaFormLayout =forwardRef((props: any, _ref:any) => {
  const formRef: any = useRef<any>('')
  const onFinish = (values: any) => {
    console.log(values)
  };
  useEffect(()=> {
    props.onRef(formRef.current)
  })
  const setFieldValue = (data:any) => {
    if(formRef && formRef.current){
      formRef.current!.setFieldsValue(data);
    }
  };
  const itemWrapper = (item: MetaFormItemProps) => {
    const Component =getComponent({ name: item?.component?.toLowerCase(), state: {} }) || MetaElements["Meta" + ItemType[item.itemType]]
    return (<MetaItemWrapper
      component={Component}
      key={item.apiKey}
      setFieldValue={(value) => setFieldValue(value)}
      data={props.data}
      {...item}
    />)
  }
  const layout:MetaForm = props.layout
  return (
    <div style={{ padding: "0 10px" }}>
      <Form name="basic" onFinish={onFinish} ref={formRef}>
          {layout?.items?.map((item:MetaFormItem) => itemWrapper(item))}
      </Form>
    </div>
  )
}
) 
export default MetaFormLayout;

