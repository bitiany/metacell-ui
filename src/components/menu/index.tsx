import { useState, useEffect } from "react";
import { Row, Col, Divider } from "antd";
import { useStorage } from '@/redux'
import { getMenuTree } from '@/api/menu'
import MetaDropdown from '@/components/dropdown'
import AsyncProvider from '@/core/provider'
import { useEvent, clear } from '@/utils/hooks'
import MenuTree from "./menuTree";
import { useRequest } from '@/utils/requests';
import api from "@/api";
const Menu = (props: any) => {
  const [tree, setTree] = useState<any[]>([])
  const [provider, setProvider] = useState<any>({ visible: false, data: {} })
  const [system] = useStorage("setSystem")
  const [selectSystem, setSelectSystem] = useState<any[]>()
  const [sysId, setSysId] = useState<any[]>(system.systemId)
  const listener = useEvent("showProvider", { apiKey: "menu" })
  const request = useRequest()
  // eslint-disable-next-line
  const format = (data: any, index: number) => {
    return {
      code: data.id,
      name: data.systemName,
      default: index === 0
    }
  }
  useEffect(() => {
    const queryAppList = async () => {
      const resp: any = request(api("system").list({}))
      return resp
    }
    queryAppList().then((resp: any) => {
      if (resp && resp.success) {
        setSelectSystem(resp.result?.map((r: any, index: number) => {
          const op = format(r, index)
          return op
        }))
      }
    })
  }, [sysId, request])
  useEffect(() => {
    const convertTreeNode = (result: any[], data: any) => {
      const node = { key: data.id, title: data.name, ...data, children: [] }
      if (data.hasChildren) {
        data.children.forEach((el: any) => {
          convertTreeNode(node.children, el)
        });
      }
      result.push(node)
    }
    !provider.visible && request(getMenuTree({ systemId: sysId })).then((resp: any) => {
      if (resp.success) {
        const treeData: any[] = []
        resp.result.forEach((el: any) => {
          convertTreeNode(treeData, el)
        });
        setTree(treeData)
      }
    }).catch((error:any) => {
    })
  }, [sysId, provider, request])

  useEffect(() => {
    listener((data: any) => {
      setProvider({ visible: true, ...data })
    })
    return () => { clear("showProvider", { apiKey: "menu" }) }
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <div style={{ marginLeft: "50px" }}>
        <Row>
          <Col span={8}>
            <MetaDropdown defaultSelected={sysId} apiKey={"system"} control={{ format: format }}
              setFieldValue={(data: any) => setSysId(data.system)} allowClear={false} loadData={true} data={selectSystem} />
          </Col>
        </Row>
      </div>
      <Divider />
      <div>
        <MenuTree data={tree} showAlert={"右键点击该组织可以进行添加、删除操作"} reload={() => { setProvider({ visible: false }) }} param={{ systemId: sysId }} />
        <AsyncProvider {...provider} setVisible={(visible: boolean) => setProvider({ visible: visible })} />
      </div>
    </div>
  )
}

export default Menu;