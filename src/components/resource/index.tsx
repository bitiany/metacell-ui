import { useState, useCallback } from 'react'
import { Row, Col } from 'antd'
import Dropdown from '@/components/dropdown'
const Resource = (props: any) => {
  const [appId, setAppId] = useState<string>("")
  const [loadData, setLoadData] = useState<boolean>(false)
  const format = (data: any, index: number) => {
    return {
      code: data.id,
      name: data.appName,
      default: index === 0
    }
  }
  const setFieldValue = useCallback((data: any) => {
    setAppId(data.application)
    setLoadData(true)
  }, [])

  const setResource = (value: any, obj: any) => {
    let data = {};
    data[props.apiKey] = value.resource;
    props.setFieldValue(data, true);
  }
  const resFormat = (data: any, index: number) => {
    return {
      code: data.id,
      name: data.resourceName,
      default: index === 0
    }
  }
  return (<Row justify="space-between">
    <Col span={10}>
      <Dropdown apiKey={"application"} control={{ format: format }} setFieldValue={setFieldValue} allowClear={false} width={"50px"} loadData={true}></Dropdown>
    </Col>
    <Col span={10}>
      <Dropdown {...props} control={{ format: resFormat }} apiKey={"resource"} param={{ appId }} width={"50px"} loadData={loadData} setFieldValue={setResource}></Dropdown>
    </Col>
  </Row>)
}

export default Resource;
