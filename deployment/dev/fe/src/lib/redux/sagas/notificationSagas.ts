// authSagas.js

import { notifcationApis } from '@/lib/redux/api/notificationApis';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchListNotificationFailure,
  fetchListNotificationStart,
  fetchListNotificationSuccess
} from '../slices/notificationSlice';

function* authenWorkerSaga(action: any): Generator<any, void, any> {
  try {
    const { payload } = action;
    // const { onSuccess = () => {}, onFailure = () => {} } = payload;
    const response = yield call(notifcationApis.getListNotification);
    if (response.status === 'success') {
      // onSuccess(response);
      yield put(fetchListNotificationSuccess(response.data));
    } else {
      // onFailure(response);
    }
  } catch (error) {
    console.log('error', error);
    yield put(fetchListNotificationFailure());
  }
}

export function* notificationSagas() {
  yield takeLatest(fetchListNotificationStart.type, authenWorkerSaga);
}
