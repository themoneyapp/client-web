import { applyMiddleware, compose, createStore, Middleware, Store } from "redux";

import rootReducer, { initialState as defaultState } from "src/reducers";
import rootSaga from "src/sagas";
import { StoreState } from "src/types/state";

import defaultMiddlewares, { sagaMiddleware } from "./middlewares";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const configureStore = (initialState: StoreState = defaultState, additionalMiddleware: Middleware[] = []): Store => {
  const store: Store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(...additionalMiddleware, ...defaultMiddlewares)),
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept("src/reducers", () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};