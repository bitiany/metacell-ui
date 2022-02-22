import {getSystem,saveSystem, getDatasource, deleteSystem,getSystemList, deleteDatasource, saveDatasource, 
  listDatasource} from './aps'
  import {getApplication,  listApplication, getApplcation, saveApplication, deleteApplication, listResource, saveModule, deleteModule} from './application'
import { saveMenu, deleteMenu } from './menu'
import {saveOrg, deleteOrg} from './uac'
 const api = (apiKey?: string)=>{
  if(apiKey === "datasource"){
    return {
      pageList: getDatasource,
      save: saveDatasource,
      delete: deleteDatasource,
      list: listDatasource,
      get: getApplication
    }
  }else if (apiKey === "system"){
    return {
      pageList: getSystem,
      delete: deleteSystem,
      save: saveSystem,
      list: getSystemList,
      get: getApplication
    }
  }else if (apiKey === "application"){
    return {
      pageList: getApplcation,
      delete: deleteApplication,
      save: saveApplication,
      list: listApplication,
      get: getApplication
    }
  }else if (apiKey === "resource"){
    return {
      pageList: getApplcation,
      delete: deleteApplication,
      save: saveApplication,
      list: listResource,
      get: getApplication
    }
  }else if (apiKey === "menu"){
    return {
      pageList: getApplcation,
      delete: deleteMenu,
      save: saveMenu,
      list: listResource,
      get: getApplication
    }
  }else if (apiKey === "module"){
    return {
      pageList: getApplcation,
      delete: deleteModule,
      save: saveModule,
      list: listResource,
      get: getApplication
    }
  }else if (apiKey === "organization"){
    return {
      pageList: getApplcation,
      delete: deleteOrg,
      save: saveOrg,
      list: listResource,
      get: getApplication
    }
  }
  return {
    pageList: getSystem,
    delete: deleteDatasource,
    save: saveDatasource,
    list: listDatasource,
    get: getApplication
  }
}
export default api