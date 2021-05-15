import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";

import appSagas from "./app";

/**
 * rootSaga
 */
export default function* root(): SagaIterator {
  yield all([
    fork(appSagas),
  ]);
}
