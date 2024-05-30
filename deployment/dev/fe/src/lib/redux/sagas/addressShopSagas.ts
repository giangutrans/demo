// authSagas.js

import { shopApis } from "@/lib/redux/api/shopApis";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchListAddressShopFailure,
  fetchListAddressShopStart,
  fetchListAddressShopSuccess
} from "./../slices/addressShopSlice";

function* addressShopWorkerSaga(): Generator<any, void, undefined> {
  try {
    const response = yield call(shopApis.getListAddressShop);
    yield put(fetchListAddressShopSuccess(response));
  } catch (error) {
    console.log("error", error);

    yield put(fetchListAddressShopFailure());
  }
}

export function* addressShopSagas() {
  yield takeLatest(fetchListAddressShopStart.type, addressShopWorkerSaga);
}
