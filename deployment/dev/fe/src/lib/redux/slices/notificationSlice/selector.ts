/* Instruments */
import type { ReduxState } from '@/lib/redux';

export const listNotificationSelector = (state: ReduxState) => state.notification.listNotification;
