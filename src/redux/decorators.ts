// import { REQUEST_DATA, RECEIVE_DATA } from "@/store/actionTypes";
import {injectStore, injectMapper} from './store'

export const Mapper = () => {
  return function(target:any, name:any, descriptor: any) {
    const storeName = name.slice(0,1).toLowerCase() + name.slice(1)
    injectMapper(storeName, descriptor.value, target)
    return descriptor
  }
}

export const Autowire = (target:any, name:any, descriptor: any) =>{
  const storeName = target.constructor.name.slice(0,1).toLowerCase() + target.constructor.name.slice(1)
  injectStore(storeName, descriptor.value.call())
  return descriptor;
}