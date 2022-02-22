import { useState, useEffect } from "react";
import { Row, Col, Input, Alert} from "antd";
import AsyncProvider from '@/core/provider'
import MetaTree from '@/components/tree'
import { useEvent, clear } from '@/utils/hooks'
import { useStorage } from '@/redux'

import { orgTree } from "@/api/uac";
const { Search } = Input;
const Organization = (props: any)=>{
  const { showAlert } = props;
  const [tenant] = useStorage("setTenant")
  const [tree, setTree] = useState<any[]>([])
  const [provider, setProvider] = useState<any>({ visible: false, data: {} })
  const listener = useEvent("showProvider", { apiKey: "organization" })

  useEffect(()=>{
    const convertTreeNode = (result: any[], data: any) => {
      const node = { key: data.id, title: data.orgName, ...data, children: [] }
      if (data.hasChildren) {
        data.children.forEach((el: any) => {
          convertTreeNode(node.children, el)
        });
      }
      result.push(node)
    }
    orgTree({tenantId: tenant.tenantId}).then((resp:any) => {
      if (resp && resp.success) {
        const treeData: any[] = []
        resp.result.forEach((el: any) => {
          convertTreeNode(treeData, el)
        });
        setTree(treeData)
      }
    })
  }, [tenant])
  useEffect(() => {
    listener((data: any) => {
      setProvider({ visible: true, ...data })
    })
    return () => { clear("showProvider", { apiKey: "menu" }) }
    // eslint-disable-next-line
  }, [])
  const onChange = () => {}

  return (<div>
    <Row justify="space-between">
        <Col span={8}>
          <div>
            <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
            {showAlert && <Alert type="info" showIcon message={showAlert} />}
          </div>
          <div>
            <MetaTree apiKey={"organization"} data={tree} emit={()=> {}}/>
          </div>
        </Col>
        <Col span={16}>
          <div style={{ paddingLeft: "20px" }}>
            {/* <MetaFormLayout apiKey={"menu"} onRef={(ref: any) => { formRef.current = ref}} layout={Layout.menu} data={selectNode}></MetaFormLayout> */}
            <Row>
              {/* <Col span={1} offset={22}><Button onClick={onSubmit}>保存</Button></Col> */}
            </Row>
          </div>
        </Col>
      </Row>
      <AsyncProvider {...provider} setVisible={(visible: boolean) => setProvider({ visible: visible })} />
  </div>)
}

export default Organization