import {doPost, doGet, doDel} from '@/utils/requests'
export const doLogin = (passport:any, headers?: any) =>{
  return doGet("/api/uac/oauth/token", passport, headers);
}

export const orgTree = (param: any) => {
  return doGet("/api/uac/v1/org/tree", {...param})
}

export const deleteOrg = (id: string) => {
  return doDel("/api/uac/v1/org/" + id)
}

export const saveOrg = (param: any) => {
  return doPost("/api/uac/v1/org/", param)
}

export const userPage = (param: any) => {
  return doPost("/api/uac/v1/user", param)
}