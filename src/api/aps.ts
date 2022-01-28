import {get, post, del} from '@/utils/request'

export const getSystem = (param?:any)=>{
  return get("/api/aps/v1/system/list");
}

export const getDatasource = (param?:any)=>{
  return get("/api/aps/v1/datasource/pageList", param);
}

export const saveDatasource = (data:any)=>{
  return post("/api/aps/v1/datasource", data);
}


export const deleteDatasource = (id:string) => {
  return del("/api/aps/v1/datasource/" + id)
}

export const listDatasource = (id:string) => {
  return get("/api/aps/v1/datasource/list")
}