
import type { ReduxState } from "@/lib/redux";

export const listAddressShopSelector = (state: ReduxState) =>
  state.addressShop.listAddressShop;
