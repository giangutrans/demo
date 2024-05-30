import { setClientToken } from '@/utils/axiosClient';
import { combineReducers } from 'redux';
import { addressShopSlice, notificationSlice, orderSlice, productSlice, provinceSlice, userSlice } from './slices';
import { authenSlice } from './slices/authenSlice';

const reducer = combineReducers({
  province: provinceSlice.reducer,
  authen: authenSlice.reducer,
  order: orderSlice.reducer,
  addressShop: addressShopSlice.reducer,
  product: productSlice.reducer,
  user: userSlice.reducer,
  notification: notificationSlice.reducer
});

const rootReducer = (state: any, action: any) => {
  const token = action?.payload?.authen?.token || null;
  if (token) {
    setClientToken(token);
  }
  return reducer(state, action);
}; 

export default rootReducer;
