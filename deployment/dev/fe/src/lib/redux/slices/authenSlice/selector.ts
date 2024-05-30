import type { ReduxState } from "@/lib/redux";

export const UserInfoAuthnSelector = (state: ReduxState) =>
  state.authen.UserInfo;
export const listAuthnSelector = (state: ReduxState) =>
  state.authen.listUser;
export const tokenSelector = (state: ReduxState) =>
  state.authen.token;
export const fechAuthenSelector = (state: ReduxState) =>
  state.authen.loading;


