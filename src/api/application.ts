import {get, post, del} from '@/utils/request'
//应用管理
export const getApplcation = (param?:any)=>{
  return get("/api/aps/v1/application/pageList", param);
}

export const saveApplication = (data:any)=>{
  return post("/api/aps/v1/application", data);
}


export const deleteApplication = (id:string) => {
  return del("/api/aps/v1/application/" + id)
}

export const listApplication = () => {
  return get("/api/aps/v1/application/list")
}


export const getApplication = (id:string) => {
  return get("/api/aps/v1/application/" + id)
}


export const listResource = (param?:any) => {
  return get("/api/aps/v1/application/resource/" + param.appId,  {...param})
}

export const saveModule = (data:any)=>{
  return post("/api/aps/v1/application/module", data);
}

export const deleteModule = (id:string) => {
  return del("/api/aps/v1/application/module/" + id)
}