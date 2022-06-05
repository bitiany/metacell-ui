import { useEffect, useState, useRef, useMemo } from 'react';
import MetaTable from '@/core/table/MetaTable';
import { useLocation } from 'react-router-dom'
import { queryParam, empty } from '@/utils/toolkit'
import { useStorage } from '@/redux';
import { useRequest } from '@/utils/requests';
import { getLayoutByApiKey } from '@/api/metapage';
import api from '@/api'

const Table = (props: any) => {
  const pathRef: any = useRef<string>('')
  const { pathname, search }: any = useLocation()
  const [data, setData] = useState<any[]>([])
  const [pagination, setPagination] = useState<any>({current: 1, size: 10, total: null})
  const [layout, setLayout] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [system] = useStorage("setSystem")
  const request = useRequest()
  const para: any = useMemo(() => {
    return props.apiKey ? { apiKey: props.apiKey } : queryParam(search)
    // eslint-disable-next-line
  }, [search])
  const { apiKey } = para  
  useEffect(() => {
    request(getLayoutByApiKey(system.systemId, apiKey)).then((resp: any) => {
      if (resp.success) {
        const layoutConfig = resp.result
        setLayout(layoutConfig)
      }
    })
    // eslint-disable-next-line
  }, [system, apiKey])

  const seachPage = (condition?: any, page?: any, sort?:any) => {
    setLoading(true)
    request(api(apiKey)?.pageList({  page:page, condition: condition || {}, orders: sort}, apiKey)).then((resp: any) => {
      if (resp.success && resp.result) {
        setData(resp["result"]?.records?.map((r: any) => {
          return { key: r.id, ...r }
        }))
        setPagination({ total: resp.result.page.total, defaultCurrent: resp.result.page.current, pageSize: resp.result.page.size })
      }
      setLoading(false)
    }).catch((resp: any) => {
    })
  }

  useEffect(() => {
    seachPage({}, {current: 1, size: 10, total: null})
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    pathRef.current = pathname + search
    return () => {}
  }, [pathRef, apiKey, pathname, search])


  const onChange = (page: any, filters: any, sorter: any, extra: any) => {
    
    setPagination({ current: page.current, size: page.pageSize })
    const buildFilter = (filters?: any) => {
      if(!filters){
        return {}
      }
      const res = {}
      for (var key in filters) {
        if ((filters[key])) {
          res[key] = filters[key][0]
        }
      }
      return res
    }
    console.log(sorter)
    seachPage({...buildFilter(filters)} , { current: page.current, size: page.pageSize || page.size }, empty(sorter) ? null : [{field: sorter.field,  direction: sorter.order}])
  }
  return (
    <div>
      {layout && <MetaTable title={layout?.label} {...layout || {}} data={[...data]} loading={loading} pagination={pagination} onChange={onChange}></MetaTable>}
    </div>
  )
}
export default Table;