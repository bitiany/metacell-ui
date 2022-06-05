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
  const [user] = useStorage("setUserInfo")
  const userInfo = user.userInfo
  const headers =useMemo(() => {
    return {
      tenantId: userInfo? userInfo.tenantId : 1000,
      Authorization: (user.tokenType? (user.tokenType +  " ") : "")  + user.accessToken || ""
    }
  },[userInfo, user])
  return useCallback((config) =>{
    const req = request[config.method]
    return req(config.path, {...config.data}, {headers: {...headers, ...config.headers}});
  }, [headers])
}
