// authSagas.js

import { shopApis } from "@/lib/redux/api/shopApis";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCreateAddressShopFailure,
  fetchCreateAddressShopStart,
  fetchCreateAddressShopSuccess
} from "./../slices/addressShopSlice";

function* createAddressShopWorkerSaga(): Generator<any, void, undefined> {
  try {
    const response = yield call(shopApis.createAddressShop);
    yield put(fetchCreateAddressShopSuccess(response));
  } catch (error) {
    console.log("error", error);

    yield put(fetchCreateAddressShopFailure());
  }
}

export function* createAddressShopSagas() {
  yield takeLatest(fetchCreateAddressShopStart.type, createAddressShopWorkerSaga);
}
