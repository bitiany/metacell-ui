import * as at from './array'
import * as hash from './hash'
const pattern = /(\w+)=(\w+)/ig;

const toCamelCase = function(str:string) {
  return str.replace("p_", "")
      .replace(/_(\w)/g, function($1, letter) { return letter.toUpperCase(); });
}

const queryParam = (query: string) => {
  const params = {}
  query.replace(pattern, (substring: any, ...args: any[]) => {
    const [key, value] = args;
    if (key) {
      params[key] = value;
    }
    return ""
  })
  return params
}

const evil = (fn:string) => {
  const Fun = Function
  const fun = new Fun("return " + fn)
  return fun()
}

const empty = (data?:any) => {
  if(typeof data === "string"){
    return data || data.length === 0
  }
  if(Array.isArray(data)){
    return !(data && data.length === 0)
  }
  if(typeof data === "object"){
    return  Object.keys(data).length === 0
  }
  return true;
}

export {
  evil,
  empty,
  at,
  queryParam,
  hash,
  toCamelCase
}; 
