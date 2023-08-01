import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : {
        cheeseBurger: {
            quantity: 0,
            price: 200,
        },
        vegBurger: {
            quantity: 0,
            price: 300,
        },
        burgerWithFries: {
            quantity: 0,
            price: 500,
        },
    },
    itemsPrice: localStorage.getItem("amountValues") ? JSON.parse(localStorage.getItem("amountValues")).itemsPrice : 0,
    totalAmount: localStorage.getItem("amountValues") ? JSON.parse(localStorage.getItem("amountValues")).totalAmount : 0,
    taxPrice: localStorage.getItem("amountValues") ? JSON.parse(localStorage.getItem("amountValues")).taxPrice : 0,
    shippingCharges: localStorage.getItem("amountValues") ? JSON.parse(localStorage.getItem("amountValues")).shippingCharges : 0,
    shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
};

export const cartReducer = createReducer(initialState, {
    cheeseBurgerIncrease: (state) => {
        state.cartItems.cheeseBurger.quantity += 1;
    },
    vegBurgerIncrease: (state) => {
        state.cartItems.vegBurger.quantity += 1;
    },
    burgerWithFriesIncrease: (state) => {
        state.cartItems.burgerWithFries.quantity += 1;
    },
    cheeseBurgerDecrease: (state) => {
        state.cartItems.cheeseBurger.quantity = state.cartItems.cheeseBurger.quantity > 0 ? state.cartItems.cheeseBurger.quantity - 1 : 0;
    },
    vegBurgerDecrease: (state) => {
        state.cartItems.vegBurger.quantity = state.cartItems.vegBurger.quantity > 0 ? state.cartItems.vegBurger.quantity - 1 : 0;
    },
    burgerWithFriesDecrease: (state) => {
        state.cartItems.burgerWithFries.quantity = state.cartItems.burgerWithFries.quantity > 0 ? state.cartItems.burgerWithFries.quantity - 1 : 0;
    },
    calculatePrice: (state) => {
        state.itemsPrice =
            state.cartItems.cheeseBurger.quantity * state.cartItems.cheeseBurger.price +
            state.cartItems.vegBurger.quantity * state.cartItems.vegBurger.price +
            state.cartItems.burgerWithFries.quantity * state.cartItems.burgerWithFries.price;
        state.taxPrice = state.itemsPrice * 0.18;
        state.shippingCharges = state.itemsPrice > 1000 ? 0 : state.itemsPrice * 0.1;
        state.totalAmount = state.itemsPrice + state.taxPrice + state.shippingCharges;
    },
    emptyState: (state) => {
        state.cartItems = {
            cheeseBurger: {
                quantity: 0,
                price: 200
            },
            vegBurger: {
                quantity: 0,
                price: 300
            },
            burgerWithFries: {
                quantity: 0,
                price: 500
            }
        };
        state.totalAmount = 0;
        state.taxPrice = 0;
        state.shippingCharges = 0;
        state.totalAmount = 0;
    },
    addShippingInfo: (state, action) => {
        state.shippingInfo = {
            hNo: action.payload.hNo,
            city: action.payload.city,
            state: action.payload.state,
            pinCode: action.payload.pinCode,
            phoneNo: action.payload.phoneNo,
        }
    }
});

