import {getSystem, getDatasource, deleteDatasource, saveDatasource, listDatasource} from './aps'

 const api = (apiKey?: string)=>{
  if(apiKey === "datasource"){
    return {
      pageList: getDatasource,
      save: saveDatasource,
      delete: deleteDatasource,
      list: listDatasource
    }
  }else if (apiKey === "system"){
    return {
      pageList: getSystem,
      delete: deleteDatasource,
      save: saveDatasource,
      list: listDatasource
    }
  }
  return {
    pageList: getSystem,
    delete: deleteDatasource,
    save: saveDatasource,
    list: listDatasource
  }
}
export default api