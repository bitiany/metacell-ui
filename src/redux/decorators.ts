import { injectStore, injectMapper, Register } from './store'

export const Store = (a: any) => {
  return function (target: any, namespace: string) {
    return target.namespace = namespace;
  }
}

export const Mapper = () => {
  return function (target: any, name: any, descriptor: any) {
    const storeName = name.slice(0, 1).toLowerCase() + name.slice(1)
    injectMapper(storeName, descriptor.value, target)
    return descriptor
  }
}

export const Autowire = (namespace:string) => {
  return (target: any, name: any, descriptor: any) => {
    target.name = namespace
    Register(namespace, target)
    injectStore(namespace, descriptor.value.call())
    return descriptor
  };
}

export const Component = (_component: any) => {
  return (target: any) => {
    target._component = _component
  }
}