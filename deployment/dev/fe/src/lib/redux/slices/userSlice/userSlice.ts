/* Core */
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserSliceState = {
    responseUpdateUser: null,
    responeUpdateBankAccount: null,
    responseInsertUser: null,
    loading: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        fetchInsertUserStart: (state) => {
            state.loading = true;
        },
        fetchInsertUserSuccess: (state, action) => {
            state.loading = false;
        },
        fetchInsertUserFailure: (state) => {
            state.loading = false;
        },

        fetchUpdateUserStart: (state) => {
            state.loading = true;
        },
        fetchUpdateUserSuccess: (state, action) => {
            state.loading = false;
            state.responseUpdateUser = action.payload;
        },
        fetchUpdateUserFailure: (state) => {
            state.loading = false;
        },

        fetchVerifyOTPStart: (state) => {
            state.loading = true;
        },
        fetchVerifyOTPSuccess: (state, action) => {
            state.loading = false;
        },
        fetchVerifyOTPFailure: (state) => {
            state.loading = false;
        },

        fetchUpdateBankAccountStart: (state) => {
            state.loading = true;
        },
        fetchUpdateBankAccountSuccess: (state, action) => {
            state.loading = false;
            state.responeUpdateBankAccount = action.payload;
        },
        fetchUpdateBankAccountFailure: (state) => {
            state.loading = false;
        },
    },
});

export const {
    fetchInsertUserStart,
    fetchInsertUserSuccess,
    fetchInsertUserFailure,
    fetchUpdateUserStart,
    fetchUpdateUserSuccess,
    fetchUpdateUserFailure,
    fetchUpdateBankAccountStart,
    fetchUpdateBankAccountSuccess,
    fetchUpdateBankAccountFailure,
    fetchVerifyOTPStart,
    fetchVerifyOTPSuccess,
    fetchVerifyOTPFailure
} = userSlice.actions;

export default userSlice.reducer;

/* Types */
export interface UserSliceState {
    responseInsertUser: any,
    responseUpdateUser: any;
    responeUpdateBankAccount: any;
    loading: boolean;
}

interface User {
    name: string;
    phone: string;
    email: string;
    password: string;
    id: number;
}

interface BankAccount {
    branchBank: string;
    bankAccount: string;
    bankAccountNumber: string;
    bank: string;
    id: number;
}
