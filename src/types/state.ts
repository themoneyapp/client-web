import { StatusEnum } from "./common";


export interface AppState {
  status: StatusEnum;
}

export interface StoreState {
  app: AppState;
}
