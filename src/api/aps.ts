import {get, post, del} from '@/utils/request'
// 系统
export const getSystem = (param?:any)=>{
  return get("/api/aps/v1/system/pageList");
}

export const getSystemList = (param?:any)=>{
  return get("/api/aps/v1/system/list");
}

export const deleteSystem = (id:string) => {
  return del("/api/aps/v1/system/" + id)
}

export const saveSystem = (data:any)=>{
  return post("/api/aps/v1/system", data);
}

// 数据源

export const getDatasource = (param?:any)=>{
  return get("/api/aps/v1/datasource/pageList", param);
}

export const saveDatasource = (data:any)=>{
  return post("/api/aps/v1/datasource", data);
}


export const deleteDatasource = (id:string) => {
  return del("/api/aps/v1/datasource/" + id)
}

export const listDatasource = () => {
  return get("/api/aps/v1/datasource/list")
}
