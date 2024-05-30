// authSagas.js

import { userApis } from "@/lib/redux/api/userApis";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUpdateBankAccountFailure,
  fetchUpdateBankAccountStart,
  fetchUpdateBankAccountSuccess
} from "./../slices/userSlice";

function* updateBankAccountWorkerSaga(): Generator<any, void, undefined> {
  try {
    const response = yield call(userApis.updateBankAccount);
    yield put(fetchUpdateBankAccountSuccess(response));
  } catch (error) {
    console.log("error", error);

    yield put(fetchUpdateBankAccountFailure());
  }
}

export function* updateBankAccountSagas() {
  yield takeLatest(fetchUpdateBankAccountStart.type, updateBankAccountWorkerSaga);
}
