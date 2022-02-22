import { useEffect, forwardRef } from "react";
import { Form, Input } from "antd";
import MetaItemWrapper from './MetaItemWrapper'
import { ItemType, MetaForm, MetaFormItem } from "@/core/types";
import MetaElements from './element';
import getComponent from '@/components';
import '@/assets/form.less'

const MetaFormLayout = forwardRef((props: any, _ref: any) => {
  const [form] = Form.useForm();
  const {data} = props;
  const onFinish = (values: any) => {
    console.log(values)
  };
  useEffect(() => {
    props.onRef(form)
    if(JSON.stringify(data) !== "{}"){
        form.setFieldsValue(data)
    }
    // eslint-disable-next-line
  }, [props])
  const setFieldValue = (data: any) => {
    if (form) {
      form.setFieldsValue(data);
    }
  };
  const itemWrapper = (item: MetaFormItem) => {

    if(item.hidden){
        return (<Input hidden name={item.apiKey} key={item.apiKey} {...item.extInfo} value={"123"}></Input>)
    }
    const Component = getComponent({ name: item?.control?.component.toLowerCase(), 
      state: {...item, 
        apiKey: item?.control?.apiKey
      } }) 
    || MetaElements["Meta" + ItemType[item.itemType]]
    return item.itemType === 0?(<Component key={item.apiKey || item.label} {...item}/>) :(<MetaItemWrapper
      component={Component}
      key={item.apiKey || item.label}
      setFieldValue={(value) => setFieldValue(value)}
      data={props.data}
      {...item}
    />)
  }
  const layout: MetaForm = props.layout
  return (<div style={{ padding: "0 10px" }}>
    <Form name="basic" onFinish={onFinish} form={form} validateTrigger={["onChange", "onBlur"]}>
      {layout?.items?.map((item: MetaFormItem) => itemWrapper(item))}
    </Form>
  </div>)
})
export default MetaFormLayout;

