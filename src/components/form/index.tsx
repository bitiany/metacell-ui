import { useEffect,useRef } from 'react';
import MetaFormLayout from '@/core/form/MetaForm';
import {Layout} from '@/config/layout';
import {MetaForm} from "@/core/types";
import { message } from 'antd';
import api from '@/api'
const FromLayout = (props: any) => {
  const formRef: any = useRef<any>('')
  const {apiKey, refs, data} = props;
  console.log(props)
  const onSubmit = async (callback:any) => {
    try {
      const values = await formRef.current.validateFields();
      api(apiKey)?.save({...data,...values}).then((resp:any) => {
        if(resp?.success){
          message.info('保存成功');
          callback()
        }
      }).catch(resp =>{
        message.error(resp.data?.message);
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const onRef = (ref: any) =>{
    formRef.current = ref
  }
  useEffect(()=>{
    refs.current.submit = onSubmit
  })
  const layout:MetaForm = Layout[props.apiKey] || {}
  return (
    <div>
      <MetaFormLayout apiKey={apiKey} onRef={onRef} layout={layout} data={data}></MetaFormLayout>
    </div>
  )
}
export default FromLayout;