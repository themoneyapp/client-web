import { createReducer } from "redux-act";

import * as actions from "src/actions/app";
import { AppState } from "src/types/state";

import { StatusEnum } from "src/types/common";


export const defaultState: AppState = {
  status: StatusEnum.IDLE,
};


export const reducer = createReducer<AppState>(
  {
    [actions.appLoadInit.toString()]: (draftState: AppState): AppState => ({
      ...draftState,
      status: StatusEnum.RUNNING
    }),
    [actions.appLoadSuccess.toString()]: (draftState: AppState): AppState => ({
      ...draftState,
      status: StatusEnum.SUCCESS
    })
  },
  defaultState
);

export default reducer;
