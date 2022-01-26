import {getSystem, getDatasource, deleteDatasource, saveDatasource} from './aps'

 const api = (apiKey?: string)=>{
  if(apiKey === "datasource"){
    return {
      list: getDatasource,
      save: saveDatasource,
      delete: deleteDatasource
    }
  }else if (apiKey === "system"){
    return {
      list: getSystem,
      delete: deleteDatasource,
      save: saveDatasource
    }
  }
  return {
    list: getSystem,
    delete: deleteDatasource,
    save: saveDatasource
  }
}
export default api