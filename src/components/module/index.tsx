import { useState } from 'react';
import { List, Radio, Popconfirm, message } from 'antd';
import { AppstoreAddOutlined, EditOutlined, MinusCircleOutlined } from '@ant-design/icons'
import Table from '@/components/table';
import { useEvent } from '@/utils/hooks'
import { useRequest } from '@/utils/requests';
import api from '@/api';
const Module = (props: any) => {

  const showProvider = useEvent("showProvider", { title: "新增", container: "modal", apiKey: props.apiKey, data: { appId: props.data.appId }, component: "form" })
  const addModule = () => {
    showProvider(() => { })
  }
  const request = useRequest()
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
        <AppstoreAddOutlined size={100} onClick={addModule} />
        {/* <Button onClick={onLoadMore}>添加</Button> */}
      </div>
    ) : null;
  const onDelete = (data: any) => {
    request(api("module").delete(data.id)).then((resp: any) => {
      if (resp.success) {
        message.success('删除成功');
      }
    })
  }
  const onChange = (e: any) => {
    console.log('radio checked', e);
    // setValue(e.target.value);
  };
  return (<div style={{ display: "flex" }}>
    <div style={{ width: "25%", marginRight: "30px" }}>
      <List
        // header={<div></div>}
        bordered
        loadMore={loadMore}
        dataSource={props.data.modules}
        renderItem={(item: any) => (
          <List.Item actions={[<EditOutlined />,
          <Popconfirm title={"确认是否删除" + item.name} onConfirm={() => { onDelete(item) }} okText="确定" cancelText="取消">
            <MinusCircleOutlined />
          </Popconfirm>]}>
            <Radio onChange={() => { onChange(item) }}><div onClick={() => onDelete(item)}>{item.moduleName}</div></Radio>
          </List.Item>
        )}
      />
    </div>
    <div style={{ width: "70%"}}>
      <Table apiKey="resource"/>
    </div>
  </div>)
}

export default Module;