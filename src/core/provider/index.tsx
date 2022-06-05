
import {useEffect, useState} from 'react'
import ModalProvider from '@/core/provider/modal'
import DrawerProvider  from './drawer'
import { useEvent, clear } from '@/utils/hooks'
const AsyncProvider = (props: any) => {
  const [provider, setProvider] = useState<any>({ visible: false, data: {} })
  const listener = useEvent("showProvider", {apiKey: props.apiKey})
  useEffect(() => {
    listener((data: any) => {
      setProvider({ visible: true, ...data })
    })
    return () => { clear("showProvider", { apiKey: "" }) }
    // eslint-disable-next-line
  }, [])
  let Provider = null;
  if(props.widget && props.widget === "drawer"){
    Provider = DrawerProvider
  }else{
    Provider =  ModalProvider
  }

  return (
    <div>
      <Provider  setVisible={(visible: boolean, reload: boolean) => { 
        setProvider({ visible: visible }); 
        reload && props.callback() 
      }}  {...provider} />
    </div >)
}
export default AsyncProvider