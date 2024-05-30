/* Core */
import { createSlice } from "@reduxjs/toolkit";

const initialState: AddressShopSliceState = {
    isCreateSuccess: false,
    listAddressShop:[],
    loading: false,
    loadingCreate: false
};

export const addressShopSlice = createSlice({
    name: "addressShop",
    initialState,
    reducers: {
        fetchCreateAddressShopStart: (state) => {
            state.loadingCreate = true;
        },
        fetchCreateAddressShopSuccess: (state, action) => {
            state.loadingCreate = false;
            state.isCreateSuccess = action.payload;
        },
        fetchCreateAddressShopFailure: (state) => {
            state.loadingCreate = false;
        },
        fetchListAddressShopStart: (state) => {
            state.loading = true;
        },
        fetchListAddressShopSuccess: (state, action) => {
            state.loading = false;
            state.listAddressShop = action.payload;
        },
        fetchListAddressShopFailure: (state) => {
            state.loading = false;
        },
    },
});

export const {
    fetchCreateAddressShopStart,
    fetchCreateAddressShopSuccess,
    fetchCreateAddressShopFailure,
    fetchListAddressShopStart,
    fetchListAddressShopSuccess,
    fetchListAddressShopFailure
} = addressShopSlice.actions;

export default addressShopSlice.reducer;

/* Types */
export interface AddressShopSliceState {
    isCreateSuccess: boolean;
    listAddressShop: Array<AddressShop>
    loading: boolean;
    loadingCreate: boolean;
}

interface AddressShop {
    id: any;
    storage: string;
    phone: string;
    name: string;
    street: string;
    surburb: string;
    district: number;
    city: number;
    fullAddress: string;
    isEnable: boolean;
}
