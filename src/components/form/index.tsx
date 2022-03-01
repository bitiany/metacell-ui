import { useEffect,useRef, useState } from 'react';
import MetaFormLayout from '@/core/form/MetaForm';
import {Layout} from '@/config/layout';
import { message } from 'antd';
import { useStorage } from '@/redux';
import { useRequest } from '@/utils/requests';
import { getLayoutByApiKey } from '@/api/metapage';
import api from '@/api'
const FromLayout = (props: any) => {
  const formRef: any = useRef<any>('')
  const {apiKey, refs, data} = props;
  const [layout, setLayout] = useState<any>()
  const [system] = useStorage("setSystem")
  const request = useRequest()
  const onSubmit = async (callback:any) => {
    try {
      const values = await formRef.current.validateFields();
      request(api(apiKey)?.save({...data,...values})).then((resp:any) => {
        if(resp?.success){
          message.info('保存成功');
          callback()
        }
      }).catch((resp:any) =>{
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
    request(getLayoutByApiKey(system.systemId, apiKey, 2)).then((resp: any) => {
      if (resp.success) {
        const layoutConfig = resp.result
        setLayout( (layoutConfig && JSON.stringify(layoutConfig) !== "{}") ? (layoutConfig.type === "json" ? JSON.parse(layoutConfig.config) : {}) : Layout[props.apiKey])
      }
    })
    // eslint-disable-next-line
  },[request, apiKey])
  return (
    <div>
      {layout && <MetaFormLayout apiKey={apiKey} onRef={onRef} layout={layout} data={data}></MetaFormLayout>}
    </div>
  )
}
export default FromLayout;