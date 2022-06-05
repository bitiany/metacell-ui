import { useState, useEffect,useRef } from "react";
import { Row, Col, Input, Alert, Button} from "antd";
import AsyncProvider from '@/core/provider'
import MetaTree from '@/components/tree'
import { useEvent, clear } from '@/utils/hooks'
import { useStorage } from '@/redux'
import { useRequest } from '@/utils/requests'
import { orgTree } from "@/api/uac";
import MetaFormLayout from '@/core/form/MetaForm';
import {Layout} from '@/config/layout';
const { Search } = Input;
const Organization = (props: any)=>{
  const { showAlert } = props;
  const formRef: any = useRef<any>('')
  const [callback, setCallback] = useState(false)
  const [userInfo] = useStorage("setUserInfo")
  const [tree, setTree] = useState<any[]>([])
  const [org, setOrg] = useState<any>({})
  const [provider, setProvider] = useState<any>({ visible: false, data: {} })
  const listener = useEvent("showProvider", { apiKey: "organization" })
  const request = useRequest()
  useEffect(()=>{
    if(!callback){
      setCallback(true)
      setOrg({})
      const convertTreeNode = (result: any[], data: any) => {
        const node = { key: data.id, title: data.name, ...data, children: [] }
        if (data.hasChildren) {
          data.children.forEach((el: any) => {
            convertTreeNode(node.children, el)
          });
        }
        result.push(node)
      }
      request(orgTree({tenantId: userInfo.tenantId})).then((resp:any) => {
        if (resp && resp.success) {
          const treeData: any[] = []
          resp.result.forEach((el: any) => {
            convertTreeNode(treeData, el)
          });
          setTree(treeData)
        }
      })
    }
  }, [userInfo, request, callback])
  useEffect(() => {
    listener((data: any) => {
      setProvider({ visible: true, ...data })
    })
    return () => { clear("showProvider", { apiKey: "organization" }) }
    // eslint-disable-next-line
  }, [])
  const onChange = () => {}
  const onSelected = (type?:string, data?:any) =>{
    console.log(type, data)
    if(type === "selected"){
      setOrg(data)
    }
    if(type === "refresh"){
      setCallback(false)
    }
  }
  const onSubmit = () => {

  }
  return (<div>
    <Row justify="space-between">
        <Col span={8}>
          <div>
            <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
            {showAlert && <Alert type="info" showIcon message={showAlert} />}
          </div>
          <div>
            <MetaTree apiKey={"organization"} data={tree} emit={onSelected} height={40}/>
          </div>
        </Col>
        <Col span={16}>
          <div style={{ paddingLeft: "20px" }}>
            <MetaFormLayout apiKey={"organization"} onRef={(ref: any) => { formRef.current = ref}} layout={Layout.organization} data={org}></MetaFormLayout>
            <Row>
              <Col span={1} offset={22}><Button onClick={onSubmit}>保存</Button></Col>
            </Row>
          </div>
        </Col>
      </Row>
      <AsyncProvider {...provider} setVisible={(visible: boolean) => {
        setProvider({ visible: visible })
        setCallback(false)
      }} />
  </div>)
}

export default Organization