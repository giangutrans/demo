/* Instruments */
import type { ReduxState } from "@/lib/redux";


export const listProductSelector = (state: ReduxState) =>
  state.product.listProduct;
