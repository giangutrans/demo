/* Core */
import { createSlice } from "@reduxjs/toolkit";

const initialState: OrderSliceState = {
    listOrder: [],
    isCreateSuccess: false,
    loading: false,
    isCreateLoading: false
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        // fetchListProvince
        fetchListOrderStart: (state) => {
            state.loading = true;
        },
        fetchListOrderSuccess: (state, action) => {
            state.loading = false;
        },
        fetchListOrderFailure: (state) => {
            state.loading = false;
        },
        fetchCreateOrderSuccess: (state, action) => {
            state.isCreateLoading = false;
            state.isCreateSuccess = action.payload;
        },
        fetchCreateOrderStart: (state) => {
            state.isCreateLoading = true;
        },
        fetchCreateOrderFailure: (state) => {
            state.isCreateLoading = false;
        }
    },
});

export const {
    fetchListOrderStart,
    fetchListOrderSuccess,
    fetchListOrderFailure,
    fetchCreateOrderSuccess,
    fetchCreateOrderStart,
    fetchCreateOrderFailure
} = orderSlice.actions;

export default orderSlice.reducer;

/* Types */
export interface OrderSliceState {
    listOrder: Array<any>;
    isCreateSuccess: boolean;
    loading: boolean;
    isCreateLoading: boolean;
}

interface Order {
    order_code: string,
    tracking_code: string,
    shipper_id: number,
    shipper_name: string,
    status: string,
    pick_from: UserInfo,
    pick_to: UserInfo,
    product: Array<Product>
}

interface UserInfo {
    name: string,
    phone_number: string,
    email: string,
    address: Address
}

interface Address {
    address: string
    ward: string
    district: string
    province: string
    postcode: string
}

interface Product {
    name: string,
    product_code: string,
    weight: number,
    quantity: number,
}
