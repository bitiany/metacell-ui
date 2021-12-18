type ActionType = {
  name: string;
  action: (...o: any) => void;
  refClass: any;
};

type ContextType = {
  refClass: {
    [key: string]: any;
  };
  funcs: {
    [key: string]: ActionType;
  };
};

const initialState: any = {};

let StoreContext: ContextType = {
  refClass: {},
  funcs: {},
};


export const Register = (apis: any) => {
  if (initialState[apis.name]) {
    throw new Error("API name 不能重复");
  }
  StoreContext.refClass[apis.name.slice(0,1).toLowerCase() + apis.name.slice(1)] = apis;
};

export const injectStore = (namespace:string,state?: any) => {
  initialState[namespace] = state;
};

export const injectMapper = (name: string, target: any, refClass?: any) => {
  StoreContext.funcs[name] = {
    name,
    refClass,
    action: target,
  };
};

export const getFunc = (name: string) => {
  return StoreContext.funcs[name].action;
};

export const namespace = (type:string) => {
  const name = StoreContext.funcs[type].refClass.constructor.name;
  const storeName = name.slice(0,1).toLowerCase() + name.slice(1)
  return storeName;
}
export default initialState