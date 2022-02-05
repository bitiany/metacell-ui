import {getSystem,saveSystem, getDatasource, deleteSystem,getSystemList, deleteDatasource, saveDatasource, listDatasource,getApplication,  listApplication, getApplcation, saveApplication, deleteApplication} from './aps'

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