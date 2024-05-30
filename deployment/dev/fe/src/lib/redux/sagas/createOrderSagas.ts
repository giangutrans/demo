// authSagas.js

import { orderApis } from "@/lib/redux/api/orderApis";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCreateOrderSuccess,
  fetchCreateOrderFailure,
  fetchCreateOrderStart
} from "./../slices/orderSlice";

function* createOrderWorkerSaga(action: any): Generator<any, void, undefined> {
  try {
    const { payload } = action;
    const {
      onSuccess = () => { },
      onFailure = () => { },
    } = payload;
    const response: any = yield call(orderApis.createOrder, payload);
    if (response.code === 200) {
      onSuccess({ message: response.message });
      yield put(fetchCreateOrderSuccess(response));
    } else {
      onFailure({ message: response.message });
      yield put(fetchCreateOrderFailure());
    }
  } catch (error) {
    console.log("error", error);
    yield put(fetchCreateOrderFailure());
  }
}

export function* createOrderSagas() {
  yield takeLatest(fetchCreateOrderStart.type, createOrderWorkerSaga);
}
