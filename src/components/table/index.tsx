import { useEffect, useState, useRef } from 'react';
import MetaTable from '@/core/table/MetaTable';
import { TableConfig } from '@/config/config'
import { useLocation } from 'react-router-dom'
import { queryParam } from '@/utils/toolkit'
import api from '@/api'

const Table = (props: any) => {
  const pathRef: any = useRef<string>('')
  const { pathname, search, state }: any = useLocation()
  const d = state?.apiKey ? state : queryParam(search)
  const [data, setData] = useState<any[]>([])
  const [pagination, setPagination] = useState<any>({})

  const seachPage = (param?: any)=>{
    api(d?.apiKey)?.pageList(param).then((resp: any) =>{
      setData(resp["result"]?.records?.map((r: any) => {
        return { key: r.id, ...r }
      }))
      setPagination({ total: resp.result.total, defaultCurrent: resp.result.current, pageSize: 10 })
    }).catch(resp => {

    })
  }
  useEffect(() => {
    if (pathRef.current !== pathname + search) {
      pathRef.current = pathname + search
      seachPage({
        ...pagination
      })
    }
    pathRef.current = pathname + search
  })
  const onChange = (pagination: any, filters: any, sorter: any, extra: any)=>{
    setPagination({...pagination, current:pagination.current, size: pagination.pageSize}) 
    seachPage({
      ...pagination
    })
  }
  const onOperator = (type:string, data:any) => {
    if(type === "delete"){
      api(d?.apiKey)?.delete(data.id).then(resp => {
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
      <MetaTable title={TableConfig[d?.apiKey]?.label} {...TableConfig[d?.apiKey] || {}} data={[...data]} pagination={pagination} onChange={onChange} onOperator={onOperator}></MetaTable>
    </div>
  )
}
export default Table;