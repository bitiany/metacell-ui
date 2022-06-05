import { doPost, doDel } from '@/utils/requests'

export const queryMany = (apiKey: string, data: any) => {
  return doPost("/api/query/many/" + apiKey, data);
}

export const queryOne = (apiKey: string, id: string) => {
  return doPost("/api/query/one/" + apiKey, {
    condition: {
      id: id,
      clientType: 2
    }
  })
}

const delegateSave = (apiKey: string, data: any) => {
  return doPost("/api/v1/command/" + apiKey, {...data})
}

const delegateDelete = (apiKey: string, id:string) => {
  return doDel("/api/v1/command/" + apiKey + "/" + id)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  pageList: queryMany,
    delete: delegateDelete,
    save: delegateSave,
    list: queryMany,
    get: queryOne
}