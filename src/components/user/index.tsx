import { useState, useEffect, useCallback } from "react";
import { Row, Col, Input, Alert } from "antd";
import MetaTree from '@/components/tree'
import { useStorage } from '@/redux'
import { useRequest } from '@/utils/requests'
import Table from '@/components/table';
import { orgTree } from "@/api/uac";
import Marquee from 'react-fast-marquee';
const { Search } = Input;
const User = (props: any) => {
  const [callback, setCallback] = useState(false)
  const [tree, setTree] = useState<any[]>([])
  const [org, setOrg] = useState<any>({})
  const [userInfo] = useStorage("setUserInfo")
  const request = useRequest()

  useEffect(() => {
    if (!callback) {
      setCallback(true)
      const convertTreeNode = (result: any[], data: any) => {
        const node = { key: data.id, title: data.name, ...data, children: [] }
        if (data.hasChildren) {
          data.children.forEach((el: any) => {
            convertTreeNode(node.children, el)
          });
        }
        result.push(node)
      }

      request(orgTree({ tenantId: userInfo.tenantId })).then((resp: any) => {
        if (resp && resp.success) {
          const treeData: any[] = []
          resp.result.forEach((el: any) => {
            convertTreeNode(treeData, el)
          });
          setTree(treeData)
        }
      })
    }
    // eslint-disable-next-line
  }, [callback])
  const onChange = () => { }
  const onSelected = useCallback((type?: string, data?: any) => {
    if (type === "selected") {
      setOrg(data)
    }
    if (type === "refresh") {
      setCallback(false)
    }
    // eslint-disable-next-line
  }, [])
  const showAlert = "右键点击该组织可以进行添加、删除操作"
  return (<div>
    <Row justify="space-between" >
      <Col span={4} style={{ marginTop: "13px" }}>
        <div>
          <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
          {showAlert && <Alert type="info" showIcon message={<Marquee pauseOnHover gradient={false}>
            {showAlert}
          </Marquee>} />}
        </div>
        <div>
          <MetaTree apiKey={"organization"} data={tree} emit={onSelected} height={80} />
        </div>
      </Col>
      <Col span={20}>
        <div style={{ paddingLeft: "20px" }}>
          <Table apiKey={"userPage"} condition={{ condition: { "userOrg.organization": org.id } }}></Table>
        </div>
      </Col>
    </Row>
  </div>)
}

export default User;