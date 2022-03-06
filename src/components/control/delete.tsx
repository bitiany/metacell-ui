import { Tooltip, Popconfirm, message } from 'antd'
import { useRequest } from '@/utils/requests';
import api from '@/api'
export interface DeleteProps {
  apiKey:string;
  record: any;
  content: any;
  emit?: () => void;
}

const DeleteControl = (props: DeleteProps) => {
  const req = useRequest()
  const { record, content, apiKey, emit } = props;
  const onConfirm = () => {
    console.log(record.id)
    const request = api(apiKey).delete(record.id)
    req(request).then((resp: any) => {
      emit && emit()
      if(resp.success){
        message.success('删除成功');
      }
     }).catch((error: any) => { })
  }
  return (
    <Tooltip placement="bottom" title="删除节点">
      <Popconfirm title={"确认是否删除"} onConfirm={onConfirm} onCancel={() => { }} okText="确定" cancelText="取消">
        {content}
      </Popconfirm>
    </Tooltip>
  )
}

export default DeleteControl