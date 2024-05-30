/* Core */
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProvinceSliceState = {
  listProvince: [],
  loading: false,
};

export const provinceSlice = createSlice({
  name: "province",
  initialState,
  reducers: {
    // fetchListProvince
    fetchListProvinceStart: (state) => {
      state.loading = true;
    },
    fetchListProvinceSuccess: (state, action) => {
      state.loading = false;
      state.listProvince = action.payload;
    },
    fetchListProvinceFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchListProvinceStart,
  fetchListProvinceSuccess,
  fetchListProvinceFailure,
} = provinceSlice.actions;

export default provinceSlice.reducer;

/* Types */
export interface ProvinceSliceState {
  listProvince: Array<Province>;
  loading: boolean;
}

interface Province {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: [];
}
