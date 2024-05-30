/* Instruments */
import type { ReduxState } from "@/lib/redux";

export const fetchInsertUserSelector = (state: ReduxState) =>
    state.user.loading;

// export const fetchInsertUserSelector = (state: ReduxState) =>
//     state.user.loading;`
