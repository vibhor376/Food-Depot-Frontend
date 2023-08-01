import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../redux/actions/order';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { order, loading } = useSelector(state => state.orders);
    useEffect(() => {
        dispatch(getOrderDetails(params.id))
    }, [dispatch, params.id])
    if (loading === true) {
        return <h1 align="center" style={{ height: "100vh", marginTop: "50vh" }}>Loading....</h1>
    }
    return (
        <section className='orderDetails'>
            {!loading && order && <main>
                <h1>Order Details</h1>
                <div>
                    <h1>Shipping</h1>
                    <p>
                        <b>Address: </b>
                        {`House No - ${order.shippingInfo.hNo}, ${order.shippingInfo.city}, ${order.shippingInfo.state}`}
                    </p>
                </div>
                <div>
                    <h1>Contact</h1>
                    <p>
                        <b>Name: </b>
                        {`${order.user.name}`}
                    </p>
                    <p>
                        <b>Phone: </b>
                        {order.shippingInfo.phoneNo}
                    </p>
                </div>
                <div>
                    <h1>Status</h1>
                    <p>
                        <b>Order Status: </b>
                        {order.orderStatus}
                    </p>
                    <p>
                        <b>Placed At: </b>
                        {order.createdAt.split("T")[0]}
                    </p>
                    <p>
                        <b>Delivered At: </b>
                        {order.deliveredAt ? order.deliveredAt.split("T")[0] : "NA"}
                    </p>
                </div>
                <div>
                    <h1>Payment</h1>
                    <p>
                        <b>Method: </b>
                        {order.paymentMethod}
                    </p>
                    <p>
                        <b>Payment Reference: </b>
                        #{order.paymentMethod === "Online" ? order.paymentInfo : "NA"}
                    </p>
                    <p>
                        <b>Paid At: </b>
                        {order.paymentMethod === "Online" ? order.paidAt.split("T")[0] : "NA"}
                    </p>
                </div>
                <div>
                    <h1>Amount</h1>
                    <p>
                        <b>Items Total: </b>
                        ₹{order.itemsPrice}
                    </p>
                    <p>
                        <b>Shipping Charges: </b>
                        ₹{order.shippingCharges}
                    </p>
                    <p>
                        <b>Tax: </b>
                        ₹{order.taxPrice}
                    </p>
                    <p>
                        <b>Total: </b>
                        ₹{order.totalAmount}
                    </p>

                </div>
                <article>
                    <h1>Ordered Items</h1>
                    <div>
                        <h4>Cheese Burger</h4>
                        <div>
                            <span>{order.orderItems.cheeseBurger.quantity} </span>
                            x
                            <span> {order.orderItems.cheeseBurger.price}</span>
                        </div>
                    </div>
                    <div>
                        <h4>Veg Burger</h4>
                        <div>
                            <span>{order.orderItems.vegBurger.quantity} </span>
                            x
                            <span> {order.orderItems.vegBurger.price}</span>
                        </div>
                    </div>
                    <div>
                        <h4>Burger with Fries</h4>
                        <div>
                            <span>{order.orderItems.burgerWithFries.quantity} </span>
                            x
                            <span> {order.orderItems.burgerWithFries.price}</span>
                        </div>
                    </div>
                    <div>
                        <h4 style={{
                            fontWeight: 800,
                        }}>SubTotal</h4>
                        <div style={{
                            fontWeight: 800,
                        }}>₹{order.totalAmount}</div>
                    </div>
                </article>
            </main>}
        </section>
    )
}

export default OrderDetails