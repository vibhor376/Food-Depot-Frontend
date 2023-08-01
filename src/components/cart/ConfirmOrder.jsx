import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, paymentVerification } from '../../redux/actions/order';
import toast from "react-hot-toast";
import axios from 'axios';
import { server } from '../../redux/store';

const ConfirmOrder = () => {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);
    const dispatch = useDispatch();
    const {
        shippingInfo,
        cartItems,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount } = useSelector(state => state.cart)
    const { message, error } = useSelector(state => state.order)
    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setDisableBtn(true);
        if (paymentMethod === "COD") {
            dispatch(
                createOrder(
                    shippingInfo,
                    cartItems,
                    paymentMethod,
                    itemsPrice,
                    taxPrice,
                    shippingCharges,
                    totalAmount
                )
            );
        } else {
            const response = await axios.post(` ${server}/createorderonline`, {
                shippingInfo,
                orderItems: cartItems,
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
            const { order, orderOptions } = response.data;
            var options = {
                key: "rzp_test_7aOCnHkztLeVUm",
                amount: order.amount,
                currency: "INR",
                name: "Food Depot",
                description: "Burger App",
                order_id: order.id,
                handler: function (response) {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                    dispatch(
                        paymentVerification(razorpay_payment_id, razorpay_order_id, razorpay_signature,
                            orderOptions
                        )
                    );
                },
                "theme": {
                    color: "#111fe0"
                }
            };
            const razorpay = window.Razorpay(options);
            razorpay.open();
        }
    };
    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
            dispatch({ type: "emptyState" });
            navigate("/paymentsuccess")
        }
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
            setDisableBtn(false);
        }
    }, [dispatch, message, error, navigate])

    return (
        <section className='confirmOrder'>
            <main>
                <h1>Confirm Order</h1>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label> Cash On Delivery</label>
                        <input type="radio" name="payment" onChange={(e) => { setPaymentMethod("COD") }} />
                    </div>
                    <div>
                        <label> Online</label>
                        <input type="radio" name="payment" onChange={(e) => { setPaymentMethod("Online") }} />
                    </div>
                    <button type='submit' disabled={disableBtn}>Place Order</button>
                </form>
            </main>
        </section>
    )
}

export default ConfirmOrder