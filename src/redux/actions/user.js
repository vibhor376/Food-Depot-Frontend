import axios from "axios";
import { server } from "../store";

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "loadUserRequest",
        });

        const { data } = await axios.get(`${server}/me`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
        });
        // console.log(data);

        dispatch({
            type: "loadUserSuccess",
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: "loadUserFailure",
            payload: error.response.data.message,
        })
    }
};


export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutUser",
        });
    } catch (error) {
        dispatch({
            type: "loadUserFailure",
            payload: error.response.data.message,
        })
    }
};