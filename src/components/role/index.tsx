import { useEffect, useState } from "react";
import { Row, Col, Spin, List } from "antd";
import { AppstoreFilled } from "@ant-design/icons";
import { getRoleList } from "@/api/role";
import { useRequest } from '@/utils/requests'
import Table from '@/components/table';
const Role = (props: any) => {
  const [data, setData] = useState<any>([]);
  const [role, setRole] = useState<any>()
  const [loading, setLoading] = useState(false)
  const request = useRequest()
  useEffect(() => {
    setLoading(true)
    request(getRoleList()).then((resp: any) => {
      if (resp.success) {
        setData(resp.result)
      }
      setLoading(false)
    })
  }, [request])
  const onClick = (data:any)=>{
    setRole(data)
  }
  return (<div >
    {loading && <Spin />}
    <Row justify="space-between">
      <Col span={5}>
        <div style={{"border": "1px solid #f0f0f0"}}>
          <span style={{ "marginRight": "20px" , "height": "50px"}}>角色列表</span><AppstoreFilled />
          <div style={{"borderTop": "1px solid #f0f0f0"}}>
          
          {data.length > 0 && <List
            dataSource={data}
            renderItem={(item: any) => (
              <List.Item  onClick={()=>onClick(item)} actions={[<a key="list-loadmore-edit">编辑</a>, <a key="list-loadmore-more">删除</a>]}>
                <List.Item.Meta title={item.roleName} />
              </List.Item>
            )}
          />}
        </div>
        </div>
      </Col>
      <Col span={18} offset={1}>
        <div style={{"border": "1px solid #f0f0f0"}}>
        <Table apiKey={"userRole"}  condition={{condition:{"role": (role ? role.id : null)}}}></Table>
        </div>
      </Col>
    </Row>
  </div>)
}

export default Role;