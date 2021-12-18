import * as type from './actionTypes'
import {getFunc, namespace} from './store'

const receiveData = (data:any, namespace?:string) => ({
  type: type.RECEIVE_DATA,
  data,
  namespace
});


export const setStoreState = (type:string, state?: any, ...data:any): any =>{
  const func = getFunc(type)
  const ns = namespace(type)
  state[ns] = func(state[ns], ...data)
  return receiveData(state, ns);
}