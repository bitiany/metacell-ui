import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import MetaTable from '@/core/table/MetaTable';
import { TableConfig } from '@/config/config'
import { useLocation } from 'react-router-dom'
import { queryParam } from '@/utils/toolkit'
import AsyncProvider from '@/core/provider'
import { useEvent, clear } from '@/utils/hooks'
import api from '@/api'

const Table = (props: any) => {
  const pathRef: any = useRef<string>('')
  const { pathname, search }: any = useLocation()
  const [data, setData] = useState<any[]>([])
  const [pagination, setPagination] = useState<any>({})
  const [provider, setProvider] = useState<any>({ visible: false, data: {} })

  const para:any = useMemo(() => {
    return props.apiKey ?  {apiKey: props.apiKey} : queryParam(search)
    // eslint-disable-next-line
  }, [search])
  const {apiKey} = para
  const listener = useEvent("showProvider", { apiKey })
  const setVisible = (visible: boolean) => {
    setProvider({ visible: visible })
  }

  const seachPage = useCallback((param?: any)=>{
    api(apiKey)?.pageList({...param, ...pagination}).then((resp: any) =>{
      if(resp["result"]){
        setData(resp["result"]?.records?.map((r: any) => {
          return { key: r.id, ...r }
        }))
        setPagination({ total: resp.result.total, defaultCurrent: resp.result.current, pageSize: 10 })
      }
    }).catch(resp => {
    })
  }, [apiKey, pagination])
  useEffect(() => {
    seachPage()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    listener((data: any) => {
      setProvider({ visible: true, ...data })
    })
    pathRef.current = pathname + search
    return ()=>{ clear("showProvider", { apiKey })}
  },[pathRef, listener, apiKey, pathname, search])

  
  const onChange = (pagination: any, filters: any, sorter: any, extra: any)=>{
    setPagination({...pagination, current:pagination.current, size: pagination.pageSize}) 
    seachPage({
      ...pagination
    })
  }
  const onOperator = (type:string, data:any) => {
    if(type === "delete"){
      api(apiKey)?.delete(data.id).then(resp => {
        console.log(resp)
        seachPage({
          ...pagination
        })
      }).catch(resp => {

      })
    }
  }
  return (
    <div>
      <MetaTable title={TableConfig[apiKey]?.label} {...TableConfig[apiKey] || {}} data={[...data]} pagination={pagination} onChange={onChange} onOperator={onOperator}></MetaTable>
      <AsyncProvider {...provider} setVisible={setVisible} />
    </div>
  )
}
export default Table;