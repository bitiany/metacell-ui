import React, { useState, useEffect,useRef } from 'react';
import MetaFormLayout from '@/core/form/MetaForm';
import { useStorage } from '@/redux';
import { useRequest } from '@/utils/requests';
import { getLayoutByApiKey } from '@/api/metapage';
import { empty } from '@/utils/toolkit';
import api from '@/api';
const Detail: React.FC = (props: any) => {
    const formRef: any = useRef({ submit: null })
    const request = useRequest()
    const [layout, setLayout] = useState<any>({})
    const [app, setApp] = useState<any>({})
    const [system] = useStorage("setSystem")
    const {apiKey, data} = props
    const onRef = (ref: any) =>{
        formRef.current = ref
      }
    const getLayoutByKey = async () => {
        const res = await request(getLayoutByApiKey(system.systemId, apiKey, 3))
        if (res.success) {
            const layout = res.result.type === "json" ? JSON.parse(res.result.config) : {}
            setLayout(layout)
            request(api(layout.apiKey).get(data.id)).then((resp: any) => {
                if (resp.success) {
                    setApp(resp.result)
                }
            })
        }
    }
    useEffect(() => {
        getLayoutByKey()
        return () => { }
        // eslint-disable-next-line
    }, [apiKey])
    return !empty(layout) ? (<MetaFormLayout apiKey={"apiKey"} onRef={onRef} layout={layout} data={{...app}} param={{}}/>) : (<div></div>)
}
export default Detail