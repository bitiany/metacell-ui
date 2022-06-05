import React, { useState, useEffect, useRef, useMemo } from 'react';
import MetaFormLayout from '@/core/form/MetaForm';
import { useStorage } from '@/redux';
import { useRequest } from '@/utils/requests';
import { getLayoutByApiKey } from '@/api/metapage';
import api from '@/api/api2'
const Layout = (props: any) => {
  const request = useRequest()
  const formRef: any = useRef({ submit: null })
  const [layout, setLayout] = useState<any>({})
  const [app, setApp] = useState<any>({})
  const [system] = useStorage("setSystem")
  const { apiKey, data } = props
  const onRef = (ref: any) => {
    formRef.current = ref
  }
  const getLayoutByKey = async () => {
    const res = await request(getLayoutByApiKey(system.systemId, apiKey, 2))
    if (res.success) {
      setLayout(res.result)
    }
  }

  useEffect(() => {
    getLayoutByKey()
    request(api.get("layoutDetail", data.id)).then((resp: any) => {
      if (resp.success) {
        setApp(resp.result)
      }
    })
    return () => { }
    // eslint-disable-next-line
  }, [])
  const layoutData = useMemo(() => {
    return layout ? <MetaFormLayout apiKey={"apiKey"} onRef={onRef} layout={layout} data={{ ...app }} param={{}} /> : null;
  }, [layout, app])
  return (<div>{layoutData}</div>)
}

export default Layout