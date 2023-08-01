import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer({ orders: [] }, {
    getDashboardStatsRequest: (state) => {
        state.loading = true;
    },
    getDashboardStatsSuccess: (state, action) => {
        state.loading = false;
        state.usersCount = action.payload.usersCount;
        state.ordersCount = action.payload.ordersCount;
        state.totalIncome = action.payload.totalIncome;
    },
    getDashboardStatsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
    },
    getAdminOrdersRequest: (state) => {
        state.loading = true;
    },
    getAdminOrdersSuccess: (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
    },
    getAdminOrdersFail: (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
    },
    getAdminUsersRequest: (state) => {
        state.loading = true;
    },
    getAdminUsersSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
    },
    getAdminUsersFail: (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
    },
    processOrderRequest: (state) => {
        state.loading = true;
    },
    processOrderSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    processOrderFail: (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
    },
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
});