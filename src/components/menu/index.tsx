import React from "react";
import {Row, Col,Space, Tree } from "antd";
import {DownOutlined} from '@ant-design/icons'
import MetaDropdown from '@/components/dropdown'
const Menu = (props:any) => {
  const format = (data:any, index: number) => {
    return {
      code: data.id,
      name: data.systemName,
      default: index === 0
    }
  }
  const setFieldValue = (data:any)=>{
    console.log(data)
  }

  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent2',
          key: '0-1',
          children:[
            {
              title: 'leaf',
              key: '0-0-3',
            },
          ]
        },
        {
          title: 'leaf',
          key: '0-0-1',
        },
      ],
    },
  ];
  return (
    <div>
      <div style={{marginLeft: "50px"}}>
      <Row>
            <Col span={8}>
                <MetaDropdown apiKey={"system"} control={{format: format}} setFieldValue={setFieldValue} allowClear={false}/>
            </Col>
          </Row>
      </div>
      <div>
        <Tree
          showIcon
          defaultExpandAll
          defaultSelectedKeys={['0-0-0']}
          switcherIcon={<DownOutlined />}
          treeData={treeData}
        />
      </div>
    </div>
  )
}

export default Menu;