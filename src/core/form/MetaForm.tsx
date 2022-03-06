import { useEffect, forwardRef } from "react";
import { Form, Collapse, Space } from "antd";
import MetaItemWrapper from './MetaItemWrapper'
import { ItemType, MetaPage,MetaGroup, MetaFormItem } from "@/core/types";
import MetaElements from './element';
import getComponent from '@/components';
import '@/assets/form.less'
import '@/assets/page.less'
const { Panel } = Collapse;
const MetaFormLayout = forwardRef((props: any, _ref: any) => {
  const [form] = Form.useForm();
  const {data} = props;
  const layout: MetaPage = props.layout
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
      loadData
      {...item} 
      param = {props.param}
    />)
  }
  const renderCollapse = (groups: MetaGroup[])=> {
    return (
      <Collapse defaultActiveKey={["0", "1"]} ghost destroyInactivePanel expandIcon={(props:any) => {
        return (<div className="collapse-icon"><Space /></div>)
      }}>
       {
          groups.map((group:MetaGroup, index:number) => {
            const Component = group.control ? getComponent({ name: group.control?.component, state: {} }) : null
            return (<Panel header={group.title} key={index}>
                { Component ? <Component /> : renderItems(group.items) }
            </Panel>)
          })
       }
      </Collapse>
    )
  }

  const renderItems = (items?:MetaFormItem[]) => {
    return items?.map((item: MetaFormItem) => itemWrapper(item))
  }

  return (<div style={{ padding: "0 10px" }}>
    <Form name="basic" onFinish={onFinish} form={form} validateTrigger={["onChange", "onBlur"]}>
      {layout.groups ? renderCollapse(layout.groups || []) : renderItems(layout.items)}
    </Form>
  </div>)
})
export default MetaFormLayout;

