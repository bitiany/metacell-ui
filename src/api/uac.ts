import {post, get, del} from '@/utils/request'
export const doLogin = (passport:any) =>{
  return post("/api/uac/doLogin?username=" +passport.username  + "&password=" + passport.password);
}

export const orgTree = (param: any) => {
  return get("/api/uac/v1/org/tree", {...param})
}

export const deleteOrg = (id: string) => {
  return del("/api/uac/v1/org/" + id)
}

export const saveOrg = (param: string) => {
  return post("/api/uac/v1/org/", param)
}