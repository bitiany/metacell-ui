import { useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux'
import { setStoreState } from './actions'
import { namespace } from './store';

const UserDispatchCreator = (type: string, state?: any) => {
  const dispatch = useDispatch();
  return useCallback(
    (...data) => {
      return bindActionCreators(setStoreState.bind(null, type, state, ...data), dispatch)();
    },
    [dispatch, type, state]
  );
}

const UseRequestState = (type: string) => {
  return useSelector((state: any) => {
    return state.reducer
  });
}

export const useStorage = (type: string, option?: any) => {
  let state: any = { ...UseRequestState(type) }
  let ns = namespace(type)
  const data = state[ns];
  const dispatch = UserDispatchCreator(type, data);
  return [option ? data[option] : data, dispatch]
}