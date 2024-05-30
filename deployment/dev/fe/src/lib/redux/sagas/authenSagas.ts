import { call, put, takeLatest } from "redux-saga/effects";
import { authenApis } from "@/lib/redux/api/authenApis";
import {
  fetchListAuthenFailure,
  fetchListAuthenStart,
  fetchListAuthenSuccess,
  fetchCheckUserSessionStart,
  fetchCheckUserSessionSuccess,
  fetchCheckUserSessionFailure
} from "./../slices/authenSlice";

function* authenWorkerSaga(action: any): Generator<any, void, any> {
  try {
    const { payload } = action;
    const {
      username,
      password,
      onSuccess = () => { },
      onFailure = () => { },
    } = payload;
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    const response = yield call(authenApis.getLoginUser, formdata);
    if (response?.status === "success") {
      onSuccess(response);
      yield put(fetchListAuthenSuccess(response.data));
    } else {
      onFailure(response);
    }
  } catch (error) {
    console.log("error", error);
    yield put(fetchListAuthenFailure());
  }
}


function* checkUsessionSaga(action: any): Generator<any, void, any> {
  try {
    const { payload } = action;
    const { token } = payload;
    const response = yield call(authenApis.checkUserSession);
    console.log(response);
    
    // if (response?.status === "success") {
    //   onSuccess(response);
    //   yield put(fetchListAuthenSuccess(response.data));
    // } else {
    //   onFailure(response);
    // }

  } catch (error) {
    console.log("error", error);
    yield put(fetchListAuthenFailure());
  }
}

export function* authenSagas() {
  yield takeLatest(fetchListAuthenStart.type, authenWorkerSaga);
  yield takeLatest(fetchCheckUserSessionStart.type, checkUsessionSaga);
}
