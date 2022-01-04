import { useEffect,useRef } from 'react';
import MetaFormLayout from '@/core/form/MetaForm';
import {Layout} from '@/config/layout';
import {  MetaForm } from "@/core/types";
const FromLayout = (props: any) => {
  const formRef: any = useRef<any>('')
  const {apiKey, refs} = props;

  const onSubmit = () => {
    formRef.current.submit()
  }
  const onRef = (ref: any) =>{
    formRef.current = ref
  }
  useEffect(()=>{
    refs.current.submit = onSubmit
  })
  const layout:MetaForm = Layout[props.apiKey] || {}
  return (
    <div>
      <MetaFormLayout apiKey={apiKey} onRef={onRef} layout={layout}></MetaFormLayout>
    </div>
  )
}
export default FromLayout;