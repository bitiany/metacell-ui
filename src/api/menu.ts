import {doPost, doGet, doDel} from '@/utils/requests'
export const getMenuTree = (param?:any)=>{
  return doGet("/api/msc/v1/menu/tree", {...param});
}

export const saveMenu = (data:any) => {
  return doPost("/api/msc/v1/menu", {...data});
}

export const deleteMenu = (id:String) => {
  return doDel("/api/msc/v1/menu/" + id);
}