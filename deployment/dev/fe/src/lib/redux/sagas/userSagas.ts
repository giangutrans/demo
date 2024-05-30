// authSagas.js

import { userApis } from "@/lib/redux/api/userApis";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    fetchInsertUserFailure,
    fetchInsertUserStart,
    fetchInsertUserSuccess,
    fetchVerifyOTPSuccess,
    fetchVerifyOTPStart,
    fetchVerifyOTPFailure
} from "./../slices/userSlice";

function* userInsertWorkerSaga(action: any): Generator<any, void, any> {
    try {
        const { payload } = action;
        const {
            onSuccess = () => { },
            onFailure = () => { },
        } = payload;
        const response = yield call(userApis.insertUser, payload);
        if (response.status === "success") {
            onSuccess(response);
            yield put(fetchInsertUserSuccess(response));
        } else {
            onFailure(response);
            yield put(fetchInsertUserFailure());
        }
    } catch (error) {
        console.log("error", error);
        yield put(fetchInsertUserFailure());
    }
}

function* verifyOTPWorkerSaga(action: any): Generator<any, void, any> {
    try {
        const { payload } = action;
        const {
            onSuccess = () => { },
            onFailure = () => { },
        } = payload;
        const response = yield call(userApis.verifyOTP, payload);
        if (response.status === "success") {
            onSuccess({ message: response.message });
            yield put(fetchVerifyOTPSuccess(response));
        } else {
            onFailure({ message: response.message });
            yield put(fetchVerifyOTPFailure());
        }
    } catch (error) {
        console.log("error", error);
        yield put(fetchVerifyOTPFailure());
    }
}

export function* userSagas() {
    yield takeLatest(fetchInsertUserStart.type, userInsertWorkerSaga);
    yield takeLatest(fetchVerifyOTPStart.type, verifyOTPWorkerSaga);
}
