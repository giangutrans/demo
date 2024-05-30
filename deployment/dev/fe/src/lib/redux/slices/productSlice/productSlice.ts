/* Core */
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProductSliceState = {
    listProduct: [],
    isCreateSuccess: false,
    loading: false,
    isCreateLoading: false
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // fetchListProvince
        fetchListProductStart: (state) => {
            state.loading = true;
        },
        fetchListProductSuccess: (state, action) => {
            state.loading = false;
            state.listProduct = action.payload;
        },
        fetchListProductFailure: (state) => {
            state.loading = false;
        },
        fetchCreateProductSuccess:(state, action) => {
            state.isCreateLoading = false;
            state.isCreateSuccess = action.payload;
        },
        fetchCreateProductStart:(state) => {
            state.isCreateLoading = true;
        },
        fetchCreateProductFailure:(state) => {
            state.isCreateLoading = false;
        }
    },
});

export const {
    fetchListProductStart,
    fetchListProductSuccess,
    fetchListProductFailure,
    fetchCreateProductSuccess,
    fetchCreateProductStart,
    fetchCreateProductFailure
} = productSlice.actions;

export default productSlice.reducer;

/* Types */
export interface ProductSliceState {
    listProduct: Array<Product>;
    isCreateSuccess: boolean;
    loading: boolean;
    isCreateLoading: boolean;
}

interface Product {
    name: string;
    code: number;
}
