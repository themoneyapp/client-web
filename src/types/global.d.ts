import { compose } from "redux";


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }

  declare interface NodeModule {
    hot: {
      accept(path?: string, fn: () => void, callback?: () => void): void;
    };
  }
}

