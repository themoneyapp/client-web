import { Dispatch, Action, AnyAction } from "redux";


export interface BaseProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}
