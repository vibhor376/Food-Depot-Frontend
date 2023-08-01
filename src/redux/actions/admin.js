import axios from "axios";
import { server } from "../store";
import { toast } from "react-hot-toast";

export const getAdminStats = () => async (dispatch) => {
    try {
        dispatch({
            type: "getDashboardStatsRequest",
        });

        const { data } = await axios.get(`${server}/admin/stats`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
        });
        // console.log(data);
        dispatch({
            type: "getDashboardStatsSuccess",
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: "getDashboardStatsFail",
            payload: error.response.data.message,
        })
    }
};
export const getAdminOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAdminOrdersRequest",
        });

        const { data } = await axios.get(`${server}/admin/orders`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
        });
        // console.log(data);
        dispatch({
            type: "getAdminOrdersSuccess",
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: "getAdminOrdersFail",
            payload: error.response.data.message,
        })
    }
};

export const getAdminUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAdminUsersRequest",
        });

        const { data } = await axios.get(`${server}/admin/users`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
        });
        // console.log(data);
        dispatch({
            type: "getAdminUsersSuccess",
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: "getAdminUsersFail",
            payload: error.response.data.message,
        })
    }
};

export const proccesOrder = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "processOrderRequest",
        });

        const { data } = await axios.get(`${server}/admin/order/${id}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
        });
        // console.log(data);
        dispatch({
            type: "processOrderSuccess",
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: "processOrderFail",
            payload: "Food already delivered",
        });
        toast.error("Food already delivered");
    }
};