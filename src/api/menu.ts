import {get, post, del} from '@/utils/request'
export const getMenuTree = (param?:any)=>{
  return get("/api/aps/v1/menu/tree", {...param});
}

export const saveMenu = (data:any) => {
  return post("/api/aps/v1/menu", {...data});
}

export const deleteMenu = (id:String) => {
  return del("/api/aps/v1/menu/" + id);
}