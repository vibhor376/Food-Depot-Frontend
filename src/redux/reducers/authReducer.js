import { createReducer } from "@reduxjs/toolkit";


export const authReducer = createReducer({}, {
    loadUserRequest: (state) => {
        state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
    },
    loadUserFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
    logoutUser: (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
    }
});

