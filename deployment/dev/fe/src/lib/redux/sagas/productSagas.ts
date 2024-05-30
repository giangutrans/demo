// authSagas.js

import { call, put, takeLatest } from "redux-saga/effects";
import { productApis } from "@/lib/redux/api/productApis";
import {
  fetchCreateProductFailure,
  fetchCreateProductStart,
  fetchCreateProductSuccess,
} from "../slices/productSlice";

function* authenWorkerSaga(): Generator<any, void, undefined> {
  try {
    const response = yield call(productApis.getProduct);
    console.log(response);
    yield put(fetchCreateProductSuccess(response));
  } catch (error) {
    console.log("error", error);

    yield put(fetchCreateProductFailure());
  }
}

export function* productSagas() {
  yield takeLatest(fetchCreateProductStart.type, authenWorkerSaga);
}
