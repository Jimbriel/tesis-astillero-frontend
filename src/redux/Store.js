import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Reducer from "./Reducers";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// export function configureStore(InitialState) {
  const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
    whitelist: [],
  };
  const pReducer = persistReducer(persistConfig, Reducer);
 
  export const store = createStore(pReducer, composeWithDevTools(applyMiddleware(thunk)));
  export const persistor = persistStore(store);
  
  // const Store = createStore(
  //   Reducers,
  //   InitialState,
  //   composeWithDevTools(applyMiddleware(thunk))
  // );
  // return Store;
// }
