import {doPost, doGet, doDel} from '@/utils/requests'
// 系统
export const getSystem = (param?:any)=>{
  return doGet("/api/msc/v1/system/pageList");
}

export const getSystemList = (param?:any)=>{
  return doGet("/api/v1/system/list");
}

export const deleteSystem = (id:string) => {
  return doGet("/api/msc/v1/system/" + id)
}

export const saveSystem = (data:any)=>{
  return doPost("/api/msc/v1/system", data);
}

// 数据源

export const getDatasource = (param?:any)=>{
  return doGet("/api/msc/v1/datasource/pageList", param);
}

export const saveDatasource = (data:any)=>{
  return doGet("/api/msc/v1/datasource", data);
}


export const deleteDatasource = (id:string) => {
  return doDel("/api/msc/v1/datasource/" + id)
}

export const listDatasource = () => {
  return doGet("/api/msc/v1/datasource/list")
}
