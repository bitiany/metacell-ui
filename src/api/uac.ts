import {doPost, doGet, doDel, doPut} from '@/utils/requests'
export const doLogin = (passport:any, headers?: any) =>{
  return doGet("/api/oauth/token", passport, headers);
}

export const orgTree = (param: any) => {
  return doPost("/api/v1/org/tree", {...param})
}

export const deleteOrg = (id: string) => {
  return doDel("/api/v1/org/" + id)
}

export const saveOrg = (param: any) => {
  return doPut("/api/v1/org/", param)
}

export const userPage = (param: any) => {
  return doPost("/api/uac/v1/user", param)
}

export const findUserInfo = (token:string, tokenType:string) => {
  const header = {
    Authorization: (tokenType? (tokenType +  " ") : "")  + token || ""
  }
  return doGet("/api/v1/oauth/token/info", null, header);
}


export const getTenant = (token:string, tokenType:string) => {
  const header = {
    Authorization: (tokenType? (tokenType +  " ") : "")  + token || ""
  }
  return doGet("/api/v1/tenant",null, header)
}