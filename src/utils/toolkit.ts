import * as at from './array'
const pattern = /(\w+)=(\w+)/ig;

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

export {
  at,
  queryParam
}; 