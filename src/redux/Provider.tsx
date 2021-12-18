import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from "redux-thunk";
import reducer from "./reducer";

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}
const reducers = combineReducers<any>({reducer})
// debugger
const myPersistReducer = persistReducer(persistConfig, reducers)
// redux 注入操作
const middleware = [thunk];
const store = createStore(
  myPersistReducer,
  applyMiddleware(...middleware)
);
const persistor = persistStore(store)
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }: any) => <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    {children}
  </PersistGate>
</Provider>;