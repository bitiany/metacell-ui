import {
  getSystem, saveSystem, getDatasource, deleteSystem, getSystemList, deleteDatasource, saveDatasource,
  listDatasource
} from './aps'
import { getApplication, listApplication, getApplcation, saveApplication, deleteApplication, listResource,  saveModule, deleteModule } from './application'
import { saveMenu, deleteMenu } from './menu'
import { saveOrg, deleteOrg } from './uac'
import { getMetaPageList } from '@/api/metapage'
import { doPost, doDel } from '@/utils/requests'

export const queryMany = (data: any, apiKey: string) => {
  return doPost("/api/query/many/" + apiKey, data);
}

export const queryOne = (apiKey: string, id: string) => {
  return doPost("/api/query/one/" + apiKey, {
    condition: {
      id: id
    }
  })
}


const delegateSave = (apiKey: string, data: any) => {
  return doPost("/api/v1/command/" + apiKey, {...data})
}

const delegateDelete = (apiKey: string, id:string) => {
  return doDel("/api/v1/command/" + apiKey + "/" + id)
}

const api = (apiKey?: string) => {
  if (apiKey === "datasource") {
    return {
      pageList: getDatasource,
      save: saveDatasource,
      delete: deleteDatasource,
      list: listDatasource,
      get: getApplication
    }
  } else if (apiKey === "system") {
    return {
      pageList: getSystem,
      delete: deleteSystem,
      save: saveSystem,
      list: getSystemList,
      get: getApplication
    }
  } else if (apiKey === "application") {
    return {
      pageList: queryMany,
      delete: deleteApplication,
      save: saveApplication,
      list: listApplication,
      get: getApplication
    }
  } else if (apiKey === "resource") {
    return {
      pageList: queryMany,
      delete: deleteApplication,
      save: saveApplication,
      list: listResource,
      get: getApplication
    }
  } else if (apiKey === "menu") {
    return {
      pageList: getApplcation,
      delete: deleteMenu,
      save: saveMenu,
      list: listResource,
      get: queryOne
    }
  } else if (apiKey === "module") {
    return {
      pageList: getApplcation,
      delete: deleteModule,
      save: saveModule,
      list: listResource,
      get: getApplication
    }
  } else if (apiKey === "organization") {
    return {
      pageList: getApplcation,
      delete: deleteOrg,
      save: saveOrg,
      list: listResource,
      get: getApplication
    }
  } else if (apiKey === "user") {
    return {
      pageList: queryMany,
      delete: deleteOrg,
      save: saveOrg,
      list: listResource,
      get: getApplication
    }
  } else if (apiKey === "metaPage") {
    return {
      pageList: getMetaPageList,
      delete: deleteOrg,
      save: saveOrg,
      list: listResource,
      get: getApplication
    }
  }
  return {
    pageList: queryMany,
    delete: delegateDelete,
    save: delegateSave,
    list: listDatasource,
    get: getApplication
  }
}
export default api