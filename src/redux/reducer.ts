import { RECEIVE_DATA } from "./actionTypes";
import initialState from './store';
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: any) => {
  switch (action.type) {
    case RECEIVE_DATA:
      const newState = {...state}
      newState[action.namespace] = action.data
      return newState;
    default:
      return state;
  }
};
