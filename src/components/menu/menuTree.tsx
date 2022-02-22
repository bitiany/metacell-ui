import { useState, useRef, useEffect } from "react";
import { Row, Col, Input, Alert,  message, Button } from "antd";
import MetaFormLayout from "@/core/form/MetaForm";
import MetaTree from '@/components/tree'
import { Layout } from "@/config/layout";
import api from "@/api";
const { Search } = Input;

interface MenuTreeProps {
  apiKey?: string;
  data?: any[];
  showAlert?: string;
  reload?:()=>void;
  param?:any;
}
const MenuTree = (props: MenuTreeProps) => {
  const { data, showAlert } = props;
  const formRef: any = useRef<any>('')
  const [nodeTreeItem, setNodeTreeItem] = useState<any>({})
  const [selectNode, setSelectNode] = useState<any>({})
  useEffect(()=>{
    (data && data.length > 0) ? setSelectNode({...data[0], menuName: data[0].name, menuCode: data[0].apiKey}): setSelectNode({})
    setNodeTreeItem({})
  }, [data])
  const onSubmit = async (callback: any) => {
    const values = await formRef.current.validateFields();
    api("menu").save({...props.param, parentId: nodeTreeItem.id, ...values}).then((resp: any) => {
      props.reload && props.reload()
      if(resp && resp.success){
        message.success('保存成功');
      }
    })
  }
  
  return (
    <div>
      <Row justify="space-between">
        <Col span={8}>
          <div>
            <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={() => { }} />
            {showAlert && <Alert type="info" showIcon message={showAlert} />}
          </div>
          <div>
            {(data && data.length > 0) && <MetaTree apiKey={"menu"} data={data} emit={(type?:string, data?:any)=> {setSelectNode(data)}}/>}
          </div>
        </Col>
        <Col span={16}>
          <div style={{ paddingLeft: "20px" }}>
            <MetaFormLayout apiKey={"menu"} onRef={(ref: any) => { formRef.current = ref}} layout={Layout.menu} data={selectNode}></MetaFormLayout>
            <Row>
              <Col span={1} offset={22}><Button onClick={onSubmit}>保存</Button></Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default MenuTree;