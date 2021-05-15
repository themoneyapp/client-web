import { SagaIterator } from "redux-saga";
import { delay, put, takeLatest } from "redux-saga/effects";

import { appLoadInit, appLoadSuccess } from "src/actions/app";


export function* startApp(): SagaIterator {
  yield delay(400);
  yield put(appLoadSuccess());
}


export default function* root(): SagaIterator {
  yield takeLatest(appLoadInit.getType(), startApp);
}
