import {doPost, doGet} from '@/utils/requests'

export const getLayoutByApiKey = (systemId:string, apiKey:string, category?:number) => {
  return doGet(`/api/v1/layout/${systemId}/${apiKey}`, {category})
}

export const getMetaPageList = ()=> {
  return doPost("/api/msc/v1/layout");
}