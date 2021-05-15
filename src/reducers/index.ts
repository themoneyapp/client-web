import { combineReducers } from "redux";

import * as app from "./app";

import { StoreState } from "src/types/state";


export const initialState: StoreState = {
  app: app.defaultState,
};

export const reducers = combineReducers({
  app: app.reducer,
});

export default reducers;
