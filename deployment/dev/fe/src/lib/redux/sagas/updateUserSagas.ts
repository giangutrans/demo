// authSagas.js

import { userApis } from "@/lib/redux/api/userApis";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUpdateUserFailure,
  fetchUpdateUserStart,
  fetchUpdateUserSuccess
} from "./../slices/userSlice";

function* userUpdateWorkerSaga(): Generator<any, void, undefined> {
  try {
    const response = yield call(userApis.updateProfileUser);
    yield put(fetchUpdateUserSuccess(response));
  } catch (error) {
    console.log("error", error);

    yield put(fetchUpdateUserFailure());
  }
}

export function* userUpdateSagas() {
  yield takeLatest(fetchUpdateUserStart.type, userUpdateWorkerSaga);
}
