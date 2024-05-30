// authSagas.js

import { provinceApis } from "@/lib/redux/api/provinceApis";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchListProvinceFailure,
  fetchListProvinceStart,
  fetchListProvinceSuccess,
} from "./../slices/provinceSlice";

function* provinceWorkerSaga(): Generator<any, void, undefined> {
  try {
    const response = yield call(provinceApis.getListProvincesApi);
    yield put(fetchListProvinceSuccess(response));
  } catch (error) {
    console.log("error", error);

    yield put(fetchListProvinceFailure());
  }
}

export function* provinceSagas() {
  yield takeLatest(fetchListProvinceStart.type, provinceWorkerSaga);
}
