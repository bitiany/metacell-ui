import { MetaItem } from "@/core/types";

const ReferenceFormat = (item: MetaItem, value:any, record:any) => {
  if(item.itemType === 10){
    const fields = item.apiKey.split(".")
    const apiKey = fields[0]
    return record[apiKey]? record[apiKey][fields.length>1?fields[1]:"name"] : null;
  }
  if(item.itemType === 11){
    const fields = item.apiKey.split(".")
    const apiKey = fields[0]
    return record[fields.length>1?fields[1]:apiKey] ? record[fields.length>1?fields[1]:apiKey]['name'] : null;
  }
  return value ? value.name : null;
}
export default ReferenceFormat