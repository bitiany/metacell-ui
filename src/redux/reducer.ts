import { RECEIVE_DATA } from "./actionTypes";
import initialState from './store';
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: any) => {
  switch (action.type) {
    case RECEIVE_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
