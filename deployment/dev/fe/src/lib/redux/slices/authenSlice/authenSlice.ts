/* Core */
import { createSlice } from "@reduxjs/toolkit";

const initialState: authenSliceState = {
  loading: false,
  listUser: [],
  UserInfo: {
    username: "",
    kyc_fullname: "",
    kyc_identity_address: "",
    kyc_identity_id: "",
    emailVerified: false,
    shops: [
      {
        shop_name: "",
        email: "",
        commercial_name: "",
        shop_level_id: "",
        phone_number: "",
        loyaty: ""
      }
    ],
  },
  token: ""
};

export const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    fetchListAuthenStart: (state) => {
      state.loading = true;
    },
    fetchListAuthenSuccess: (state, action) => {
      state.loading = false;
      state.UserInfo = action.payload;
      state.token = action.payload?.token
    },
    fetchListAuthenFailure: (state) => {
      state.loading = false;
    },
    fetchCheckUserSessionStart: (state) => {
      state.loading = true;
    },
    fetchCheckUserSessionSuccess: (state, action) => {
      state.loading = false;
    },
    fetchCheckUserSessionFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  
  fetchListAuthenStart,
  fetchListAuthenSuccess,
  fetchListAuthenFailure,

  fetchCheckUserSessionStart,
  fetchCheckUserSessionSuccess,
  fetchCheckUserSessionFailure

} = authenSlice.actions;

export default authenSlice.reducer;

/* Types */
export interface authenSliceState {
  listUser: Array<User>;
  UserInfo: User;
  loading: boolean;
  token: string
}

interface User {
  username: string,
  kyc_fullname: string,
  kyc_identity_address: string,
  kyc_identity_id: string,
  emailVerified: false,
  shops: Array<ShopInfo>
}
interface ShopInfo {
  shop_name: string,
  email: string,
  commercial_name: string,
  shop_level_id: string,
  phone_number: string,
  loyaty: string
}
