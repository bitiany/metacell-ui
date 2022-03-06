import * as at from './array'
import * as hash from './hash'
const pattern = /(\w+)=(\w+)/ig;

const toCamelCase = function(str:string) {
  return str.replace("p_", "")
      .replace(/_(\w)/g, function($1, letter) { return letter.toUpperCase(); });
}

const queryParam = (query: string) => {
  let params = {}
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

export {
  evil,
  at,
  queryParam,
  hash,
  toCamelCase
}; 
