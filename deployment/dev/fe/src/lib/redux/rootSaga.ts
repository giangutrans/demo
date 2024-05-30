import { all, fork } from "redux-saga/effects";
import { provinceSagas } from "./sagas/provinceSagas";
import { authenSagas } from "./sagas/authenSagas";
import { orderSagas } from "./sagas/orderSagas";
import { createOrderSagas } from "./sagas/createOrderSagas";
import { createAddressShopSagas } from "./sagas/createAddressShopSagas";
import { addressShopSagas } from "./sagas/addressShopSagas";
import { productSagas } from "./sagas/productSagas";
import { notificationSagas } from "./sagas/notificationSagas";
import { userUpdateSagas } from "./sagas/updateUserSagas";
import { userSagas } from "./sagas/userSagas";
import { updateBankAccountSagas } from "./sagas/updateBankAccountSagas";

export default function* rootSaga() {
  yield all([fork(provinceSagas)]);
  yield all([fork(authenSagas)]);
  yield all([fork(orderSagas)]);
  yield all([fork(createOrderSagas)]);
  yield all([fork(createAddressShopSagas)]);
  yield all([fork(addressShopSagas)]);
  yield all([fork(productSagas)]);
  yield all([fork(notificationSagas)]);
  yield all([fork(userUpdateSagas)]);
  yield all([fork(updateBankAccountSagas)]);
  yield all([fork(userSagas)]);
}
