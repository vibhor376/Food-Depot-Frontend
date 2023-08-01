import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js"
import { useDispatch, useSelector } from "react-redux"
import { getAdminStats } from '../../redux/actions/admin';
import { toast } from 'react-hot-toast';

ChartJS.register(Tooltip, ArcElement, Legend);

const Box = ({ title, value }) => (
    <div>
        <h3>
            {title === "Income" && "₹"}
            {value}
        </h3>
        <p>
            {title}
        </p>
    </div>
);
const Dashboard = () => {
    const dispatch = useDispatch();
    const { loading, usersCount, ordersCount, totalIncome, error } = useSelector(state => state.admin);

    const og = {
        labels: ["Preparing", "Shipped", "Delivered"],
        datasets: [
            {
                label: "# of orders",
                data: ordersCount ? [ordersCount.preparing, ordersCount.shipped, ordersCount.delivered] : [0, 0, 0],
                backgroundColor: [
                    "rgba(159,63,176,0.1)",
                    "rgba(78,63,176,0.1)",
                    "rgba(156,0,60,0.1)"
                ],
                borderColor: [
                    "rgb(159,63,176)",
                    "rgb(78,63,176)",
                    "rgb(156,0,60)"
                ],
                borderWidth: 1,
            },
        ],
    };


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }
        dispatch(getAdminStats());
    }, [dispatch, error]);

    if (loading === true) {
        return <h1 align="center" style={{ height: "100vh", marginTop: "50vh" }}>Loading....</h1>
    }
    return (
        <section className='dashboard'>
            {
                !loading && ordersCount && <main>
                    <article>
                        <Box title={"Users"} value={usersCount} />
                        <Box title={"Orders"} value={ordersCount.total} />
                        <Box title={"Income"} value={totalIncome} />
                    </article>
                    <section>
                        <div>
                            <Link to="/admin/orders"> View Orders</Link>
                            <Link to="/admin/users"> View Users</Link>
                        </div>
                        <aside>
                            <Doughnut data={og} />
                        </aside>
                    </section>
                </main>
            }
        </section>
    )
}

export default Dashboard