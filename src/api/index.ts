import {getSystem, getDatasource, deleteDatasource, saveDatasource} from './aps'

 const api = (apiKey?: string)=>{
  if(apiKey === "datasource"){
    return {
      pageList: getDatasource,
      save: saveDatasource,
      delete: deleteDatasource
    }
  }else if (apiKey === "system"){
    return {
      pageList: getSystem,
      delete: deleteDatasource,
      save: saveDatasource
    }
  }
  return {
    pageList: getSystem,
    delete: deleteDatasource,
    save: saveDatasource
  }
}
export default api