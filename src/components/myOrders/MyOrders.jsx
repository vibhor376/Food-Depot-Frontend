import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEye } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from '../../redux/actions/order';
import toast from "react-hot-toast";

const MyOrders = () => {
    const dispatch = useDispatch();

    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }

        dispatch(getMyOrders());
    }, [dispatch, error]);

    if (loading === true) {
        return <h1 align="center" style={{ height: "100vh", marginTop: "50vh" }}>Loading....</h1>
    }
    return (
        <section className='tableClass'>
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Order Status</th>
                            <th>Item Qty</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders && orders.map((i) => (
                                <tr key={i._id}>
                                    <td>#{i._id}</td>
                                    <td>{i.orderStatus}</td>
                                    <td>  {i.orderItems.cheeseBurger.quantity +
                                        i.orderItems.vegBurger.quantity +
                                        i.orderItems.burgerWithFries.quantity}</td>
                                    <td>₹{i.totalAmount}</td>
                                    <td>{i.paymentMethod}</td>
                                    <td><Link to={`/order/${i._id}`}>
                                        <AiOutlineEye />
                                    </Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </main>
        </section>
    )
}

export default MyOrders