import axios from "axios";
import { server } from "../store";

export const createOrder = (
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount) => async (dispatch) => {
        try {
            dispatch({
                type: "createOrderRequest",
            });

            const response = await axios.post(` ${server}/createorder`, {
                shippingInfo,
                orderItems,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingCharges,
                totalAmount
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token")
                },
            });
            // console.log(response.data.message);
            dispatch({
                type: "createOrderSuccess",
                payload: response.data.message,
            })
        } catch (error) {
            dispatch({
                type: "createOrderFail",
                payload: error.response.data.message,
            })
        }
    }
export const paymentVerification = (
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    orderOptions,) => async (dispatch) => {
        try {
            dispatch({
                type: "paymentVerificationRequest",
            });

            const response = await axios.post(` ${server}/paymentverification`, {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                orderOptions,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token")
                },
            });
            // console.log(response.data.message);
            dispatch({
                type: "paymentVerificationSuccess",
                payload: response.data.message,
            })
        } catch (error) {
            dispatch({
                type: "paymentVerificationFail",
                payload: error.response.data.message,
            })
        }
    };

export const getMyOrders = () => async (dispatch) => {
    try {
        dispatch({ type: "getMyOrdersRequest" });

        const { data } = await axios.get(`${server}/myorders`, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            }
        });
        // console.log(data.orders);
        dispatch({ type: "getMyOrdersSuccess", payload: data.orders });
    } catch (error) {
        dispatch({ type: "getMyOrdersFail", payload: error.response.data.message });
    }
};
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: "getOrderDetailsRequest" });

        const { data } = await axios.get(`${server}/order/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            }
        });

        dispatch({ type: "getOrderDetailsSuccess", payload: data.order });
    } catch (error) {
        dispatch({ type: "getOrderDetailsFail", payload: error.response.data.message });

    }
};