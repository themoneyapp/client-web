import { StatusEnum } from "./common";


export interface BaseStore {
  reset(): void;
}


export interface AppState {
  status: StatusEnum;
}


export interface AppStore extends BaseStore, AppState {
  startApp(): Promise<void>;
}
