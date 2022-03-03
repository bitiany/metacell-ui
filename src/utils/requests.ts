import { useCallback, useMemo } from 'react'
import { useStorage } from '@/redux'
import * as request from '@/utils/https'

export const doGet = (path: string, data?:any, headers?:any) => {
  return {method:"get",path, data, headers}
}

export const doPost = (path: string, data?:any, headers?:any) => {
  return {method:"post",path, data, headers}
}

export const doDel = (path: string, data?:any, headers?:any) => {
  return {method:"del",path, data, headers}
}

export const doPut = (path: string, data?:any, headers?:any) => {
  return {method:"put",path, data, headers}
}

//定义请求hook函数，注入租户、认证Token等信息
export const useRequest = () =>{
  const [userInfo] = useStorage("setUserInfo")
  const headers =useMemo(() => {
    return {
      Tenant_id: userInfo.tenantId || 1000,
      Authorization: (userInfo.tokenType? (userInfo.tokenType +  " ") : "")  + userInfo.accessToken || ""
    }
  },[userInfo])
  return useCallback((config) =>{
    const req = request[config.method]
    return req(config.path, {...config.data}, {headers: {...headers, ...config.headers}});
  }, [headers])
}
