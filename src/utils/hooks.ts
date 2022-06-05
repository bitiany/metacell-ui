import { EventEmitter } from 'events';
export const bus = new EventEmitter();
interface EventType {
  action?: string;
  title?: string;
  apiKey: string;
  component?: string;
  data?: any;
  widget?: string
}

export const Event = {
  openModal: (state: any) => {

  },
  openDrawer:(state:any) => {

  }
}



export const clear = (type: string, state: EventType) => {
  bus.removeAllListeners(type)
}
export const useEvent = (type: string, state: EventType) => {
  if (state.data) {
    return (listener?: (...args: any[]) => void) => {
      bus.emit(type, state)
    };
  }
  return (listener?: (...args: any[]) => void) => {
    if (state.apiKey) {
      const listeners = bus.listeners(type + "&" + state.apiKey)
      if (listeners && listeners.length === 0) {
        if (listener) {
          bus.addListener(type, listener)
        }
      }
    }
  }
}

