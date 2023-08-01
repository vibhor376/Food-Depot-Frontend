import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEye } from "react-icons/ai"
import { GiArmoredBoomerang } from "react-icons/gi"
import { useDispatch, useSelector } from "react-redux"
import { getAdminOrders, proccesOrder } from '../../redux/actions/admin'
import { toast } from 'react-hot-toast';

const Orders = () => {
    const dispatch = useDispatch();
    const { loading, orders, error, message } = useSelector(state => state.admin);

    const processOrderHandler = (id) => {
        dispatch(proccesOrder(id));
    }

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
        }
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }
        dispatch(getAdminOrders());
    }, [dispatch, error, message]);

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
                            <th>User</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading === false && orders && orders.map((i) => (
                                <tr key={i._id}>
                                    <td>#{i._id}</td>
                                    <td>{i.orderStatus}</td>
                                    <td>  {i.orderItems.cheeseBurger.quantity +
                                        i.orderItems.vegBurger.quantity +
                                        i.orderItems.burgerWithFries.quantity}</td>
                                    <td>₹{i.totalAmount}</td>
                                    <td>{i.paymentMethod}</td>
                                    <td>{i.user.name}</td>
                                    <td>
                                        <Link to={`/order/${i._id}`}>
                                            <AiOutlineEye />
                                        </Link>
                                        <button>
                                            <GiArmoredBoomerang onClick={() => { processOrderHandler(i._id) }} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </main>
        </section>
    )
}

export default Orders