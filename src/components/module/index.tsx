import { useState } from 'react';
import { List } from 'antd';
import {AppstoreAddOutlined} from '@ant-design/icons'
import{useEvent} from '@/utils/hooks'
const Module = (props: any) => {
  // const onLoadMore = () => {
  //   setLoading(true)
  // }
  const showProvider = useEvent("showProvider", { title: "新增",container: "modal",  apiKey: props.apiKey, data: {}, component: "form" })
  const addModule = () => {
    console.log("click add Module")
    showProvider(() => { })
  }
  const [loading] = useState(false)
  const loadMore =
    !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <AppstoreAddOutlined size={100} onClick={addModule}/>
        {/* <Button onClick={onLoadMore}>添加</Button> */}
      </div>
    ) : null;

  return (<div style={{ display: "flex" }}>
    <div style={{ width: "30%", marginRight: "30px" }}>
      <List
        // header={<div></div>}
        bordered
        loadMore={loadMore}
        dataSource={props.data}
        renderItem={(item:any) => (
          <List.Item >
            <List.Item.Meta
              title={item.moduleName}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
    <div >
      模块资源信息
    </div>
  </div>)
}

export default Module;