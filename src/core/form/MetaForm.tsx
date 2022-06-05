import { useEffect, forwardRef, Suspense } from "react";
import { Form, Collapse, Space, Row, Col, Button, message, Divider } from "antd";
import MetaItemWrapper from './MetaItemWrapper'
import { ItemType, MetaPage, MetaGroup, MetaFormItem, MetaHeader } from "@/core/types";
import MetaElements from './element';
import getComponent from '@/components';
import { useRequest } from '@/utils/requests';
import api from '@/api/api2'
import '@/assets/form.less'
import '@/assets/page.less'
const { Panel } = Collapse;
const MetaFormLayout = forwardRef((props: any, _ref: any) => {
  const [form] = Form.useForm();
  const { data } = props;
  const layout: MetaPage = props.layout
  const request = useRequest()

  const onFinish = (values: any) => {
    console.log(values)
  };
  useEffect(() => {
    props.onRef(form)
    if (JSON.stringify(data) !== "{}") {
      form.setFieldsValue(data)
    }
    // eslint-disable-next-line
  }, [data])
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

      return (item.itemType === 0 ? (<Component key={item.apiKey || item.label} {...item} data={props.data} param={props.param} />) : (<MetaItemWrapper loadData
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
            {Component ? <Component  {...group} data={props.data} param={props.param} setFieldValue={(value: any) => setFieldValue(value)} /> : renderItems(group.items, group.colspan)}
          </Panel>)
        })}
      </Collapse>
    )
  }

  const renderItems = (items?: MetaFormItem[], colspan?: number) => {
    const newItems = [...items || []]
    const rows: any[] = []
    if (newItems) {
      if (colspan && colspan > 0) {
        while (newItems.length > 0) {
          rows.push(newItems?.splice(0, colspan))
        }
      } else {
        rows.push(newItems)
      }
    }
    return rows?.map((item: MetaFormItem[], index: number) => <Row key={index}>{itemWrapper(item, colspan)}</Row>)
  }
  const renderHeader = (header: MetaHeader) => {
    const onSubmit = async (callback: any, param?: any) => {
      try {
        const values = await form.validateFields();
        const saveData = { ...param, ...data, ...values }
        request(api.save(layout.apiKey, saveData)).then((resp: any) => {
          if (resp?.success) {
            message.info('保存成功');
            callback(saveData)
          }
        })
        console.log(saveData)
      } catch (errorInfo) {
        console.log('Failed:', errorInfo);
      }
    };
    return <div>
      <Row>
        <Col span={12}><span style={{
          "fontSize": "18px", "height": "53px", "fontFamily": "PingFang SC", "fontWeight": 500, "paddingLeft": "20px"
        }}>{header.title}</span> </Col>
        <Col span={12} className={"form-head-tools"}>
          <Space>
            {
              header.widget && header.widget.button.main?.map((btn: any) => <Button key={btn.code} type={btn.showType} onClick={() => { onSubmit(() => { }) }}>{btn.name}</Button>)
            }
          </Space>
        </Col>
        <Divider />
      </Row>
    </div>
  }

  return (<div style={{ padding: "0 10px" }}>
    <Form name="basic" onFinish={onFinish} form={form} validateTrigger={["onChange", "onBlur"]}>
      {layout.header && renderHeader(layout.header)}
      <Suspense fallback={null}>
        {layout ? (layout.groups ? renderCollapse(layout.groups) : renderItems(layout.items, 1)) : null}
      </Suspense>
    </Form>
  </div>)
})
export default MetaFormLayout;

