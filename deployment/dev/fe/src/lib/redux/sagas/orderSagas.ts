// authSagas.js

import { orderApis } from "@/lib/redux/api/orderApis";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchListOrderFailure,
  fetchCreateOrderSuccess,
  fetchListOrderStart,
  fetchListOrderSuccess
} from "./../slices/orderSlice";

function* orderWorkerSaga(action: any): Generator<any, void, any> {
  try {
    const { payload } = action;
    const {
      page,
      pageSize,
      onSuccess = () => { },
      onFailure = () => { }
    } = payload;
    const formdata = new FormData();
    formdata.append("page", page);
    formdata.append("pageSize", pageSize);
    const response = yield call(orderApis.getOrder, formdata);
    if (response.status === "success") {
      onSuccess(response);
      yield put(fetchListOrderSuccess(response));
    } else {
      onFailure(response);
    }
  } catch (error) {
    console.log("error", error);
    yield put(fetchListOrderFailure());
  }
}

export function* orderSagas() {
  yield takeLatest(fetchListOrderStart.type, orderWorkerSaga);
}
