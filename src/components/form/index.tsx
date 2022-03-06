import { useEffect,useRef, useState } from 'react';
import MetaFormLayout from '@/core/form/MetaForm';
import { message } from 'antd';
import {Layout} from '@/config/layout';
import { useStorage } from '@/redux';
import { useRequest } from '@/utils/requests';
import { getLayoutByApiKey } from '@/api/metapage';
import api from '@/api'
const FromLayout = (props: any) => {
  const formRef: any = useRef<any>('')
  const {apiKey, refs, data, param} = props;
  const [layout, setLayout] = useState<any>()
  const [system] = useStorage("setSystem")
  const request = useRequest()
  const onSubmit = async (callback:any, param?:any) => {
    try {
      const values = await formRef.current.validateFields();
      const saveData = {...param, ...data,...values}
      request(api(apiKey)?.save(saveData)).then((resp:any) => {
        if(resp?.success){
          message.info('保存成功');
          callback(saveData)
        }
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
    return () => {}
    // eslint-disable-next-line
  },[apiKey])
  return (
    <div>
      {layout && <MetaFormLayout apiKey={apiKey} onRef={onRef} layout={layout} data={data} param={param}/>}
    </div>
  )
}
export default FromLayout;