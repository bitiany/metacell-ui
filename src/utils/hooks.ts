import { EventEmitter } from 'events';
export const bus = new EventEmitter();
interface EventType {
  title?:string;
  apiKey: string;
  component?:string;
  data?: any;
  container?:string
}

export const useEvent = (type: string, state: EventType) => {

  if(state.data){
    return (listener?:(...args:any[])=>void) => {
      bus.emit(type + "&" + state.apiKey, state)
    };
  }
  return (listener?:(...args:any[])=>void) => {
    if(state.apiKey){
      const listeners = bus.listeners(type + "&" + state.apiKey)
      if(listeners && listeners.length === 0){
        if(listener){
          bus.addListener(type + "&" + state.apiKey, listener)
        }
      }
    }
  }
}