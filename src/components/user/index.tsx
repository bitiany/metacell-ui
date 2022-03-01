import { useState, useEffect } from "react";
import { Row, Col, Input} from "antd";
import MetaTree from '@/components/tree'
import { useStorage } from '@/redux'
import { useRequest } from '@/utils/requests'
import Table from '@/components/table';
import { orgTree } from "@/api/uac";
const { Search } = Input;
const User = (props: any)=> {
  const [tree, setTree] = useState<any[]>([])
  const [org, setOrg] = useState<any>({})
  const [userInfo] = useStorage("setUserInfo")
  const request = useRequest()
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

    request(orgTree({tenantId: userInfo.tenantId})).then((resp:any) => {
      if (resp && resp.success) {
        const treeData: any[] = []
        resp.result.forEach((el: any) => {
          convertTreeNode(treeData, el)
        });
        setTree(treeData)
      }
    })
  }, [userInfo, request])
  const onChange = () => {}
  const onSelected = (type?:string, data?:any) =>{
    if(type === "selected"){
      setOrg(data)
    }
  }
  const {id} = org;
  return (<div>
    <Row justify="space-between" >
        <Col span={8} style={{marginTop: "13px"}}>
          <div>
            <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
            {/* {showAlert && <Alert type="info" showIcon message={showAlert} />} */}
          </div>
          <div>
            <MetaTree apiKey={"organization"} data={tree} emit={onSelected} height={40}/>
          </div>
        </Col>
        <Col span={16}>
          <div style={{ paddingLeft: "20px" }}>
            <Row>
            {id && <Table apiKey={"user"}  condition={{orgId: id}}></Table>}
            </Row>
          </div>
        </Col>
      </Row>
  </div>)
}

export default User;