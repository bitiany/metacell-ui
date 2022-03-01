import { useState } from 'react'
import { Tree, Tooltip, Popconfirm, Result, message } from 'antd'
import { PlusOutlined, PlusCircleOutlined, MinusCircleOutlined, DownOutlined } from '@ant-design/icons'
import { useEvent} from '@/utils/hooks'
import { useRequest } from '@/utils/requests';
import api from "@/api";
const TreeNode = (props: any) => {
  const request = useRequest()
  const { treeNode, apiKey, showProvider } = props;
  const onConfirm = (id: string) => {
    request(api(apiKey).delete(id)).then((resp: any) => {
      if (resp && resp.success) {
        props.emit && props.emit()
        message.success('删除成功');
      }
    })
  }

  const { pageX, pageY } = treeNode;
  const tmpStyle: any = {
    position: 'absolute',
    maxHeight: 40,
    textAlign: 'center',
    left: `${pageX + 10}px`,
    top: `${pageY}px`,
    display: 'flex',
    flexDirection: 'row',
  };
  return (<div style={tmpStyle} >
    <div style={{ alignSelf: 'center', marginLeft: 10 }} >
      <Tooltip placement="bottom" title="添加节点">
        <PlusCircleOutlined onClick={()=> {showProvider(()=>{})}}/>
      </Tooltip>
    </div>
    <div style={{ alignSelf: 'center', marginLeft: 10 }} >
      <Tooltip placement="bottom" title="删除节点">
        <Popconfirm title={"确认是否删除" + treeNode.name} onConfirm={() => { onConfirm(treeNode.id) }} onCancel={() => { }} okText="确定" cancelText="取消">
          <MinusCircleOutlined />
        </Popconfirm>
      </Tooltip>
    </div>
  </div>)
}
interface MetaTreeProps {
  data: any[]
  apiKey: string;
  emit:(type?:string, data?:any) => void;
  param?:any;
  height?: number;
}

const MetaTree = (props: MetaTreeProps) => {
  const { data, apiKey, emit, param, height } = props;
  const [nodeTreeItem, setNodeTreeItem] = useState<any>({})
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const showProvider = useEvent("showProvider", { title: "新增", container: "modal", apiKey: apiKey, data: {...param, parentId: nodeTreeItem.id }, component: "form" })
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    setSelectedKeys(selectedKeys.map(key => key.toString()))
    setNodeTreeItem({})
    emit("selected", { ...info.node, menuName: info.node.name, menuCode: info.node.apiKey })
  };
  const onRightClick = (info: any) => {
    const {event, node} = info
    var x = event.currentTarget.offsetLeft + event.currentTarget.clientWidth;
    var y = event.currentTarget.offsetTop +(height ||80);
    setNodeTreeItem({
      pageX: x,
      pageY: y,
      id: node.id,
      name: node.title,
    });
  }
  return (<div>
    {(data && data.length > 0) ? <Tree
      // showLine
      autoExpandParent
      defaultSelectedKeys={[data[0].id]}
      defaultExpandedKeys={[data[0].id]}
      switcherIcon={<DownOutlined />}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
      onRightClick={(info: any) => onRightClick(info)}
      treeData={data}
    /> : <Result icon={<PlusOutlined onClick={() => { }} />} />
    }
    {(JSON.stringify(nodeTreeItem) === "{}") ? null : 
    <TreeNode apiKey={apiKey} treeNode={nodeTreeItem} showProvider={showProvider} emit={()=> {emit("refresh")}}/>}
  </div>)
}
export default MetaTree