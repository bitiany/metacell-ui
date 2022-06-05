import { useRef, useState, useEffect } from "react";
import { Input, Row, Col, Divider, Alert, Button } from "antd";
import { useStorage } from '@/redux'
import { getMenuTree } from '@/api/menu'
import MetaDropdown from '@/components/dropdown'
import AsyncProvider from '@/core/provider'
import { useEvent, clear } from '@/utils/hooks'
import MetaTree from '@/components/tree'
import FromLayout from '@/components/form'
import { useRequest } from '@/utils/requests';
import api from "@/api";
const { Search } = Input;
const Menu = (props: any) => {
  const formRef: any = useRef({ submit: null })
  const [tree, setTree] = useState<any[]>([])
  const [provider, setProvider] = useState<any>({ visible: false, data: {} })
  const [system] = useStorage("setSystem")
  const [selectSystem, setSelectSystem] = useState<any[]>()
  const [sysId, setSysId] = useState<any[]>(system.systemId)
  const listener = useEvent("showProvider", { apiKey: "menu" })
  const [selectNode, setSelectNode] = useState<any>({})
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
      const resp: any = await request(api("system").list({}))
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
    request(getMenuTree({ systemId: sysId })).then((resp: any) => {
      if (resp.success) {
        const treeData: any[] = []
        resp.result.forEach((el: any) => {
          convertTreeNode(treeData, el)
        });
        setTree(treeData)
      }
    })
    // eslint-disable-next-line
  }, [sysId])

  useEffect(() => {
    listener((data: any) => {
      setProvider({ visible: true, ...data })
    })
    return () => { clear("showProvider", { apiKey: "menu" }) }
    // eslint-disable-next-line
  }, [])
  const onSubmit = async (callback?: any) => {
    formRef.current.submit((data: any) => {
      setSelectNode(data)
    }, { systemId: sysId, parentId: selectNode.parentId, id: selectNode.id })
  }
  const showAlert = "右键点击该组织可以进行添加、删除操作"

  const getMenuById = (data: any) => {
    request(api("menu").get("menuForm", data.id)).then((resp: any) => {
      if (resp.success) {
        setSelectNode(resp.result)
      }
    })
  }
  return (
    <div>
      <div style={{ marginLeft: "50px" }}>
        <Row>
          <Col span={8}>
            {selectSystem && <MetaDropdown defaultSelected={sysId} apiKey={"system"} control={{ format: format }}
              setFieldValue={(data: any) => {
                setSysId(data.system)
              }} allowClear={false} loadData={true} data={selectSystem} />}
          </Col>
        </Row>
      </div>
      <Divider />
      <div>
        <Row justify="space-between">
          <Col span={8}>
            <div>
              <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={() => { }} />
              {showAlert && <Alert type="info" showIcon message={showAlert} />}
            </div>
            <div>
              {(tree && tree.length > 0) && <MetaTree apiKey={"menu"} param={{ systemId: sysId, parentId: selectNode.parentId}} data={tree} emit={(type?: string, data?: any) => { getMenuById(data) }} />}
            </div>
          </Col>
          <Col span={16}>
            <div style={{ paddingLeft: "20px" }}>
              <FromLayout apiKey={"menuForm"} refs={formRef} data={selectNode} param={{ systemId: sysId }} />
              <Row>
                <Col span={1} offset={22}><Button onClick={onSubmit}>保存</Button></Col>
              </Row>
            </div>
          </Col>
        </Row>
        <AsyncProvider {...provider} setVisible={(visible: boolean) => setProvider({ visible: visible })} />
      </div>
    </div>
  )
}

export default Menu;