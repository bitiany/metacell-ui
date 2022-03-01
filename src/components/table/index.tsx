import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import MetaTable from '@/core/table/MetaTable';

import { useLocation } from 'react-router-dom'
import { queryParam } from '@/utils/toolkit'
import AsyncProvider from '@/core/provider'
import { useEvent, clear } from '@/utils/hooks'
import { useStorage } from '@/redux';
import { useRequest } from '@/utils/requests';
import { getLayoutByApiKey } from '@/api/metapage';
import api from '@/api'

const Table = (props: any) => {
  const pathRef: any = useRef<string>('')
  const { pathname, search }: any = useLocation()
  const [data, setData] = useState<any[]>([])
  const [pagination, setPagination] = useState<any>({})
  const [provider, setProvider] = useState<any>({ visible: false, data: {} })
  const [layout, setLayout] = useState<any>()
  const [system] = useStorage("setSystem")
  const request = useRequest()
  const para: any = useMemo(() => {
    return props.apiKey ? { apiKey: props.apiKey } : queryParam(search)
    // eslint-disable-next-line
  }, [search])
  const { apiKey } = para
  const { condition } = props;
  const listener = useEvent("showProvider", { apiKey })
  const setVisible = (visible: boolean) => {
    setProvider({ visible: visible })
  }
  useEffect(() => {
    request(getLayoutByApiKey(system.systemId, apiKey)).then((resp: any) => {
      if (resp.success) {
        const layoutConfig = resp.result
        setLayout((layoutConfig && JSON.stringify(layoutConfig) !== "{}") ? (layoutConfig.type === "json" ? JSON.parse(layoutConfig.config) : {}) : null)
      }
    })
  }, [system, apiKey, request])

  const seachPage = useCallback((param?: any) => {
    request(api(apiKey)?.pageList({ ...param, ...pagination, ...condition })).then((resp: any) => {
      if (resp.success) {
        setData(resp["result"]?.records?.map((r: any) => {
          return { key: r.id, ...r }
        }))
        setPagination({ total: resp.result.total, defaultCurrent: resp.result.current, pageSize: 10 })
      }
    }).catch((resp: any) => {
    })
  }, [apiKey, pagination, request, condition])
  useEffect(() => {
    seachPage()
    // eslint-disable-next-line
  }, [condition])

  useEffect(() => {
    listener((data: any) => {
      setProvider({ visible: true, ...data })
    })
    pathRef.current = pathname + search
    return () => { clear("showProvider", { apiKey }) }
  }, [pathRef, listener, apiKey, pathname, search])


  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    setPagination({ current: pagination.current, size: pagination.pageSize })
    const buildFilter = (filters: any) => {
      const res = {}
      for (var key in filters) {
        if ((filters[key])) {
          res[key] = filters[key][0]
        }
      }
      return res
    }
    console.log(pagination, filters, buildFilter(filters))
    seachPage({
      ...pagination, ...buildFilter(filters)
    })
  }
  const onOperator = (type: string, data: any) => {
    if (type === "delete") {
      request(api(apiKey)?.delete(data.id)).then((resp: any) => {
        seachPage({
          ...pagination
        })
      }).catch((resp: any) => {

      })
    }
  }
  return (
    <div>
      {layout && <MetaTable title={layout?.label} {...layout || {}} data={[...data]} pagination={pagination} onChange={onChange} onOperator={onOperator}></MetaTable>}
      <AsyncProvider {...provider} setVisible={setVisible} />
    </div>
  )
}
export default Table;