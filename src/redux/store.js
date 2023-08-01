import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./reducers/authReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer, ordersReducer } from "./reducers/orderReducer";
import { adminReducer } from "./reducers/adminReducer";


const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer,
        orders: ordersReducer,
        admin: adminReducer
    }
});

export default store;

export const server = "https://food-depot-backend.onrender.com/api/v1";