import { useEffect, forwardRef } from "react";
import { Form, Collapse, Space, Row } from "antd";
import MetaItemWrapper from './MetaItemWrapper'
import { ItemType, MetaPage, MetaGroup, MetaFormItem } from "@/core/types";
import MetaElements from './element';
import getComponent from '@/components';
import '@/assets/form.less'
import '@/assets/page.less'
const { Panel } = Collapse;
const MetaFormLayout = forwardRef((props: any, _ref: any) => {
  const [form] = Form.useForm();
  const { data } = props;
  const layout: MetaPage = props.layout

  const onFinish = (values: any) => {
    console.log(values)
  };
  useEffect(() => {
    props.onRef(form)
    if (JSON.stringify(data) !== "{}") {
      form.setFieldsValue(data)
    }
    // eslint-disable-next-line
  }, [props])
  const setFieldValue = (data: any) => {
    if (form) {
      form.setFieldsValue(data);
    }
  };
  const itemWrapper = (items: MetaFormItem[], colspan?: number) => {
    return items.map((item: MetaFormItem) => {
      const Component = getComponent({
        name: item?.control?.component.toLowerCase(),
        state: { ...item, apiKey: item?.control?.apiKey }
      })
        || MetaElements["Meta" + ItemType[item.itemType]]
      return (item.itemType === 0 ? (<Component key={item.apiKey || item.label} {...item} />) : (<MetaItemWrapper loadData
        key={item.apiKey || item.label}
        component={Component}
        setFieldValue={(value) => setFieldValue(value)}
        data={props.data}
        colspan={colspan}
        param={props.param}  {...item}
      />))
    })
  }
  const renderCollapse = (groups: MetaGroup[]) => {
    return (
      <Collapse defaultActiveKey={["0", "1"]} activeKey={["0", "1"]} ghost destroyInactivePanel expandIcon={(props: any) => {
        return (<div className="collapse-icon"><Space /></div>)
      }}>
        {groups.map((group: MetaGroup, index: number) => {
          const Component = group.control ? getComponent({ name: group.control?.component, state: {} }) : null
          return (<Panel header={group.title} key={index}>
            {Component ? <Component /> : renderItems(group.items, group.colspan)}
          </Panel>)
        })}
      </Collapse>
    )
  }

  const renderItems = (items?: MetaFormItem[], colspan?: number) => {
    const newItems = [...items || []]
    const rows: any[] = []
    if (newItems) {
      while (newItems.length > 0) {
        rows.push(newItems?.splice(0, colspan))
      }
    }
    return rows?.map((item: MetaFormItem[], index: number) => <Row key={index}>{itemWrapper(item, colspan)}</Row>)
  }

  return (<div style={{ padding: "0 10px" }}>
    <Form name="basic" onFinish={onFinish} form={form} validateTrigger={["onChange", "onBlur"]}>
      {layout.groups ? renderCollapse(layout.groups) : renderItems(layout.items, 1)}
    </Form>
  </div>)
})
export default MetaFormLayout;

