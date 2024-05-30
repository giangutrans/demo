/* Core */
import { createSlice } from '@reduxjs/toolkit';

const initialState: NotificationSliceState = {
  listNotification: [],
  loading: false
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    fetchListNotificationStart: (state) => {
      state.loading = true;
    },
    fetchListNotificationSuccess: (state, action) => {
      state.loading = false;
      state.listNotification = action.payload;
    },
    fetchListNotificationFailure: (state) => {
      state.loading = false;
    }
  }
});

export const {
  fetchListNotificationStart,
  fetchListNotificationSuccess,
  fetchListNotificationFailure } =
  notificationSlice.actions;

export default notificationSlice.reducer;

/* Types */
export interface NotificationSliceState {
  listNotification: Array<Notification>;
  loading: boolean;
}

interface Notification {
  title: string;
  content: string;
  active: boolean;
  level: string;
}
