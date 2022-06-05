import {doPost, doGet, doDel} from '@/utils/requests'
//应用管理
export const getApplcation = (param?:any)=>{
  return doGet("/api/msc/v1/application/pageList", param);
}

export const saveApplication = (data:any)=>{
  return doPost("/api/msc/v1/application", data);
}


export const deleteApplication = (data:any) => {
  return doDel("/api/msc/v1/application/" + data)
}

export const listApplication = () => {
  return doGet("/api/v1/app/list")
}


export const getApplication = (id:string) => {
  return doGet("/api/msc/v1/application/" + id)
}


export const listResource = (param?:any) => {
  return doGet("/api/v1/app/resource/" + param.appId,  {...param})
}

export const saveModule = (data:any)=>{
  return doPost("/api/msc/v1/application/module", data);
}

export const deleteModule = (id:string) => {
  return doDel("/api/msc/v1/application/module/" + id)
}

export const getResource = (param:any) =>{
  return doPost("/api/msc/v1/application/resource/page",param)
}